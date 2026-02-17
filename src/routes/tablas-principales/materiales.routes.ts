/**
 * Rutas para MATERIALES (1_Log - Material)
 * Área: TODOS (Producción, Logística, Mantenimiento)
 * 
 * Columnas por área:
 * - TODOS: Material, Descripción, Planta, Área, Categoría, Clasificación, Und Med, Fabricante, NP
 * - PRODUCCIÓN: Punto de Reposición, Stock Máximo
 * - LOGÍSTICA: Plazo de entrega, Precio, Moneda
 */

import { Router } from 'express';
import * as materialController from '../../controllers/maestros/materialController';

const router = Router();

// CRUD completo de materiales
router.get('/', materialController.getAllMateriales);
router.get('/:id', materialController.getMaterialById);
router.post('/', materialController.createMaterial);
router.put('/:id', materialController.updateMaterial);
router.delete('/:id', materialController.deleteMaterial);

export default router;
