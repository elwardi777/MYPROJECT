// backend/controllers/userController.js
import db from '../config/db.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const registerUser = (req, res) => {
  const { username, email, password } = req.body;
  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

  db.query(query, [username, email, password], (err, result) => {
    if (err) {
      console.error('Error registering user:', err);
      return res.status(500).json({ error: 'Failed to register user' });
    }
    res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
  });
};


export const loginUser = (req, res) => {
    const { email, password } = req.body;
  
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
      if (err) {
        console.error('Login error:', err);
        return res.status(500).json({ error: 'Login failed' });
      }
  
      if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      const user = results[0]; // هنا دير المتغير بعد التحقق من النتائج
  
      // تحقق من الـ role ديال المستخدم (admin)
      if (user.role === 'admin') {
        // توجه مباشرة لصفحة الـ admin
        return res.redirect('http://localhost:8080/admin');
      }
  
      // توليد الـ token للـ user (إذا ماكانش admin)
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
  
      res.cookie('auth_token', token, {
        httpOnly: true,
        sameSite: 'Lax',
        secure: false, // خليه false فـ localhost و true فـ production
      });
  
      res.status(200).json({ message: 'Login successful' });
    });
  };
  


export const getAllUsers = (req, res) => {
  db.query('SELECT id, username, email FROM users', (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ error: 'Failed to fetch users' });
    }
    res.status(200).json(results);
  });
};
// فوق راه عندك: import db from '../config/db.js';

export const getCurrentUser = (req, res) => {
    const userId = req.user.id;
  
    const query = 'SELECT id, username, email FROM users WHERE id = ?';
    db.query(query, [userId], (err, results) => {
      if (err || results.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json(results[0]);
    });
  };
  
