const jwt = require('jsonwebtoken');
const db = require('../config/db'); // حسب مسار ملف db.js
require('dotenv').config();
// REGISTER
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const cleanEmail = email.trim().toLowerCase();

  db.query('SELECT * FROM users WHERE email = ?', [cleanEmail], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length > 0) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, cleanEmail, hashedPassword],
      (err) => {
        if (err) return res.status(500).json({ message: 'Registration failed' });
        res.status(201).json({ message: 'User registered successfully' });
      }
    );
  });
};



// LOGIN

const loginUser = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    if (results.length === 0) return res.status(401).json({ error: 'Email ou mot de passe incorrect' });

    const user = results[0];

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'Lax',
      secure: false // ديرها true فـ production
    });

    res.status(200).json({ message: 'Login réussi' });
  });
};

module.exports = { loginUser };