import { Router } from 'express';
import * as ventaController from '../controllers/compartido/ventaController';
import * as ubicacionController from '../controllers/compartido/ubicacionController';
import * as clienteController from '../controllers/catalogo/clienteController';

const router = Router();

// Ventas
router.get('/ventas', ventaController.getAllVentas);
router.get('/ventas/:id', ventaController.getVentaById);
router.post('/ventas', ventaController.createVenta);
router.put('/ventas/:id', ventaController.updateVenta);
router.delete('/ventas/:id', ventaController.deleteVenta);

// Ubicaciones
router.get('/ubicaciones', ubicacionController.getAllUbicaciones);
router.get('/ubicaciones/:id', ubicacionController.getUbicacionById);
router.post('/ubicaciones', ubicacionController.createUbicacion);
router.put('/ubicaciones/:id', ubicacionController.updateUbicacion);
router.delete('/ubicaciones/:id', ubicacionController.deleteUbicacion);

// Clientes
router.get('/clientes', clienteController.getAllClientes);
router.get('/clientes/:id', clienteController.getClienteById);
router.post('/clientes', clienteController.createCliente);
router.put('/clientes/:id', clienteController.updateCliente);
router.delete('/clientes/:id', clienteController.deleteCliente);

export default router;
