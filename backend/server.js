import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'

const app = express()
app.use(cors())
app.use(express.json())

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://chitransh9721:Chitransh0411@cluster0.iwk7xcv.mongodb.net/food_delivery?retryWrites=true&w=majority'
const DATABASE = 'food_delivery'
const COLLECTION = 'orders'

let db

async function connectDB() {
    const client = new MongoClient(MONGODB_URI)
    await client.connect()
    db = client.db(DATABASE)
    console.log('Connected to MongoDB')
}

app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'Food Delivery API' })
})

app.get('/api/orders', async (req, res) => {
    try {
        const orders = await db.collection(COLLECTION).find().sort({ orderId: 1 }).toArray()
        res.json(orders.map(transformFromDb))
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.post('/api/orders', async (req, res) => {
    try {
        const orders = await db.collection(COLLECTION).find().sort({ orderId: -1 }).limit(1).toArray()
        const maxId = orders.length > 0 ? orders[0].orderId : 0

        const newOrder = {
            orderId: maxId + 1,
            restaurantName: req.body.restaurantName,
            itemCount: req.body.itemCount,
            deliveryDistance: req.body.deliveryDistance,
            isPaid: req.body.isPaid,
            createdAt: new Date().toISOString()
        }

        const result = await db.collection(COLLECTION).insertOne(newOrder)
        res.json({ ...newOrder, _id: result.insertedId })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.patch('/api/orders/:orderId', async (req, res) => {
    try {
        const orderId = parseInt(req.params.orderId)
        await db.collection(COLLECTION).updateOne(
            { orderId },
            { $set: req.body }
        )
        res.json({ success: true })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.delete('/api/orders/:orderId', async (req, res) => {
    try {
        const orderId = parseInt(req.params.orderId)
        await db.collection(COLLECTION).deleteOne({ orderId })
        res.json({ success: true })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

function transformFromDb(doc) {
    return {
        orderId: doc.orderId,
        restaurantName: doc.restaurantName,
        itemCount: doc.itemCount,
        deliveryDistance: doc.deliveryDistance,
        isPaid: doc.isPaid,
        createdAt: doc.createdAt
    }
}

const PORT = process.env.PORT || 3001

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`)
    })
}).catch(console.error)
