/**
 * Rutas para TASK LIST MATERIALES (4_Log_prod - Task List Materiales)
 * Área: LOGÍSTICA + PRODUCCIÓN (+ MANTENIMIENTO)
 * 
 * Campos: Actividad (código), Cod Rep, N/P cod 1, N/P cod 2, ID TUBO, OD VAS,
 *         Descripción, Item (número de ítem), Tipo, Material (código),
 *         Requerimiento (cantidad), Ref descripcion, NP, Texto, Precio
 */

import { Router } from 'express';
import * as tareaController from '../../controllers/operativos/tareaController';

const router = Router();

// CRUD completo de tareas
router.get('/', tareaController.getAllTareas);
router.get('/:id', tareaController.getTareaById);
router.post('/', tareaController.createTarea);
router.put('/:id', tareaController.updateTarea);
router.delete('/:id', tareaController.deleteTarea);

// Rutas especiales para tareas por OT
router.get('/ot/:ot_id', tareaController.getTareasByOrdenTrabajo);

export default router;
