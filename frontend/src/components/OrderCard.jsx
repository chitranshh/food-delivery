function OrderCard({ order, onTogglePayment, onDelete }) {
  return (
    <div className={`order-card ${order.isPaid ? 'paid' : 'unpaid'}`}>
      <div className="order-header">
        <div className="order-id">
          <span className="order-badge">#{order.orderId}</span>
          <span className={`status-badge ${order.isPaid ? 'status-paid' : 'status-unpaid'}`}>
            {order.isPaid ? 'Paid' : 'Unpaid'}
          </span>
        </div>
      </div>
      <div className="order-body">
        <h3 className="restaurant-name">{order.restaurantName}</h3>
        <div className="order-details">
          <div className="detail-item">
            <span className="detail-label">Items:</span>
            <span className="detail-value">{order.itemCount}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Distance:</span>
            <span className="detail-value">{order.deliveryDistance} km</span>
          </div>
        </div>
      </div>
      <div className="order-actions">
        <button className={`btn btn-small ${order.isPaid ? 'btn-warning' : 'btn-success'}`} onClick={() => onTogglePayment(order.orderId)}>
          {order.isPaid ? 'Mark Unpaid' : 'Mark Paid'}
        </button>
        <button className="btn btn-small btn-danger" onClick={() => onDelete(order.orderId)}>Delete</button>
      </div>
    </div>
  )
}

export default OrderCard
