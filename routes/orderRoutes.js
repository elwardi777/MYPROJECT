import express from 'express';
import { createOrder, getOrders, getOrderById, updateOrderStatus, deleteOrder } from '../controllers/orderController.js';

const router = express.Router();

// مسار لإضافة طلب جديد
router.post('/orders', createOrder);

// مسار للحصول على جميع الطلبات
router.get('/orders', getOrders);

// مسار للحصول على طلب معين باستخدام ID
router.get('/orders/:id', getOrderById);

// مسار لتحديث حالة الطلب
router.put('/orders/:id/status', updateOrderStatus);

// مسار لحذف طلب
router.delete('/orders/:id', deleteOrder);

export default router;
