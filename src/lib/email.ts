import { Resend } from 'resend';
import { Order } from './supabase';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = 'UGo Foods <orders@ugo-foods.com>';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
const LOGO_URL = `${APP_URL}/images/logo.png`;

// Format price
const formatPrice = (price: number) => `$${price.toFixed(2)}`;

// Minimal base template
const baseTemplate = (content: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UGo Foods</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 520px;">
          
          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom: 32px;">
              <a href="${APP_URL}" style="text-decoration: none;">
                <img src="${LOGO_URL}" alt="UGo Foods" width="100" style="display: block; max-width: 100px;" />
              </a>
            </td>
          </tr>
          
          <!-- Main Card -->
          <tr>
            <td>
              <table width="100%" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
                ${content}
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 32px 24px; text-align: center;">
              <p style="color: #888; font-size: 12px; margin: 0 0 12px; line-height: 1.6;">
                This is an automated message — please do not reply to this email.<br>
                If you have any questions, feel free to reach out anytime at<br>
                <a href="mailto:ugofoodshelp@gmail.com" style="color: #555; text-decoration: underline; font-weight: 500;">ugofoodshelp@gmail.com</a>
              </p>
              <p style="color: #aaa; font-size: 11px; margin: 16px 0 0;">
                © 2026 UGo Foods. All rights reserved.
              </p>
              <p style="color: #bbb; font-size: 11px; margin: 8px 0 0;">
                Made with ❤️ for adventurers everywhere.
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
            <td align="right" style="color: #1a1a1a; font-size: 14px; font-weight: 500;">${formatPrice(item.price * item.quantity)}</td>
          </tr>
        </table>
      </td>
    </tr>
  `).join('');

  const orderNumber = order.order_number || order.id?.slice(-8).toUpperCase() || 'N/A';

  // Build shipping address display - use shipping_address, fallback to billing_address
  const address = order.shipping_address || order.billing_address;
  const shippingAddressText = address && address.line1
    ? `${address.line1}<br>
       ${address.line2 ? address.line2 + '<br>' : ''}
       ${address.city}, ${address.state} ${address.postal_code}<br>
       ${address.country}`
    : 'Address will be confirmed shortly';

  const content = `
    <tr>
      <td style="padding: 32px 32px 24px;">
        <!-- Status -->
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center" style="padding-bottom: 24px;">
              <div style="width: 56px; height: 56px; background: #f5f5f5; border-radius: 50%; display: inline-block; text-align: center; line-height: 56px;">
                <span style="font-size: 28px;">🎉</span>
              </div>
            </td>
          </tr>
          <tr>
            <td align="center">
              <h1 style="color: #1a1a1a; margin: 0 0 8px; font-size: 22px; font-weight: 600;">Woohoo! Order Confirmed</h1>
              <p style="color: #666; margin: 0; font-size: 15px;">Thanks for your order, ${order.customer_name}! 🧡</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    
    <!-- Order Number -->
    <tr>
      <td style="padding: 0 32px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background: #fafafa; border-radius: 12px;">
          <tr>
            <td style="padding: 16px; text-align: center;">
              <p style="color: #888; margin: 0 0 4px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Order Number</p>
              <p style="color: #1a1a1a; margin: 0; font-size: 20px; font-weight: 700; font-family: monospace; letter-spacing: 1px;">${orderNumber}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    
    <!-- Shipping Address -->
    <tr>
      <td style="padding: 0 32px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background: #fafafa; border-radius: 12px;">
          <tr>
            <td style="padding: 20px;">
              <p style="color: #888; margin: 0 0 12px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">📍 Shipping Address</p>
              <p style="color: #1a1a1a; margin: 0; font-size: 14px; line-height: 1.7;">
                <strong>${order.customer_name}</strong><br>
                ${shippingAddressText}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    
    <!-- Items Header -->
    <tr>
      <td style="padding: 0 32px 12px;">
        <p style="color: #888; margin: 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">🛒 Order Summary</p>
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
      <td style="padding: 16px 32px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="color: #666; font-size: 13px; padding: 4px 0;">Subtotal</td>
            <td align="right" style="color: #1a1a1a; font-size: 13px;">${formatPrice(order.subtotal)}</td>
          </tr>
          <tr>
            <td style="color: #666; font-size: 13px; padding: 4px 0;">Shipping</td>
            <td align="right" style="color: ${order.shipping === 0 ? '#16a34a' : '#1a1a1a'}; font-size: 13px; font-weight: ${order.shipping === 0 ? '600' : '400'};">${order.shipping === 0 ? 'FREE 🎁' : formatPrice(order.shipping)}</td>
          </tr>
          <tr>
            <td colspan="2" style="padding: 12px 0 8px;"><div style="border-top: 2px solid #f0f0f0;"></div></td>
          </tr>
          <tr>
            <td style="color: #1a1a1a; font-size: 16px; font-weight: 700;">Total</td>
            <td align="right" style="color: #1a1a1a; font-size: 16px; font-weight: 700;">${formatPrice(order.total)}</td>
          </tr>
        </table>
      </td>
    </tr>
    
    <!-- Note -->
    <tr>
      <td style="padding: 0 32px 32px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background: #f5f5f5; border-radius: 12px;">
          <tr>
            <td style="padding: 16px; text-align: center;">
              <p style="color: #666; margin: 0; font-size: 13px;">
                📬 We'll send you another email as soon as your order ships!
              </p>
            </td>
          </tr>
        </table>
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
        <table width="100%" cellpadding="0" cellspacing="0" style="background: #fafafa; border-radius: 12px;">
          <tr>
            <td style="padding: 16px; text-align: center;">
              <p style="color: #888; margin: 0 0 4px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">📋 Tracking Number</p>
              <p style="color: #1a1a1a; margin: 0; font-size: 18px; font-weight: 700; font-family: monospace; letter-spacing: 1px;">${order.tracking_number}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  ` : '';

  // Build shipping address display - use shipping_address, fallback to billing_address
  const address = order.shipping_address || order.billing_address;
  const shippingAddressText = address && address.line1
    ? `${address.line1}<br>
       ${address.line2 ? address.line2 + '<br>' : ''}
       ${address.city}, ${address.state} ${address.postal_code}<br>
       ${address.country}`
    : 'Address will be confirmed shortly';

  const content = `
    <tr>
      <td style="padding: 32px 32px 24px;">
        <!-- Status -->
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center" style="padding-bottom: 24px;">
              <div style="width: 56px; height: 56px; background: #f5f5f5; border-radius: 50%; display: inline-block; text-align: center; line-height: 56px;">
                <span style="font-size: 28px;">📦</span>
              </div>
            </td>
          </tr>
          <tr>
            <td align="center">
              <h1 style="color: #1a1a1a; margin: 0 0 8px; font-size: 22px; font-weight: 600;">Your Order Is On Its Way! 🚀</h1>
              <p style="color: #666; margin: 0; font-size: 15px;">Order ${orderNumber} is heading to you</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    
    ${trackingSection}
    
    <!-- Shipping Address -->
    <tr>
      <td style="padding: 0 32px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background: #fafafa; border-radius: 12px;">
          <tr>
            <td style="padding: 20px;">
              <p style="color: #888; margin: 0 0 12px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">📍 Shipping To</p>
              <p style="color: #1a1a1a; margin: 0; font-size: 14px; line-height: 1.7;">
                <strong>${order.customer_name}</strong><br>
                ${shippingAddressText}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    
    <!-- Delivery Estimate -->
    <tr>
      <td style="padding: 0 32px 32px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background: #f5f5f5; border-radius: 12px;">
          <tr>
            <td style="padding: 16px; text-align: center;">
              <p style="color: #666; margin: 0; font-size: 13px;">
                🕐 Estimated delivery: <strong>5-7 business days</strong><br>
                <span style="font-size: 12px; color: #888;">We'll let you know when it arrives!</span>
              </p>
            </td>
          </tr>
        </table>
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

  // Build shipping address display - use shipping_address, fallback to billing_address
  const address = order.shipping_address || order.billing_address;
  const shippingAddressText = address && address.line1
    ? `${address.line1}<br>
       ${address.line2 ? address.line2 + '<br>' : ''}
       ${address.city}, ${address.state} ${address.postal_code}<br>
       ${address.country}`
    : 'Address not available';

  const content = `
    <tr>
      <td style="padding: 32px 32px 24px;">
        <!-- Status -->
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center" style="padding-bottom: 24px;">
              <div style="width: 56px; height: 56px; background: #f5f5f5; border-radius: 50%; display: inline-block; text-align: center; line-height: 56px;">
                <span style="font-size: 28px;">🎊</span>
              </div>
            </td>
          </tr>
          <tr>
            <td align="center">
              <h1 style="color: #1a1a1a; margin: 0 0 8px; font-size: 22px; font-weight: 600;">It's Here! 🥳</h1>
              <p style="color: #666; margin: 0; font-size: 15px;">Order ${orderNumber} has been delivered</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    
    <!-- Delivered To Address -->
    <tr>
      <td style="padding: 0 32px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background: #fafafa; border-radius: 12px;">
          <tr>
            <td style="padding: 20px;">
              <p style="color: #888; margin: 0 0 12px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">📍 Delivered To</p>
              <p style="color: #1a1a1a; margin: 0; font-size: 14px; line-height: 1.7;">
                <strong>${order.customer_name}</strong><br>
                ${shippingAddressText}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    
    <tr>
      <td style="padding: 0 32px 24px; text-align: center;">
        <p style="color: #666; margin: 0; font-size: 15px; line-height: 1.7;">
          Hey ${order.customer_name}! 👋<br><br>
          Your snacks have arrived and are ready to be enjoyed!<br>
          We hope they bring some adventure to your day. 🌟
        </p>
      </td>
    </tr>
    
    <!-- CTA -->
    <tr>
      <td style="padding: 0 32px 32px;" align="center">
        <a href="${APP_URL}/shop" style="display: inline-block; background: #1a1a1a; color: #fff; text-decoration: none; padding: 14px 36px; border-radius: 8px; font-size: 14px; font-weight: 600;">
          Shop More Snacks 🛒
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
