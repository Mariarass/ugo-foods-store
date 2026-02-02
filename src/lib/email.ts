import { Resend } from 'resend';
import { Order } from './supabase';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = 'UGo Foods <orders@ugo-foods.com>';

// Logo URL - update this when you deploy
const LOGO_URL = `${process.env.NEXT_PUBLIC_APP_URL}/images/logo.png`;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

// Brand colors
const COLORS = {
  primary: '#2d5016',
  secondary: '#c5807d',
  dark: '#1e293b',
  gray: '#64748b',
  lightGray: '#94a3b8',
  success: '#16a34a',
  white: '#ffffff',
};

// Format price
const formatPrice = (price: number) => `$${price.toFixed(2)}`;

// Base email template
const baseTemplate = (content: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UGo</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #fafafa; margin: 0; padding: 0; -webkit-font-smoothing: antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fafafa; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background: ${COLORS.white}; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06);">
          ${content}
          
          <!-- Footer -->
          <tr>
            <td style="background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%); padding: 32px 40px; border-top: 1px solid #e2e8f0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-bottom: 20px;">
                    <img src="${LOGO_URL}" alt="UGo" width="80" style="display: block;" />
                  </td>
                </tr>
                <tr>
                  <td align="center" style="color: ${COLORS.lightGray}; font-size: 13px; line-height: 1.6;">
                    <p style="margin: 0 0 12px; font-style: italic;">This email was sent automatically. Please do not reply.</p>
                    <p style="margin: 0 0 8px;">Questions? Contact us at</p>
                    <a href="mailto:ugofoodshelp@gmail.com" style="color: ${COLORS.secondary}; text-decoration: none; font-weight: 600;">ugofoodshelp@gmail.com</a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 24px; border-top: 1px solid #e2e8f0; margin-top: 24px;">
                    <p style="color: ${COLORS.lightGray}; font-size: 12px; margin: 16px 0 0;">© 2026 UGo Foods. All rights reserved.</p>
                    <p style="color: ${COLORS.lightGray}; font-size: 11px; margin: 8px 0 0;"> Made with ❤️ for adventurers everywhere.</p>
                  </td>
                </tr>
              </table>
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
      <td style="padding: 16px 0; border-bottom: 1px solid #f1f5f9;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="color: ${COLORS.dark}; font-size: 15px; font-weight: 500;">${item.name}</td>
            <td align="right" style="color: ${COLORS.dark}; font-size: 15px; font-weight: 600;">${formatPrice(item.price * item.quantity)}</td>
          </tr>
          <tr>
            <td style="color: ${COLORS.gray}; font-size: 13px; padding-top: 4px;">Qty: ${item.quantity}</td>
            <td></td>
          </tr>
        </table>
      </td>
    </tr>
  `).join('');

  const orderNumber = order.order_number || order.id?.slice(-8).toUpperCase() || 'N/A';

  const content = `
    <!-- Header -->
    <tr>
      <td style="background: linear-gradient(135deg, ${COLORS.success} 0%, ${COLORS.primary} 100%); padding: 48px 40px; text-align: center;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center" style="padding-bottom: 20px;">
              <div style="width: 72px; height: 72px; background: ${COLORS.white}; border-radius: 50%; display: inline-block; line-height: 72px;">
                <span style="font-size: 36px;">✓</span>
              </div>
            </td>
          </tr>
          <tr>
            <td align="center">
              <h1 style="color: ${COLORS.white}; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Order Confirmed!</h1>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    
    <!-- Content -->
    <tr>
      <td style="padding: 40px;">
        <p style="color: ${COLORS.gray}; margin: 0 0 32px; font-size: 16px; line-height: 1.6;">
          Hi <strong style="color: ${COLORS.dark}">${order.customer_name}</strong>, thank you for your order! We're preparing it with care and will ship it soon.
        </p>
        
        <!-- Order Number Box -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background: #dcfce7; border-radius: 12px; margin-bottom: 32px;">
          <tr>
            <td style="padding: 20px 24px;">
              <p style="color: ${COLORS.success}; margin: 0 0 4px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Order Number</p>
              <p style="color: ${COLORS.dark}; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 1px;">${orderNumber}</p>
            </td>
          </tr>
        </table>
        
        <!-- Order Summary -->
        <h3 style="color: ${COLORS.dark}; margin: 0 0 16px; font-size: 16px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Order Summary</h3>
        
        <table width="100%" cellpadding="0" cellspacing="0" style="border-top: 2px solid ${COLORS.dark};">
          ${itemsHtml}
        </table>
        
        <!-- Totals -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 20px; background: #f8fafc; border-radius: 12px;">
          <tr>
            <td style="padding: 16px 20px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="color: ${COLORS.gray}; font-size: 14px; padding: 6px 0;">Subtotal</td>
                  <td align="right" style="color: ${COLORS.dark}; font-size: 14px; padding: 6px 0;">${formatPrice(order.subtotal)}</td>
                </tr>
                <tr>
                  <td style="color: ${COLORS.gray}; font-size: 14px; padding: 6px 0;">Shipping</td>
                  <td align="right" style="color: ${order.shipping === 0 ? COLORS.success : COLORS.dark}; font-size: 14px; font-weight: ${order.shipping === 0 ? '600' : '400'}; padding: 6px 0;">${order.shipping === 0 ? 'FREE' : formatPrice(order.shipping)}</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding: 12px 0 0;">
                    <div style="border-top: 2px solid #e2e8f0;"></div>
                  </td>
                </tr>
                <tr>
                  <td style="color: ${COLORS.dark}; font-size: 18px; font-weight: 700; padding: 12px 0 0;">Total</td>
                  <td align="right" style="color: ${COLORS.dark}; font-size: 18px; font-weight: 700; padding: 12px 0 0;">${formatPrice(order.total)}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        
        <!-- Info Box -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 32px; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px;">
          <tr>
            <td style="padding: 20px 24px; text-align: center;">
              <p style="color: #92400e; margin: 0; font-size: 14px;">
                📦 We'll send you another email when your order ships!
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
      subject: `Order Confirmed! ${orderNumber}`,
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
    <table width="100%" cellpadding="0" cellspacing="0" style="background: #eff6ff; border: 2px dashed #3b82f6; border-radius: 12px; margin-bottom: 24px;">
      <tr>
        <td style="padding: 24px; text-align: center;">
          <p style="color: #3b82f6; margin: 0 0 8px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Tracking Number</p>
          <p style="color: ${COLORS.dark}; margin: 0; font-size: 22px; font-weight: 700; font-family: monospace; letter-spacing: 2px;">${order.tracking_number}</p>
        </td>
      </tr>
    </table>
  ` : '';

  const addressSection = order.shipping_address ? `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
      <tr>
        <td>
          <h4 style="color: ${COLORS.dark}; margin: 0 0 12px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Shipping To</h4>
          <p style="color: ${COLORS.gray}; margin: 0; font-size: 14px; line-height: 1.7;">
            ${order.shipping_address.line1}<br>
            ${order.shipping_address.line2 ? order.shipping_address.line2 + '<br>' : ''}
            ${order.shipping_address.city}, ${order.shipping_address.state} ${order.shipping_address.postal_code}<br>
            ${order.shipping_address.country}
          </p>
        </td>
      </tr>
    </table>
  ` : '';

  const content = `
    <!-- Header -->
    <tr>
      <td style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 48px 40px; text-align: center;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center" style="padding-bottom: 20px;">
              <div style="width: 72px; height: 72px; background: ${COLORS.white}; border-radius: 50%; display: inline-block; line-height: 72px;">
                <span style="font-size: 36px;">📦</span>
              </div>
            </td>
          </tr>
          <tr>
            <td align="center">
              <h1 style="color: ${COLORS.white}; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Your Order Has Shipped!</h1>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    
    <!-- Content -->
    <tr>
      <td style="padding: 40px;">
        <p style="color: ${COLORS.gray}; margin: 0 0 32px; font-size: 16px; line-height: 1.6;">
          Great news, <strong style="color: ${COLORS.dark}">${order.customer_name}</strong>! Your order is on its way to you.
        </p>
        
        <!-- Order Number -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background: #f8fafc; border-radius: 12px; margin-bottom: 24px;">
          <tr>
            <td style="padding: 16px 20px;">
              <p style="color: ${COLORS.gray}; margin: 0 0 4px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Order Number</p>
              <p style="color: ${COLORS.dark}; margin: 0; font-size: 18px; font-weight: 700;">${orderNumber}</p>
            </td>
          </tr>
        </table>
        
        ${trackingSection}
        ${addressSection}
        
        <!-- Delivery Estimate -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border-radius: 12px;">
          <tr>
            <td style="padding: 20px 24px; text-align: center;">
              <p style="color: #065f46; margin: 0; font-size: 14px;">
                🚚 Estimated delivery: <strong>5-7 business days</strong>
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
      subject: `Your Order Has Shipped! ${orderNumber}`,
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
    <!-- Header -->
    <tr>
      <td style="background: linear-gradient(135deg, ${COLORS.secondary} 0%, #a86b68 100%); padding: 48px 40px; text-align: center;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center" style="padding-bottom: 20px;">
              <div style="width: 72px; height: 72px; background: ${COLORS.white}; border-radius: 50%; display: inline-block; line-height: 72px;">
                <span style="font-size: 36px;">🎉</span>
              </div>
            </td>
          </tr>
          <tr>
            <td align="center">
              <h1 style="color: ${COLORS.white}; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Your Order Has Arrived!</h1>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    
    <!-- Content -->
    <tr>
      <td style="padding: 40px; text-align: center;">
        <p style="color: ${COLORS.gray}; margin: 0 0 32px; font-size: 16px; line-height: 1.6;">
          Hi <strong style="color: ${COLORS.dark}">${order.customer_name}</strong>, your order has been delivered!<br>We hope you love your healthy snacks.
        </p>
        
        <!-- Order Number -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background: #f8fafc; border-radius: 12px; margin-bottom: 32px;">
          <tr>
            <td style="padding: 16px 20px; text-align: center;">
              <p style="color: ${COLORS.gray}; margin: 0 0 4px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Order Number</p>
              <p style="color: ${COLORS.dark}; margin: 0; font-size: 18px; font-weight: 700;">${orderNumber}</p>
            </td>
          </tr>
        </table>
        
        <p style="color: ${COLORS.dark}; margin: 0 0 24px; font-size: 18px; font-weight: 600;">Enjoying your UGo snacks?</p>
        
        <!-- CTA Button -->
        <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
          <tr>
            <td style="background: linear-gradient(135deg, ${COLORS.primary} 0%, #1a3d0c 100%); border-radius: 50px; padding: 16px 40px;">
              <a href="${APP_URL}/shop" style="color: ${COLORS.white}; text-decoration: none; font-size: 15px; font-weight: 600; display: block;">
                Shop Again →
              </a>
            </td>
          </tr>
        </table>
        
        <p style="color: ${COLORS.lightGray}; margin: 32px 0 0; font-size: 14px;">Thank you for choosing UGo! 💚</p>
      </td>
    </tr>
  `;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: order.customer_email,
      subject: `Your Order Has Been Delivered! ${orderNumber}`,
      html: baseTemplate(content),
    });
    return { success: true };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error };
  }
}
