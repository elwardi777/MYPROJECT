import db from '../config/db.js'; // قم باستيراد الاتصال بقاعدة البيانات

// إنشاء طلب جديد
export const createOrder = async (req, res) => {
  try {
    const { userId, items, total } = req.body;
    const query = 'INSERT INTO orders (userId, items, total, status) VALUES (?, ?, ?, ?)';
    const values = [userId, JSON.stringify(items), total, 'pending'];
    
    const [result] = await db.execute(query, values);
    
    res.status(201).json({ message: 'Order created successfully', orderId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating order' });
  }
};

// الحصول على جميع الطلبات
export const getOrders = async (req, res) => {
  try {
    const query = 'SELECT * FROM orders';
    const [orders] = await db.execute(query);
    
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

// الحصول على طلب معين باستخدام ID
export const getOrderById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const query = 'SELECT * FROM orders WHERE id = ?';
    const [order] = await db.execute(query, [id]);
    
    if (order.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.status(200).json(order[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching order' });
  }
};

// تحديث حالة الطلب
export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  try {
    const query = 'UPDATE orders SET status = ? WHERE id = ?';
    const [result] = await db.execute(query, [status, id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.status(200).json({ message: 'Order status updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating order status' });
  }
};

// حذف طلب
export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  
  try {
    const query = 'DELETE FROM orders WHERE id = ?';
    const [result] = await db.execute(query, [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.status(200).json({ message: 'Order deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting order' });
  }
};
