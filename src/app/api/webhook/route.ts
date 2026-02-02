import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabase, Order, generateOrderNumber } from '@/lib/supabase';
import { sendOrderConfirmedEmail } from '@/lib/email';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      
      console.log('Payment successful!', session.id);

      // Get customer details
      const customerEmail = session.customer_details?.email || '';
      const customerName = session.customer_details?.name || 'Customer';
      
      // Parse items from metadata
      let items: { id: string; name: string; price: number; quantity: number }[] = [];
      if (session.metadata?.items) {
        try {
          items = JSON.parse(session.metadata.items);
        } catch (e) {
          console.error('Failed to parse items:', e);
        }
      }

      // Calculate totals
      const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const total = session.amount_total ? session.amount_total / 100 : 0;
      const shipping = total - subtotal;

      // Get shipping address from customer_details or shipping if available
      const shippingDetails = (session as unknown as { shipping_details?: { address?: Stripe.Address } }).shipping_details;
      const shippingAddress = shippingDetails?.address ? {
        line1: shippingDetails.address.line1 || '',
        line2: shippingDetails.address.line2 || undefined,
        city: shippingDetails.address.city || '',
        state: shippingDetails.address.state || '',
        postal_code: shippingDetails.address.postal_code || '',
        country: shippingDetails.address.country || '',
      } : null;

      // Generate order number (uses database sequence for uniqueness)
      const orderNumber = await generateOrderNumber();

      // Save order to database
      const { data: order, error: dbError } = await supabase
        .from('orders')
        .insert({
          order_number: orderNumber,
          stripe_session_id: session.id,
          customer_email: customerEmail,
          customer_name: customerName,
          items: items,
          subtotal: subtotal,
          shipping: shipping > 0 ? shipping : 0,
          total: total,
          status: 'confirmed',
          shipping_address: shippingAddress,
        })
        .select()
        .single();

      if (dbError) {
        console.error('Database error:', dbError);
      } else {
        console.log('Order saved to database:', order.id);

        // Send confirmation email
        if (customerEmail) {
          const emailResult = await sendOrderConfirmedEmail(order as Order);
          if (emailResult.success) {
            console.log('Order confirmation email sent to:', customerEmail);
          } else {
            console.error('Failed to send email:', emailResult.error);
          }
        }
      }

      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('Payment failed:', paymentIntent.id);
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
