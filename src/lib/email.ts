import { Resend } from 'resend';
import { Order } from './supabase';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = 'UGo Foods <orders@ugo-foods.com>';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

// Format price
const formatPrice = (price: number) => `$${price.toFixed(2)}`;

// Minimal base template
const baseTemplate = (content: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UGo</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 480px;">
          
          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom: 32px;">
              <span style="font-size: 28px; font-weight: 700; color: #1a1a1a; letter-spacing: -1px;">UGo</span>
            </td>
          </tr>
          
          <!-- Main Card -->
          <tr>
            <td>
              <table width="100%" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 12px;">
                ${content}
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 32px 0; text-align: center;">
              <p style="color: #999; font-size: 12px; margin: 0 0 8px;">
                Questions? <a href="mailto:ugofoodshelp@gmail.com" style="color: #666; text-decoration: none;">ugofoodshelp@gmail.com</a>
              </p>
              <p style="color: #bbb; font-size: 11px; margin: 0;">
                © 2026 UGo Foods
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

// Order Confirmed Email
export async function sendOrderConfirmedEmail(order: Order) {
  const itemsHtml = order.items.map(item => `
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="color: #1a1a1a; font-size: 14px;">${item.name} <span style="color: #999;">×${item.quantity}</span></td>
            <td align="right" style="color: #1a1a1a; font-size: 14px;">${formatPrice(item.price * item.quantity)}</td>
          </tr>
        </table>
      </td>
    </tr>
  `).join('');

  const orderNumber = order.order_number || order.id?.slice(-8).toUpperCase() || 'N/A';

  const content = `
    <tr>
      <td style="padding: 32px 32px 24px;">
        <!-- Status -->
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center" style="padding-bottom: 24px;">
              <div style="width: 48px; height: 48px; background: #f0fdf4; border-radius: 50%; display: inline-block; text-align: center; line-height: 48px;">
                <span style="font-size: 24px;">✓</span>
              </div>
            </td>
          </tr>
          <tr>
            <td align="center">
              <h1 style="color: #1a1a1a; margin: 0 0 8px; font-size: 20px; font-weight: 600;">Order Confirmed</h1>
              <p style="color: #666; margin: 0; font-size: 14px;">Thank you, ${order.customer_name}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    
    <!-- Order Number -->
    <tr>
      <td style="padding: 0 32px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background: #fafafa; border-radius: 8px;">
          <tr>
            <td style="padding: 16px; text-align: center;">
              <p style="color: #999; margin: 0 0 4px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px;">Order Number</p>
              <p style="color: #1a1a1a; margin: 0; font-size: 18px; font-weight: 600; font-family: monospace;">${orderNumber}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    
    <!-- Items -->
    <tr>
      <td style="padding: 0 32px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          ${itemsHtml}
        </table>
      </td>
    </tr>
    
    <!-- Totals -->
    <tr>
      <td style="padding: 16px 32px 32px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="color: #666; font-size: 13px; padding: 4px 0;">Subtotal</td>
            <td align="right" style="color: #1a1a1a; font-size: 13px;">${formatPrice(order.subtotal)}</td>
          </tr>
          <tr>
            <td style="color: #666; font-size: 13px; padding: 4px 0;">Shipping</td>
            <td align="right" style="color: ${order.shipping === 0 ? '#16a34a' : '#1a1a1a'}; font-size: 13px;">${order.shipping === 0 ? 'Free' : formatPrice(order.shipping)}</td>
          </tr>
          <tr>
            <td colspan="2" style="padding: 12px 0 8px;"><div style="border-top: 1px solid #eee;"></div></td>
          </tr>
          <tr>
            <td style="color: #1a1a1a; font-size: 15px; font-weight: 600;">Total</td>
            <td align="right" style="color: #1a1a1a; font-size: 15px; font-weight: 600;">${formatPrice(order.total)}</td>
          </tr>
        </table>
      </td>
    </tr>
    
    <!-- Note -->
    <tr>
      <td style="padding: 0 32px 32px;">
        <p style="color: #999; margin: 0; font-size: 13px; text-align: center;">
          We'll email you when your order ships.
        </p>
      </td>
    </tr>
  `;

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: order.customer_email,
      subject: `Order Confirmed — ${orderNumber}`,
      html: baseTemplate(content),
    });
    console.log('Resend response:', JSON.stringify(result));
    return { success: true, data: result };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error };
  }
}

