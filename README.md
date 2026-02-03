# Food Delivery Order Manager

Order management system for food delivery with auto-assign feature.

## Setup

```bash
npm run install:all
npm run server   # backend on :3001
npm run dev      # frontend on :5173
```

## Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER INTERFACE                           │
└─────────────────────────────────────────────────────────────────┘
                              │
         ┌────────────────────┼────────────────────┐
         ▼                    ▼                    ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   ADD ORDER     │  │  VIEW ORDERS    │  │ FILTER & ASSIGN │
│                 │  │                 │  │                 │
│ • Restaurant    │  │ • All Orders    │  │ • Paid/Unpaid   │
│ • Item Count    │  │ • Mark Paid     │  │ • Max Distance  │
│ • Distance      │  │ • Delete Order  │  │ • Auto Assign   │
│ • Payment       │  │                 │  │                 │
└────────┬────────┘  └────────┬────────┘  └────────┬────────┘
         │                    │                    │
         └────────────────────┼────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      MONGODB DATABASE                           │
│                                                                 │
│  orders { id, restaurant_name, item_count, is_paid,             │
│           delivery_distance, created_at, updated_at }           │
└─────────────────────────────────────────────────────────────────┘
```

## Assign Delivery Logic

```
Input: maxDistance (KM)
                │
                ▼
┌───────────────────────────────┐
│ Filter unpaid orders where    │
│ distance <= maxDistance       │
└───────────────┬───────────────┘
                │
                ▼
        ┌───────────────┐
        │ Orders found? │
        └───────┬───────┘
                │
       ┌────────┴────────┐
       │ NO              │ YES
       ▼                 ▼
┌──────────────┐  ┌──────────────────┐
│ "No order    │  │ Find nearest     │
│  available"  │  │ order (min dist) │
└──────────────┘  └────────┬─────────┘
                           │
                           ▼
                  ┌──────────────────┐
                  │ Mark as Paid     │
                  │ Assign Delivery  │
                  └──────────────────┘
```


