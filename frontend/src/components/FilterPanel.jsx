import { useState } from 'react'
import OrdersList from './OrdersList'

function FilterPanel({
  filterStatus,
  setFilterStatus,
  maxDistanceFilter,
  setMaxDistanceFilter,
  onAssignDelivery,
  filteredOrders,
  onTogglePayment,
  onDelete
}) {
  const [assignDistance, setAssignDistance] = useState('')

  const handleAssignDelivery = () => {
    const distance = parseFloat(assignDistance)
    onAssignDelivery(distance)
  }

  return (
    <div className="filter-container">
      <div className="filter-controls">
        <div className="filter-section">
          <h3>Filter Orders</h3>
          <div className="filter-group">
            <label>Payment Status:</label>
            <div className="radio-group">
              <label className="radio-label">
                <input type="radio" name="status" value="all" checked={filterStatus === 'all'} onChange={(e) => setFilterStatus(e.target.value)} />
                All
              </label>
              <label className="radio-label">
                <input type="radio" name="status" value="paid" checked={filterStatus === 'paid'} onChange={(e) => setFilterStatus(e.target.value)} />
                Paid Only
              </label>
              <label className="radio-label">
                <input type="radio" name="status" value="unpaid" checked={filterStatus === 'unpaid'} onChange={(e) => setFilterStatus(e.target.value)} />
                Unpaid Only
              </label>
            </div>
          </div>
          <div className="filter-group">
            <label htmlFor="maxDistance">Maximum Distance (KM):</label>
            <input type="number" id="maxDistance" value={maxDistanceFilter} onChange={(e) => setMaxDistanceFilter(e.target.value)} placeholder="Enter max distance" min="0.1" step="0.1" />
            {maxDistanceFilter && <button className="btn btn-small btn-secondary" onClick={() => setMaxDistanceFilter('')}> Clear</button>}
          </div>
        </div>
        <div className="assign-section">
          <h3>Assign Delivery</h3>
          <p className="section-desc">Assign delivery to the nearest unpaid order within the specified distance.</p>
          <div className="assign-controls">
            <div className="input-group">
              <input type="number" value={assignDistance} onChange={(e) => setAssignDistance(e.target.value)} placeholder="Max distance (KM)" min="0.1" step="0.1" />
              <button className="btn btn-primary btn-assign" onClick={handleAssignDelivery} disabled={!assignDistance}>Assign Delivery</button>
            </div>
          </div>
        </div>
      </div>
      <div className="filtered-results">
        <div className="results-header">
          <h3>Filtered Results</h3>
          <span className="results-count">{filteredOrders.length} orders found</span>
        </div>
        <OrdersList orders={filteredOrders} onTogglePayment={onTogglePayment} onDelete={onDelete} />
      </div>
    </div>
  )
}

export default FilterPanel
