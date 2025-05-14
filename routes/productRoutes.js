import express from 'express';
const router = express.Router();
import { db } from '../index.js'; // Import the db connection from server.js

// ✅ 1. Get all products
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM products';

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).json({ success: false, message: 'Error fetching products' });
    }

    res.status(200).json({
      success: true,
      products: result
    });
  });
});

// ✅ 2. Search products
router.get('/search', (req, res) => {
  const searchQuery = req.query.q;

  if (!searchQuery) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  const sql = `SELECT * FROM products 
    WHERE name LIKE ? OR brand LIKE ? OR description LIKE ? OR category LIKE ?`;
  const values = [
    `%${searchQuery}%`,
    `%${searchQuery}%`,
    `%${searchQuery}%`,
    `%${searchQuery}%`
  ];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    return res.status(200).json({ products: results }); // Return products even if empty array
  });
});

// ✅ 3. Get product by ID
router.get('/:id', (req, res) => {
  const productId = req.params.id;
  const query = 'SELECT * FROM products WHERE id = ?';

  db.query(query, [productId], (err, result) => {
    if (err) {
      console.error('Error fetching product:', err);
      return res.status(500).json({ success: false, message: 'Error fetching product' });
    }
    if (result.length === 0) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, product: result[0] });
  });
});

// ✅ 4. Create new product
router.post('/', (req, res) => {
  const {
    name,
    brand,
    price,
    discountedPrice,
    discount,
    image,
    category,
    size,
    condition,
    description,
    color,
    material,
    measurements,
    sellerId,
    user_id
  } = req.body;

  const query = `
    INSERT INTO products (
      name, brand, price, discountedPrice, discount, image, 
      category, size, \`condition\`, description, color,
      material, measurements, sellerId, user_id
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    name,
    brand,
    price,
    discountedPrice || 0,
    discount || 0,
    image,
    category,
    size,
    condition,
    description,
    color,
    material,
    measurements,
    sellerId,
    user_id
  ];
  console.log('Product Data:', req.body);

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error creating product:', err);
      return res.status(500).json({ message: 'Error creating product' });
    }

    const newProduct = {
      id: result.insertId,
      ...req.body
    };

    res.status(201).json(newProduct);
  });
});

export default router;