// Order Shipped Email
export async function sendOrderShippedEmail(order: Order) {
  const orderNumber = order.order_number || order.id?.slice(-8).toUpperCase() || 'N/A';
  
  const trackingSection = order.tracking_number ? `
    <tr>
      <td style="padding: 0 32px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background: #fafafa; border-radius: 8px;">
          <tr>
            <td style="padding: 16px; text-align: center;">
              <p style="color: #999; margin: 0 0 4px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px;">Tracking Number</p>
              <p style="color: #1a1a1a; margin: 0; font-size: 16px; font-weight: 600; font-family: monospace; letter-spacing: 1px;">${order.tracking_number}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  ` : '';

  const addressSection = order.shipping_address ? `
    <tr>
      <td style="padding: 0 32px 24px;">
        <p style="color: #999; margin: 0 0 8px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px;">Shipping To</p>
        <p style="color: #1a1a1a; margin: 0; font-size: 14px; line-height: 1.6;">
          ${order.shipping_address.line1}<br>
          ${order.shipping_address.line2 ? order.shipping_address.line2 + '<br>' : ''}
          ${order.shipping_address.city}, ${order.shipping_address.state} ${order.shipping_address.postal_code}<br>
          ${order.shipping_address.country}
        </p>
      </td>
    </tr>
  ` : '';

  const content = `
    <tr>
      <td style="padding: 32px 32px 24px;">
        <!-- Status -->
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center" style="padding-bottom: 24px;">
              <div style="width: 48px; height: 48px; background: #eff6ff; border-radius: 50%; display: inline-block; text-align: center; line-height: 48px;">
                <span style="font-size: 24px;">📦</span>
              </div>
            </td>
          </tr>
          <tr>
            <td align="center">
              <h1 style="color: #1a1a1a; margin: 0 0 8px; font-size: 20px; font-weight: 600;">Your Order Has Shipped</h1>
              <p style="color: #666; margin: 0; font-size: 14px;">Order ${orderNumber}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    
    ${trackingSection}
    ${addressSection}
    
    <!-- Delivery Estimate -->
    <tr>
      <td style="padding: 0 32px 32px;">
        <p style="color: #666; margin: 0; font-size: 13px; text-align: center;">
          Estimated delivery: <strong style="color: #1a1a1a;">5-7 business days</strong>
        </p>
      </td>
    </tr>
  `;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: order.customer_email,
      subject: `Your Order Has Shipped — ${orderNumber}`,
      html: baseTemplate(content),
    });
    return { success: true };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error };
  }
}

// Order Delivered Email
export async function sendOrderDeliveredEmail(order: Order) {
  const orderNumber = order.order_number || order.id?.slice(-8).toUpperCase() || 'N/A';

  const content = `
    <tr>
      <td style="padding: 32px 32px 24px;">
        <!-- Status -->
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center" style="padding-bottom: 24px;">
              <div style="width: 48px; height: 48px; background: #fef3c7; border-radius: 50%; display: inline-block; text-align: center; line-height: 48px;">
                <span style="font-size: 24px;">✨</span>
              </div>
            </td>
          </tr>
          <tr>
            <td align="center">
              <h1 style="color: #1a1a1a; margin: 0 0 8px; font-size: 20px; font-weight: 600;">Delivered</h1>
              <p style="color: #666; margin: 0; font-size: 14px;">Order ${orderNumber}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    
    <tr>
      <td style="padding: 0 32px 24px; text-align: center;">
        <p style="color: #666; margin: 0; font-size: 14px; line-height: 1.6;">
          Hi ${order.customer_name}, your order has arrived.<br>
          We hope you enjoy your snacks!
        </p>
      </td>
    </tr>
    
    <!-- CTA -->
    <tr>
      <td style="padding: 0 32px 32px;" align="center">
        <a href="${APP_URL}/shop" style="display: inline-block; background: #1a1a1a; color: #fff; text-decoration: none; padding: 12px 32px; border-radius: 6px; font-size: 14px; font-weight: 500;">
          Shop Again
        </a>
      </td>
    </tr>
  `;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: order.customer_email,
      subject: `Your Order Has Been Delivered — ${orderNumber}`,
      html: baseTemplate(content),
    });
    return { success: true };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error };
  }
}
