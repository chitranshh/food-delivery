import OrderCard from './OrderCard'

function OrdersList({ orders, onTogglePayment, onDelete }) {
  if (orders.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon">--</span>
        <h3>No Orders Found</h3>
        <p>Add a new order to get started!</p>
      </div>
    )
  }

  return (
    <div className="orders-list">
      {orders.map(order => (
        <OrderCard
          key={order.orderId}
          order={order}
          onTogglePayment={onTogglePayment}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default OrdersList
