# Food Delivery System

Order management system for food delivery with auto-assign feature.

## Setup

```
npm run install:all
npm run server   # backend on :3001
npm run dev      # frontend on :5173
```

## Workflow

### Add Order
User fills in restaurant name, item count, delivery distance, and payment status. On submit, order is saved to MongoDB and displayed in the orders list.

### View Orders
Shows all orders with details. User can mark unpaid orders as paid or delete any order.

### Filter Orders
User can filter by payment status (All, Paid, Unpaid) and by maximum distance.

### Assign Delivery
User enters a maximum distance. System finds all unpaid orders within that distance, picks the nearest one, and marks it as paid. If no unpaid order exists within the distance, shows "No order available".


