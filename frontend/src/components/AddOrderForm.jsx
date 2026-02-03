import { useState } from 'react'

function AddOrderForm({ onAddOrder }) {
    const [formData, setFormData] = useState({
        restaurantName: '',
        itemCount: '',
        deliveryDistance: '',
        isPaid: false
    })
    const [errors, setErrors] = useState({})

    const validateForm = () => {
        const newErrors = {}

        if (!formData.restaurantName.trim()) {
            newErrors.restaurantName = 'Restaurant name is required'
        }

        if (!formData.itemCount || parseInt(formData.itemCount) < 1) {
            newErrors.itemCount = 'Item count must be at least 1'
        }

        if (!formData.deliveryDistance || parseFloat(formData.deliveryDistance) <= 0) {
            newErrors.deliveryDistance = 'Distance must be greater than 0'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (validateForm()) {
            onAddOrder({
                restaurantName: formData.restaurantName.trim(),
                itemCount: parseInt(formData.itemCount),
                deliveryDistance: parseFloat(formData.deliveryDistance),
                isPaid: formData.isPaid
            })

            // Reset form
            setFormData({
                restaurantName: '',
                itemCount: '',
                deliveryDistance: '',
                isPaid: false
            })
            setErrors({})
        }
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    return (
        <form className="add-order-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="restaurantName">
                    Restaurant Name
                </label>
                <input
                    type="text"
                    id="restaurantName"
                    name="restaurantName"
                    value={formData.restaurantName}
                    onChange={handleChange}
                    placeholder="Enter restaurant name"
                    className={errors.restaurantName ? 'error' : ''}
                />
                {errors.restaurantName && <span className="error-text">{errors.restaurantName}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="itemCount">
                    Number of Items
                </label>
                <input
                    type="number"
                    id="itemCount"
                    name="itemCount"
                    value={formData.itemCount}
                    onChange={handleChange}
                    placeholder="Enter number of items"
                    min="1"
                    className={errors.itemCount ? 'error' : ''}
                />
                {errors.itemCount && <span className="error-text">{errors.itemCount}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="deliveryDistance">
                    Delivery Distance (KM)
                </label>
                <input
                    type="number"
                    id="deliveryDistance"
                    name="deliveryDistance"
                    value={formData.deliveryDistance}
                    onChange={handleChange}
                    placeholder="Enter distance in kilometers"
                    min="0.1"
                    step="0.1"
                    className={errors.deliveryDistance ? 'error' : ''}
                />
                {errors.deliveryDistance && <span className="error-text">{errors.deliveryDistance}</span>}
            </div>

            <div className="form-group checkbox-group">
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        name="isPaid"
                        checked={formData.isPaid}
                        onChange={handleChange}
                    />
                    <span className="checkbox-custom"></span>
                    <span className="checkbox-text">
                        Order is Pre-paid
                    </span>
                </label>
            </div>

            <button type="submit" className="btn btn-primary btn-submit">
                + Add Order
            </button>
        </form>
    )
}

export default AddOrderForm
