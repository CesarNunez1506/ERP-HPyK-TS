/**
 * Rutas para CATÁLOGOS/MAESTROS
 * Tablas de configuración usadas por las tablas principales
 * 
 * Catálogos organizados por área de uso:
 * - Comunes: Planta, Área, Categoría, Clasificación, Und Med, Fabricante, Moneda
 * - Mantenimiento: Sub Área, Criticidad, Tipo Equipo, Status Equipo
 * - Estrategias: Tipo Estrategia, Status Estrategia
 * - Producción: Tipo Componente, Posición, Flota Equipo
 * - OT: Cliente, Base Metálica, Garantía, Tipo Garantía, Atención Reparación, 
 *       Tipo Reparación, Prioridad Atención, OT Status, Recursos Status, Taller Status
 */

import { Router } from 'express';
import * as plantaController from '../controllers/catalogo/plantaController';
import * as areaController from '../controllers/catalogo/areaController';
import * as subareaController from '../controllers/catalogo/subAreaController';
import * as categoriaController from '../controllers/catalogo/categoriaController';
import * as clasificacionController from '../controllers/catalogo/clasificacionController';
import * as unidadMedidaController from '../controllers/catalogo/unidadMedidaController';
import * as monedaController from '../controllers/catalogo/monedaController';
import * as fabricanteController from '../controllers/catalogo/fabricanteController';
import * as criticidadController from '../controllers/catalogo/criticidadController';
import * as tipoComponenteController from '../controllers/catalogo/tipoComponenteController';
import * as clienteController from '../controllers/catalogo/clienteController';
import * as tipoEquipoController from '../controllers/maestros/tipoEquipoController';
import * as flotaEquipoController from '../controllers/maestros/flotaEquipoController';
import * as statusEquipoController from '../controllers/catalogo/statusEquipoController';
import * as tipoEstrategiaController from '../controllers/catalogo/tipoEstrategiaController';
import * as statusEstrategiaController from '../controllers/catalogo/statusEstrategiaController';
import * as posicionController from '../controllers/catalogo/posicionController';
import * as estrategiaOtController from '../controllers/catalogo/estrategiaOtController';
import * as baseMetalicaController from '../controllers/catalogo/baseMetalicaController';
import * as garantiaController from '../controllers/catalogo/garantiaController';
import * as tipoGarantiaController from '../controllers/catalogo/tipoGarantiaController';
import * as atencionReparacionController from '../controllers/catalogo/atencionReparacionController';
import * as tipoReparacionController from '../controllers/catalogo/tipoReparacionController';
import * as prioridadAtencionController from '../controllers/catalogo/prioridadAtencionController';
import * as otStatusController from '../controllers/catalogo/otStatusController';
import * as recursosStatusController from '../controllers/catalogo/recursosStatusController';
import * as tallerStatusController from '../controllers/catalogo/tallerStatusController';

const router = Router();

// ===== CATÁLOGOS COMUNES (TODOS) =====
router.get('/plantas', plantaController.getAllPlantas);
router.get('/plantas/:codigo', plantaController.getPlantaById);
router.post('/plantas', plantaController.createPlanta);
router.put('/plantas/:codigo', plantaController.updatePlanta);
router.delete('/plantas/:codigo', plantaController.deletePlanta);

router.get('/areas', areaController.getAllAreas);
router.get('/areas/:codigo', areaController.getAreaById);
router.post('/areas', areaController.createArea);
router.put('/areas/:codigo', areaController.updateArea);
router.delete('/areas/:codigo', areaController.deleteArea);

router.get('/subareas', subareaController.getAllSubAreas);
router.get('/subareas/:codigo', subareaController.getSubAreaById);
router.post('/subareas', subareaController.createSubArea);
router.put('/subareas/:codigo', subareaController.updateSubArea);
router.delete('/subareas/:codigo', subareaController.deleteSubArea);

router.get('/categorias', categoriaController.getAllCategorias);
router.get('/categorias/:codigo', categoriaController.getCategoriaById);
router.post('/categorias', categoriaController.createCategoria);
router.put('/categorias/:codigo', categoriaController.updateCategoria);
router.delete('/categorias/:codigo', categoriaController.deleteCategoria);

router.get('/clasificaciones', clasificacionController.getAllClasificaciones);
router.get('/clasificaciones/:codigo', clasificacionController.getClasificacionById);
router.post('/clasificaciones', clasificacionController.createClasificacion);
router.put('/clasificaciones/:codigo', clasificacionController.updateClasificacion);
router.delete('/clasificaciones/:codigo', clasificacionController.deleteClasificacion);

router.get('/unidades-medida', unidadMedidaController.getAllUnidadesMedida);
router.get('/unidades-medida/:codigo', unidadMedidaController.getUnidadMedidaById);
router.post('/unidades-medida', unidadMedidaController.createUnidadMedida);
router.put('/unidades-medida/:codigo', unidadMedidaController.updateUnidadMedida);
router.delete('/unidades-medida/:codigo', unidadMedidaController.deleteUnidadMedida);

