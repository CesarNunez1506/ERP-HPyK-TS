/**
 * Rutas para EQUIPOS Y HERRAMIENTAS (2_Mant - Equipos y Herramientas)
 * Área: LOGÍSTICA + MANTENIMIENTO
 * 
 * Campos: Equipo (código), Descripción, Status, Área, Sub Área, Tipo, 
 *         Fecha de Inicio, Fecha de Fabricación, Fabricante, Modelo, N/S, N/P,
 *         Capacidad, Und Med, Texto (observaciones), Planta, Criticidad
 */

import { Router } from 'express';
import * as equipoController from '../../controllers/maestros/equipoController';

const router = Router();

// CRUD completo de equipos
router.get('/', equipoController.getAllEquipos);
router.get('/:id', equipoController.getEquipoById);
router.post('/', equipoController.createEquipo);
router.put('/:id', equipoController.updateEquipo);
router.delete('/:id', equipoController.deleteEquipo);

export default router;
