import { Router } from 'express';
import { createCompra,  getAllCompra } from '../controllers/compraControllers';

const router = Router();

router.post('/compras', createCompra);
router.get('/compras', getAllCompra);

export default router;
