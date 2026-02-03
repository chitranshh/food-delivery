const API_BASE = 'http://localhost:3001/api'

export const ordersApi = {
    async getAll() {
        const res = await fetch(`${API_BASE}/orders`)
        if (!res.ok) throw new Error('fetch failed')
        return res.json()
    },

    async create(order) {
        const res = await fetch(`${API_BASE}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order)
        })
        if (!res.ok) throw new Error('create failed')
        return res.json()
    },

    async update(orderId, updates) {
        const res = await fetch(`${API_BASE}/orders/${orderId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates)
        })
        if (!res.ok) throw new Error('update failed')
        return res.json()
    },

    async delete(orderId) {
        const res = await fetch(`${API_BASE}/orders/${orderId}`, { method: 'DELETE' })
        if (!res.ok) throw new Error('delete failed')
        return res.json()
    },

    async togglePayment(orderId, isPaid) {
        return this.update(orderId, { isPaid })
    }
}
