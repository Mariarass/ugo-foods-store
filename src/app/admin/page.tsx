'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  RefreshCw, 
  LogOut,
  Search,
  ChevronDown,
  ChevronUp,
  Mail
} from 'lucide-react';
import styles from './page.module.css';

type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered';

interface Order {
  id: string;
  order_number: string;
  stripe_session_id: string;
  customer_email: string;
  customer_name: string;
  items: { id: string; name: string; price: number; quantity: number }[];
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
  created_at: string;
  updated_at: string;
}

const statusConfig = {
  pending: { label: 'Pending', color: '#f59e0b', icon: Clock },
  confirmed: { label: 'Confirmed', color: '#3b82f6', icon: Package },
  shipped: { label: 'Shipped', color: '#8b5cf6', icon: Truck },
  delivered: { label: 'Delivered', color: '#22c55e', icon: CheckCircle },
};

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'all'>('all');

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/admin/orders', {
        headers: {
          'Authorization': `Bearer ${password}`,
        },
      });
      
      if (!res.ok) {
        if (res.status === 401) {
          setIsAuthenticated(false);
          setError('Session expired. Please login again.');
          return;
        }
        throw new Error('Failed to fetch orders');
      }
      
      const data = await res.json();
      // Filter out invalid orders
      const validOrders = (data.orders || []).filter((o: Order) => o && o.id);
      setOrders(validOrders);
      
      if (data.error) {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to load orders');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [password]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated, fetchOrders]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/orders', {
        headers: {
          'Authorization': `Bearer ${password}`,
        },
      });

      if (res.ok) {
        setIsAuthenticated(true);
        localStorage.setItem('admin-password', password);
      } else {
        setError('Invalid password');
      }
    } catch {
      setError('Failed to connect');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setOrders([]);
    localStorage.removeItem('admin-password');
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus, trackingNumber?: string) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${password}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status, tracking_number: trackingNumber }),
      });

      if (res.ok) {
        const data = await res.json();
        setOrders(orders.map(o => o.id === orderId ? data.order : o));
      } else {
        setError('Failed to update order');
      }
    } catch {
      setError('Failed to update order');
    }
  };

  const handleShipOrder = async (order: Order) => {
    const trackingNumber = prompt('Enter tracking number (optional):');
    await updateOrderStatus(order.id, 'shipped', trackingNumber || undefined);
  };

  // Check for saved password on mount
  useEffect(() => {
    const saved = localStorage.getItem('admin-password');
    if (saved) {
      setPassword(saved);
      setIsAuthenticated(true);
    }
  }, []);

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  if (!isAuthenticated) {
    return (
      <div className={styles.loginPage}>
        <div className={styles.loginCard}>
          <h1 className={styles.loginTitle}>Admin Panel</h1>
          <p className={styles.loginSubtitle}>Enter password to access orders</p>
          
          <form onSubmit={handleLogin} className={styles.loginForm}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className={styles.input}
              autoFocus
            />
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.loginButton} disabled={loading}>
              {loading ? 'Checking...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Orders</h1>
          <div className={styles.headerActions}>
            <button onClick={fetchOrders} className={styles.refreshButton} disabled={loading}>
              <RefreshCw size={18} className={loading ? styles.spinning : ''} />
            </button>
            <button onClick={handleLogout} className={styles.logoutButton}>
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        {/* Filters */}
        <div className={styles.filters}>
          <div className={styles.searchWrapper}>
            <Search size={18} />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value as OrderStatus | 'all')}
            className={styles.filterSelect}
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>

        {/* Stats */}
        <div className={styles.stats}>
          {Object.entries(statusConfig).map(([status, config]) => {
            const count = orders.filter(o => o.status === status).length;
            const Icon = config.icon;
            return (
              <div key={status} className={styles.statCard}>
                <Icon size={20} style={{ color: config.color }} />
                <span className={styles.statCount}>{count}</span>
                <span className={styles.statLabel}>{config.label}</span>
              </div>
            );
          })}
        </div>

        {error && <p className={styles.error}>{error}</p>}

        {/* Orders List */}
        <div className={styles.ordersList}>
          {filteredOrders.length === 0 ? (
            <div className={styles.emptyState}>
              <Package size={48} />
              <p>No orders found</p>
            </div>
          ) : (
            filteredOrders.map((order) => {
              if (!order || !order.id) return null;
              const config = statusConfig[order.status] || statusConfig.pending;
              const StatusIcon = config.icon;
              const isExpanded = expandedOrder === order.id;
              const displayOrderNumber = order.order_number || order.id?.slice(-8).toUpperCase() || '';

              return (
                <div key={order.id} className={styles.orderCard}>
                  <div 
                    className={styles.orderHeader}
                    onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                  >
                    <div className={styles.orderInfo}>
                      <span className={styles.orderId}>{displayOrderNumber}</span>
                      <span className={styles.orderDate}>
                        {order.created_at ? new Date(order.created_at).toLocaleDateString() : '-'}
                      </span>
                    </div>
                    
                    <div className={styles.orderCustomer}>
                      <span className={styles.customerName}>{order.customer_name}</span>
                      <span className={styles.customerEmail}>{order.customer_email}</span>
                    </div>
                    
                    <div className={styles.orderTotal}>
                      ${(order.total || 0).toFixed(2)}
                    </div>
                    
                    <div 
                      className={styles.orderStatus}
                      style={{ backgroundColor: `${config.color}15`, color: config.color }}
                    >
                      <StatusIcon size={14} />
                      {config.label}
                    </div>
                    
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>

                  {isExpanded && (
                    <div className={styles.orderDetails}>
                      {/* Items */}
                      <div className={styles.detailSection}>
                        <h4>Items</h4>
                        <div className={styles.itemsList}>
                          {(order.items || []).map((item, i) => (
                            <div key={i} className={styles.item}>
                              <span>{item.name} × {item.quantity}</span>
                              <span>${((item.price || 0) * (item.quantity || 0)).toFixed(2)}</span>
                            </div>
                          ))}
                          <div className={styles.itemsTotal}>
                            <div className={styles.item}>
                              <span>Subtotal</span>
                              <span>${(order.subtotal || 0).toFixed(2)}</span>
                            </div>
                            <div className={styles.item}>
                              <span>Shipping</span>
                              <span>{order.shipping === 0 ? 'FREE' : `$${(order.shipping || 0).toFixed(2)}`}</span>
                            </div>
                            <div className={`${styles.item} ${styles.totalRow}`}>
                              <span>Total</span>
                              <span>${(order.total || 0).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Shipping Address */}
                      {order.shipping_address && (
                        <div className={styles.detailSection}>
                          <h4>Shipping Address</h4>
                          <p className={styles.address}>
                            {order.shipping_address.line1}<br />
                            {order.shipping_address.line2 && <>{order.shipping_address.line2}<br /></>}
                            {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.postal_code}<br />
                            {order.shipping_address.country}
                          </p>
                        </div>
                      )}

                      {/* Tracking */}
                      {order.tracking_number && (
                        <div className={styles.detailSection}>
                          <h4>Tracking Number</h4>
                          <p className={styles.tracking}>{order.tracking_number}</p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className={styles.orderActions}>
                        {order.status === 'confirmed' && (
                          <button 
                            className={styles.actionButton}
                            onClick={() => handleShipOrder(order)}
                          >
                            <Truck size={16} />
                            Mark as Shipped
                          </button>
                        )}
                        {order.status === 'shipped' && (
                          <button 
                            className={styles.actionButton}
                            onClick={() => updateOrderStatus(order.id, 'delivered')}
                          >
                            <CheckCircle size={16} />
                            Mark as Delivered
                          </button>
                        )}
                        <a 
                          href={`mailto:${order.customer_email}`}
                          className={styles.emailButton}
                        >
                          <Mail size={16} />
                          Email Customer
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
