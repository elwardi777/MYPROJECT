const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// تسجيل مستخدم جديد
router.post('/register', registerUser);

// تسجيل الدخول
router.post('/login', loginUser);

// routes/auth.js أو أي ملف مشابه

// Logout route

  // backend route: routes/auth.js
router.post('/logout', (req, res) => {
  res.clearCookie('token'); // ولا الاسم اللي مسميه للكوكي
  return res.status(200).json({ message: 'Logged out successfully' });
});


module.exports = router;
