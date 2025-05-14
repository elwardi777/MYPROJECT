import express from 'express';
const router = express.Router();
import { db } from '../index.js'; // Import the db connection from server.js

// ✅ Create or get seller
router.post('/', (req, res) => {
  const { name, avatar, rating } = req.body;

  db.query('SELECT * FROM seller WHERE name = ?', [name], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length > 0) {
      return res.status(200).json({ seller: results[0] });
    }

    const query = `
      INSERT INTO seller (name, avatar, rating)
      VALUES (?, ?, ?)
    `;

    db.query(query, [name, avatar, rating], (err, result) => {
      if (err) {
        console.error('Error creating seller:', err);
        return res.status(500).json({ message: 'Error creating seller' });
      }

      const newSeller = {
        id: result.insertId,
        name,
        avatar,
        rating
      };

      res.status(201).json({ seller: newSeller });
    });
  });
});

export default router;