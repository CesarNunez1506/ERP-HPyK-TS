/**
 * Rutas para CÓDIGOS DE REPARACIÓN (5_Cod_Rep)
 * Área: PRODUCCIÓN (+ Logística para precio)
 * 
 * Campos: Cod Rep (código), Descripción, Tipo, Categoría, Flota, Fabricante,
 *         NP (Número de parte), Posición, Precio
 */

import { Router } from 'express';
import * as registroReparacionController from '../../controllers/operativos/registroReparacionController';

const router = Router();

// CRUD completo de códigos de reparación
router.get('/', registroReparacionController.getAllRegistrosReparacion);
router.get('/:id', registroReparacionController.getRegistroReparacionById);
router.post('/', registroReparacionController.createRegistroReparacion);
router.put('/:id', registroReparacionController.updateRegistroReparacion);
router.delete('/:id', registroReparacionController.deleteRegistroReparacion);

export default router;
