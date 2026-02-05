import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Order status types
export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered';

// Order type
export interface Order {
  id: string;
  order_number: string;
  stripe_session_id: string;
  customer_email: string;
  customer_name: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  tracking_number: string | null;
  shipping_address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  } | null;
  billing_address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  } | null;
  created_at: string;
  updated_at: string;
}

// Generate order number - calls database function for guaranteed uniqueness
export async function generateOrderNumber(): Promise<string> {
  const { data, error } = await supabase.rpc('generate_order_number');
  
  if (error || !data) {
    // Fallback: use timestamp + random if DB function fails
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `UGO-${timestamp.slice(-6)}${random}`;
  }
  
  return data;
}
