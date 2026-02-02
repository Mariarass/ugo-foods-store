import { NextRequest, NextResponse } from 'next/server';
import { supabase, Order, OrderStatus } from '@/lib/supabase';
import { sendOrderShippedEmail, sendOrderDeliveredEmail } from '@/lib/email';

// Verify admin password
function verifyAdmin(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return false;
  
  const password = authHeader.replace('Bearer ', '');
  return password === process.env.ADMIN_PASSWORD;
}

// UPDATE order status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const { status, tracking_number } = body as { 
    status?: OrderStatus; 
    tracking_number?: string;
  };

  // Build update object
  const updateData: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  if (status) {
    updateData.status = status;
  }

  if (tracking_number !== undefined) {
    updateData.tracking_number = tracking_number;
  }

  // Update order in database
  const { data: order, error } = await supabase
    .from('orders')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Send email based on status change
  if (status === 'shipped') {
    await sendOrderShippedEmail(order as Order);
    console.log('Shipped email sent to:', order.customer_email);
  } else if (status === 'delivered') {
    await sendOrderDeliveredEmail(order as Order);
    console.log('Delivered email sent to:', order.customer_email);
  }

  return NextResponse.json({ order });
}
