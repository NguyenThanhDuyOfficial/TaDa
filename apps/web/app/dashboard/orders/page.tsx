// app/dashboard/orders/page.tsx
'use client';

import { useState } from 'react';
import {
  ShoppingCart,
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  CreditCard,
  Banknote,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import clsx from 'clsx';

// Types
interface OrderProduct {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  totalPrice: number;
  paymentMethod: 'cash' | 'credit_card';
  paymentStatus: 'paid' | 'not_paid';
  deliveryStatus: 'pending' | 'delivered' | 'cancelled';
  status: 'in_progress' | 'done' | 'cancelled';
  products: OrderProduct[];
  customerName?: string;
  customerEmail?: string;
  shippingAddress?: string;
}

type TabType = 'all' | 'pending' | 'processing' | 'delivered' | 'cancelled';

export default function OrdersPage() {
  // State cho danh sách đơn hàng
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('all');

  // State cho modal chi tiết đơn hàng
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // State cho sản phẩm hiển thị trong card (show all / show less)
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter orders theo tab và search term
  const filteredOrders = orders.filter(order => {
    // Tab filter
    if (activeTab !== 'all') {
      if (activeTab === 'pending' && order.deliveryStatus !== 'pending') return false;
      if (activeTab === 'processing' && order.status !== 'in_progress') return false;
      if (activeTab === 'delivered' && order.deliveryStatus !== 'delivered') return false;
      if (activeTab === 'cancelled' && order.deliveryStatus !== 'cancelled') return false;
    }

    // Search filter
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status badge styles
  const getDeliveryStatusBadge = (status: Order['deliveryStatus']) => {
    switch (status) {
      case 'delivered':
        return { label: 'Đã giao hàng', className: 'bg-green-100 text-green-700' };
      case 'cancelled':
        return { label: 'Đã hủy', className: 'bg-red-100 text-red-700' };
      default:
        return { label: 'Đang xử lý', className: 'bg-yellow-100 text-yellow-700' };
    }
  };

  const getPaymentStatusBadge = (status: Order['paymentStatus']) => {
    return status === 'paid'
      ? { label: 'Đã thanh toán', className: 'bg-green-100 text-green-700' }
      : { label: 'Chưa thanh toán', className: 'bg-red-100 text-red-700' };
  };

  const getPaymentMethodIcon = (method: Order['paymentMethod']) => {
    return method === 'credit_card'
      ? { icon: CreditCard, label: 'Thẻ tín dụng' }
      : { icon: Banknote, label: 'Tiền mặt' };
  };

  // Toggle hiển thị tất cả sản phẩm trong order
  const toggleExpandOrder = (orderId: string) => {
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedOrders(newExpanded);
  };

  // Modal handlers
  const openOrderDetail = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  const closeOrderDetail = () => {
    setIsDetailModalOpen(false);
    setSelectedOrder(null);
  };

  // Bạn tự implement các function này
  const fetchOrders = () => {
    // TODO: Fetch orders from API
    console.log('fetchOrders - implement yourself');
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['deliveryStatus']) => {
    // TODO: Update order status
    console.log('handleUpdateOrderStatus - implement yourself', orderId, status);
  };

  const handleCancelOrder = (orderId: string) => {
    // TODO: Cancel order
    console.log('handleCancelOrder - implement yourself', orderId);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <ShoppingCart className="w-6 h-6 text-blue-600" />
          Quản lý đơn hàng
        </h1>
        <p className="text-gray-500 mt-1">Quản lý danh sách đơn hàng, theo dõi trạng thái và xử lý đơn</p>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex gap-6">
          {[
            { key: 'all', label: 'Tất cả', icon: null },
            { key: 'pending', label: 'Chờ xử lý', icon: Clock },
            { key: 'processing', label: 'Đang xử lý', icon: Truck },
            { key: 'delivered', label: 'Đã giao', icon: CheckCircle },
            { key: 'cancelled', label: 'Đã hủy', icon: XCircle },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as TabType)}
                className={clsx(
                  'flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition',
                  isActive
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )}
              >
                {Icon && <Icon className="w-4 h-4" />}
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm theo mã đơn hàng, tên khách hàng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12 text-gray-500">Đang tải...</div>
        ) : paginatedOrders.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <ShoppingCart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>Không có đơn hàng nào</p>
          </div>
        ) : (
          paginatedOrders.map((order) => {
            const deliveryStatus = getDeliveryStatusBadge(order.deliveryStatus);
            const paymentStatus = getPaymentStatusBadge(order.paymentStatus);
            const PaymentIcon = getPaymentMethodIcon(order.paymentMethod).icon;
            const displayProducts = expandedOrders.has(order.id)
              ? order.products
              : order.products.slice(0, 3);
            const hasMoreProducts = order.products.length > 3;

            return (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Order Header */}
                <div className="p-4 border-b bg-gray-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono font-medium text-gray-900">
                      #{order.orderNumber}
                    </span>
                    <span className="text-sm text-gray-500">{formatDate(order.createdAt)}</span>
                    <span className={clsx('px-2 py-0.5 rounded-full text-xs font-medium', deliveryStatus.className)}>
                      {deliveryStatus.label}
                    </span>
                    <span className={clsx('px-2 py-0.5 rounded-full text-xs font-medium', paymentStatus.className)}>
                      {paymentStatus.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openOrderDetail(order)}
                      className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    >
                      <Eye className="w-4 h-4" />
                      Chi tiết
                    </button>
                  </div>
                </div>

                {/* Order Content */}
                <div className="p-4">
                  {/* Customer Info */}
                  <div className="mb-4 text-sm text-gray-600">
                    {order.customerName && <p>Khách hàng: {order.customerName}</p>}
                    <div className="flex items-center gap-2 mt-1">
                      <PaymentIcon className="w-4 h-4 text-gray-500" />
                      <span>{getPaymentMethodIcon(order.paymentMethod).label}</span>
                    </div>
                  </div>

                  {/* Products List */}
                  <div className="space-y-2">
                    {displayProducts.map((product, idx) => (
                      <div key={idx} className="flex items-center justify-between py-2 border-b last:border-0">
                        <div className="flex items-center gap-3">
                          {product.image ? (
                            <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded" />
                          ) : (
                            <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                              <Package className="w-5 h-5 text-gray-400" />
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-medium text-gray-900">{product.name}</p>
                            <p className="text-xs text-gray-500">Số lượng: {product.quantity}</p>
                          </div>
                        </div>
                        <p className="text-sm font-medium">{formatCurrency(product.price * product.quantity)}</p>
                      </div>
                    ))}

                    {hasMoreProducts && (
                      <button
                        onClick={() => toggleExpandOrder(order.id)}
                        className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 mt-2"
                      >
                        {expandedOrders.has(order.id) ? (
                          <>Thu gọn <ChevronUp className="w-4 h-4" /></>
                        ) : (
                          <>Xem tất cả ({order.products.length} sản phẩm) <ChevronDown className="w-4 h-4" /></>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Order Total */}
                  <div className="mt-4 pt-3 border-t flex justify-between items-center">
                    <span className="text-sm text-gray-500">Tổng cộng</span>
                    <span className="text-lg font-bold text-gray-900">
                      {formatCurrency(order.totalPrice)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 mt-6 border-t bg-gray-50 rounded-lg">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm text-gray-600">
            Trang {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Order Detail Modal */}
      {isDetailModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Chi tiết đơn hàng #{selectedOrder.orderNumber}</h2>
              <button onClick={closeOrderDetail} className="p-1 hover:bg-gray-100 rounded">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* Order Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Ngày đặt</p>
                  <p className="font-medium">{formatDate(selectedOrder.createdAt)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Trạng thái giao hàng</p>
                  <p className="font-medium">{getDeliveryStatusBadge(selectedOrder.deliveryStatus).label}</p>
                </div>
                <div>
                  <p className="text-gray-500">Phương thức thanh toán</p>
                  <p className="font-medium">{getPaymentMethodIcon(selectedOrder.paymentMethod).label}</p>
                </div>
                <div>
                  <p className="text-gray-500">Trạng thái thanh toán</p>
                  <p className="font-medium">{getPaymentStatusBadge(selectedOrder.paymentStatus).label}</p>
                </div>
              </div>

              {/* Customer Info */}
              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Thông tin khách hàng</h3>
                <p className="text-sm">{selectedOrder.customerName || 'Không có'}</p>
                <p className="text-sm text-gray-500">{selectedOrder.customerEmail || 'Không có email'}</p>
                <p className="text-sm text-gray-500 mt-1">{selectedOrder.shippingAddress || 'Chưa có địa chỉ'}</p>
              </div>

              {/* Products List */}
              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Sản phẩm</h3>
                <div className="space-y-2">
                  {selectedOrder.products.map((product, idx) => (
                    <div key={idx} className="flex justify-between py-2 border-b last:border-0">
                      <div>
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-xs text-gray-500">x{product.quantity}</p>
                      </div>
                      <p className="text-sm font-medium">{formatCurrency(product.price * product.quantity)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="border-t pt-4 flex justify-between items-center">
                <span className="font-semibold">Tổng cộng</span>
                <span className="text-xl font-bold text-blue-600">{formatCurrency(selectedOrder.totalPrice)}</span>
              </div>
            </div>

            <div className="border-t p-4 flex justify-end gap-3">
              <button
                onClick={closeOrderDetail}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
