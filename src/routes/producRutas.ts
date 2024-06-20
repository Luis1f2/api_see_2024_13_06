import { Router } from 'express';
import {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  actualizarCantidadProducto,
  verificarProductoAgotado,
  eliminarProducto,
  eventosProductos
  
} from '../controllers/producControllers';

const router = Router();

router.post('/productos', crearProducto);
router.get('/productos', obtenerProductos);
router.get('/productos/:id', obtenerProductoPorId);
router.put('/productos/:id/cantidad', actualizarCantidadProducto);
router.get('/productos/:id/verificar', verificarProductoAgotado);
router.delete('/productos/:id', eliminarProducto);
router.get('/see', eventosProductos);

export default router;
