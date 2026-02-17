/**
 * Archivo maestro de rutas del ERP
 * 
 * Organización por módulos:
 * - /api/materiales        → Materiales (TODOS)
 * - /api/equipos           → Equipos (LOG + MANT)
 * - /api/estrategias       → Estrategias (TODOS)
 * - /api/tareas            → Task Lists (LOG + PROD)
 * - /api/cod-rep           → Códigos Reparación (PROD + LOG)
 * - /api/ot                → Órdenes de Trabajo (TODOS)
 * - /api/catalogos         → Tablas maestras/catálogos
 * - /api/logistica         → Módulo Logística (proveedores, almacenes, movimientos, compras)
 * - /api/mantenimiento     → Módulo Mantenimiento (herramientas, códigos-reparación)
 * - /api/produccion        → Módulo Producción (recetas, producción, pérdidas)
 */

import { Router } from 'express';
import materialesRoutes from './tablas-principales/materiales.routes';
import equiposRoutes from './tablas-principales/equipos.routes';
import estrategiasRoutes from './tablas-principales/estrategias.routes';
import tareasRoutes from './tablas-principales/tareas.routes';
import codRepRoutes from './tablas-principales/codRep.routes';
import otsRoutes from './tablas-principales/ots.routes';
import catalogosRoutes from './catalogos.routes';
import logisticaRoutes from './logistica.routes';
import mantenimientoRoutes from './mantenimiento.routes';
import produccionRoutes from './produccion.routes';

const router = Router();

// ===== TABLAS PRINCIPALES =====
router.use('/materiales', materialesRoutes);
router.use('/equipos', equiposRoutes);
router.use('/estrategias', estrategiasRoutes);
router.use('/tareas', tareasRoutes);
router.use('/cod-rep', codRepRoutes);
router.use('/ot', otsRoutes);

// ===== MÓDULOS =====
router.use('/logistica', logisticaRoutes);
router.use('/mantenimiento', mantenimientoRoutes);
router.use('/produccion', produccionRoutes);

// ===== CATÁLOGOS/MAESTROS =====
router.use('/catalogos', catalogosRoutes);

export default router;
