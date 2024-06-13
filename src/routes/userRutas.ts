import { Router } from 'express';
import { registerUser, loginUser  } from '../controllers/authControllers';
import { authenticateToken } from '../middleware/authMiddleware';
import {getUsers} from '../controllers/userControllers'

const router = Router();

// Rutas públicas
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', getUsers);


router.get('/profile', authenticateToken, (req, res) => {
    res.send('ruta protegida');
});

export default router;
