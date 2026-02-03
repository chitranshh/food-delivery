function OutputPanel({ message, onClose }) {
  if (!message) return null

  const getIcon = (type) => {
    switch (type) {
      case 'success': return 'OK'
      case 'error': return 'X'
      case 'warning': return '!'
      case 'info': return 'i'
      default: return '-'
    }
  }

  return (
    <div className={`output-panel ${message.type}`}>
      <div className="output-content">
        <span className="output-icon">{getIcon(message.type)}</span>
        <div className="output-text">
          <h4>{message.title}</h4>
          <p>{message.details}</p>
          {message.order && (
            <div className="assigned-order-info">
              <span>{message.order.restaurantName}</span>
              <span>{message.order.itemCount} items</span>
              <span>{message.order.deliveryDistance} km</span>
            </div>
          )}
        </div>
        <button className="close-btn" onClick={onClose}>x</button>
      </div>
    </div>
  )
}

export default OutputPanel
