/**
 * Rutas para ESTRATEGIAS (3_Todos - Estrategias)
 * Área: TODOS (Producción, Logística, Mantenimiento)
 * 
 * Campos: Estrategia (código), Área, Equipo, Actividad (código), Frecuencia,
 *         Und Med, Descripción estrategia, Tipo estrategia, Status
 */

import { Router } from 'express';
import * as estrategiaController from '../../controllers/operativos/estrategiaController';

const router = Router();

// CRUD completo de estrategias
router.get('/', estrategiaController.getAllEstrategias);
router.get('/:id', estrategiaController.getEstrategiaById);
router.post('/', estrategiaController.createEstrategia);
router.put('/:id', estrategiaController.updateEstrategia);
router.delete('/:id', estrategiaController.deleteEstrategia);

export default router;
