import { useState, useEffect } from 'react'
import './App.css'
import AddOrderForm from './components/AddOrderForm'
import OrdersList from './components/OrdersList'
import FilterPanel from './components/FilterPanel'
import OutputPanel from './components/OutputPanel'
import { ordersApi } from './lib/api'

function App() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('all')
  const [maxDistanceFilter, setMaxDistanceFilter] = useState('')
  const [outputMessage, setOutputMessage] = useState(null)
  const [activeTab, setActiveTab] = useState('orders')

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    try {
      setLoading(true)
      const data = await ordersApi.getAll()
      setOrders(data)
      setOutputMessage(null)
    } catch (error) {
      console.error('Error loading orders:', error)
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  const addOrder = async (orderData) => {
    try {
      const newOrder = await ordersApi.create(orderData)
      setOrders([...orders, newOrder])
      setActiveTab('orders')
    } catch (error) {
      console.error('Error adding order:', error)
      const localOrder = {
        orderId: Date.now(),
        ...orderData
      }
      setOrders([...orders, localOrder])
      setActiveTab('orders')
    }
  }

  const getFilteredOrders = () => {
    return orders.filter(order => {
      if (filterStatus === 'paid' && !order.isPaid) return false
      if (filterStatus === 'unpaid' && order.isPaid) return false
      if (maxDistanceFilter !== '' && order.deliveryDistance > parseFloat(maxDistanceFilter)) {
        return false
      }
      return true
    })
  }

  const assignDelivery = async (maxDistance) => {
    if (!maxDistance || maxDistance <= 0) {
      setOutputMessage({
        type: 'error',
        title: 'Invalid Input',
        details: 'Please enter a valid maximum distance greater than 0.'
      })
      return
    }

    const eligibleOrders = orders.filter(
      order => !order.isPaid && parseFloat(order.deliveryDistance) <= parseFloat(maxDistance)
    )

    if (eligibleOrders.length === 0) {
      setOutputMessage({
        type: 'warning',
        title: 'No order available',
        details: `No unpaid orders found within ${maxDistance} km distance.`
      })
      return
    }

    const nearestOrder = eligibleOrders.reduce((nearest, current) =>
      current.deliveryDistance < nearest.deliveryDistance ? current : nearest
    )

    try {
      await ordersApi.togglePayment(nearestOrder.orderId, true)
      setOrders(orders.map(order =>
        order.orderId === nearestOrder.orderId
          ? { ...order, isPaid: true }
          : order
      ))
    } catch (error) {
      console.error('Error assigning delivery:', error)
      setOrders(orders.map(order =>
        order.orderId === nearestOrder.orderId
          ? { ...order, isPaid: true }
          : order
      ))
    }
  }

  const togglePaymentStatus = async (orderId) => {
    const order = orders.find(o => o.orderId === orderId)
    if (!order || order.isPaid) return

    try {
      await ordersApi.togglePayment(orderId, true)
      setOrders(orders.map(o =>
        o.orderId === orderId
          ? { ...o, isPaid: true }
          : o
      ))
    } catch (error) {
      console.error('Error toggling payment:', error)
      setOrders(orders.map(o =>
        o.orderId === orderId
          ? { ...o, isPaid: true }
          : o
      ))
    }
  }

  const deleteOrder = async (orderId) => {
    try {
      await ordersApi.delete(orderId)
      setOrders(orders.filter(order => order.orderId !== orderId))
      setOutputMessage({
        type: 'info',
        title: 'Order Deleted',
        details: `Order #${orderId} has been removed.`
      })
    } catch (error) {
      console.error('Error deleting order:', error)
      setOrders(orders.filter(order => order.orderId !== orderId))
      setOutputMessage({
        type: 'info',
        title: 'Order Deleted',
        details: `Order #${orderId} has been removed.`
      })
    }
  }

  const filteredOrders = getFilteredOrders()

  if (loading) {
    return (
      <div className="app">
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <p>Loading orders...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <h1>Food Delivery System</h1>
          </div>
        </div>
      </header>

      <nav className="tab-navigation">
        <button
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          All Orders
        </button>
        <button
          className={`tab-btn ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => setActiveTab('add')}
        >
          Add Order
        </button>
        <button
          className={`tab-btn ${activeTab === 'filter' ? 'active' : ''}`}
          onClick={() => setActiveTab('filter')}
        >
          Filter & Assign
        </button>
      </nav>

      <main className="main-content">
        <div className="content-grid">
          {activeTab === 'orders' && (
            <section className="panel orders-panel">
              <div className="panel-header">
                <h2>All Orders</h2>
                <span className="order-count">{orders.length} orders</span>
              </div>
              <OrdersList
                orders={orders}
                onTogglePayment={togglePaymentStatus}
                onDelete={deleteOrder}
              />
            </section>
          )}

          {activeTab === 'add' && (
            <section className="panel add-panel">
              <div className="panel-header">
                <h2>Add New Order</h2>
              </div>
              <AddOrderForm onAddOrder={addOrder} />
            </section>
          )}

          {activeTab === 'filter' && (
            <section className="panel filter-panel">
              <div className="panel-header">
                <h2>Filter & Assign Delivery</h2>
              </div>
              <FilterPanel
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                maxDistanceFilter={maxDistanceFilter}
                setMaxDistanceFilter={setMaxDistanceFilter}
                onAssignDelivery={assignDelivery}
                filteredOrders={filteredOrders}
                onTogglePayment={togglePaymentStatus}
                onDelete={deleteOrder}
              />
            </section>
          )}
        </div>

        <OutputPanel message={outputMessage} onClose={() => setOutputMessage(null)} />
      </main>
    </div>
  )
}

export default App
