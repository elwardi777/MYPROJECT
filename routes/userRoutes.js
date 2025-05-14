// backend/routes/userRoutes.jimport express from 'express';
import { getAllUsers, getCurrentUser } from '../controllers/userController.js';
import authenticate from '../middleware/authMiddleware.js';


const userController = require('../controllers/userController');

router.post('/login', userController.loginUser);


router.post('/register', registerUser);
router.get('/', getAllUsers);



router.get('/', getAllUsers);
router.get('/me', authenticate, getCurrentUser); // ها هاد route ديال getCurrentUser

export default router;


