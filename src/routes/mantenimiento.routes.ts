import { Router } from 'express';
import * as herramientaController from '../controllers/mantenimiento/herramientaController';
import * as codigoReparacionController from '../controllers/mantenimiento/codigoReparacionController';

const router = Router();

// Herramientas
router.get('/herramientas', herramientaController.getAllHerramientas);
router.get('/herramientas/:id', herramientaController.getHerramientaById);
router.post('/herramientas', herramientaController.createHerramienta);
router.put('/herramientas/:id', herramientaController.updateHerramienta);
router.delete('/herramientas/:id', herramientaController.deleteHerramienta);

// Códigos de Reparación
router.get('/codigos-reparacion', codigoReparacionController.getAllCodigosReparacion);
router.get('/codigos-reparacion/:id', codigoReparacionController.getCodigoReparacionById);
router.post('/codigos-reparacion', codigoReparacionController.createCodigoReparacion);
router.put('/codigos-reparacion/:id', codigoReparacionController.updateCodigoReparacion);
router.delete('/codigos-reparacion/:id', codigoReparacionController.deleteCodigoReparacion);

export default router;