router.get('/monedas', monedaController.getAllMonedas);
router.get('/monedas/:codigo', monedaController.getMonedaById);
router.post('/monedas', monedaController.createMoneda);
router.put('/monedas/:codigo', monedaController.updateMoneda);
router.delete('/monedas/:codigo', monedaController.deleteMoneda);

router.get('/fabricantes', fabricanteController.getAllFabricantes);
router.get('/fabricantes/:codigo', fabricanteController.getFabricanteById);
router.post('/fabricantes', fabricanteController.createFabricante);
router.put('/fabricantes/:codigo', fabricanteController.updateFabricante);
router.delete('/fabricantes/:codigo', fabricanteController.deleteFabricante);

// ===== CATÁLOGOS DE MANTENIMIENTO =====
router.get('/criticidades', criticidadController.getAllCriticidades);
router.get('/criticidades/:codigo', criticidadController.getCriticidadById);
router.post('/criticidades', criticidadController.createCriticidad);
router.put('/criticidades/:codigo', criticidadController.updateCriticidad);
router.delete('/criticidades/:codigo', criticidadController.deleteCriticidad);

router.get('/tipos-equipo', tipoEquipoController.getAllTiposEquipo);
router.get('/tipos-equipo/:codigo', tipoEquipoController.getTipoEquipoById);

router.get('/status-equipo', statusEquipoController.getAllStatusEquipo);
router.get('/status-equipo/:codigo', statusEquipoController.getStatusEquipoById);

// ===== CATÁLOGOS DE ESTRATEGIAS =====
router.get('/tipos-estrategia', tipoEstrategiaController.getAllTiposEstrategia);
router.get('/tipos-estrategia/:codigo', tipoEstrategiaController.getTipoEstrategiaById);

router.get('/status-estrategia', statusEstrategiaController.getAllStatusEstrategia);
router.get('/status-estrategia/:codigo', statusEstrategiaController.getStatusEstrategiaById);

router.get('/estrategia-ot', estrategiaOtController.getAllEstrategiasOt);
router.get('/estrategia-ot/:codigo', estrategiaOtController.getEstrategiaOtById);

// ===== CATÁLOGOS DE PRODUCCIÓN =====
router.get('/tipos-componente', tipoComponenteController.getAllTiposComponente);
router.get('/tipos-componente/:codigo', tipoComponenteController.getTipoComponenteById);
router.post('/tipos-componente', tipoComponenteController.createTipoComponente);
router.put('/tipos-componente/:codigo', tipoComponenteController.updateTipoComponente);
router.delete('/tipos-componente/:codigo', tipoComponenteController.deleteTipoComponente);

router.get('/posiciones', posicionController.getAllPosiciones);
router.get('/posiciones/:codigo', posicionController.getPosicionById);

router.get('/flotas-equipo', flotaEquipoController.getAllFlotasEquipo);
router.get('/flotas-equipo/:codigo', flotaEquipoController.getFlotaEquipoById);

// ===== CATÁLOGOS DE ÓRDENES DE TRABAJO =====
router.get('/clientes', clienteController.getAllClientes);
router.get('/clientes/:codigo', clienteController.getClienteById);
router.post('/clientes', clienteController.createCliente);
router.put('/clientes/:codigo', clienteController.updateCliente);
router.delete('/clientes/:codigo', clienteController.deleteCliente);

router.get('/bases-metalicas', baseMetalicaController.getAllBasesMetalicas);
router.get('/bases-metalicas/:codigo', baseMetalicaController.getBaseMetalicaById);

router.get('/garantias', garantiaController.getAllGarantias);
router.get('/garantias/:codigo', garantiaController.getGarantiaById);

router.get('/tipos-garantia', tipoGarantiaController.getAllTiposGarantia);
router.get('/tipos-garantia/:codigo', tipoGarantiaController.getTipoGarantiaById);

router.get('/atencion-reparacion', atencionReparacionController.getAllAtencionesReparacion);
router.get('/atencion-reparacion/:codigo', atencionReparacionController.getAtencionReparacionById);

router.get('/tipos-reparacion', tipoReparacionController.getAllTiposReparacion);
router.get('/tipos-reparacion/:codigo', tipoReparacionController.getTipoReparacionById);

router.get('/prioridades-atencion', prioridadAtencionController.getAllPrioridadesAtencion);
router.get('/prioridades-atencion/:codigo', prioridadAtencionController.getPrioridadAtencionById);

router.get('/ot-status', otStatusController.getAllOtStatus);
router.get('/ot-status/:codigo', otStatusController.getOtStatusById);

router.get('/recursos-status', recursosStatusController.getAllRecursosStatus);
router.get('/recursos-status/:codigo', recursosStatusController.getRecursosStatusById);

router.get('/taller-status', tallerStatusController.getAllTallerStatus);
router.get('/taller-status/:codigo', tallerStatusController.getTallerStatusById);

export default router;
