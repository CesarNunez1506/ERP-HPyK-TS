import { Request, Response } from 'express';
import OrdenTrabajo from '../../models/OrdenTrabajo';
import Cliente from '../../models/catalogs/Cliente';
import Estrategia from '../../models/Estrategia';
import CodigoReparacion from '../../models/CodigoReparacion';
import Equipo from '../../models/Equipo';
import TipoReparacion from '../../models/catalogs/TipoReparacion';
import BaseMetalica from '../../models/catalogs/BaseMetalica';
import Garantia from '../../models/catalogs/Garantia';
import TipoGarantia from '../../models/catalogs/TipoGarantia';
import AtencionReparacion from '../../models/catalogs/AtencionReparacion';
import PrioridadAtencion from '../../models/catalogs/PrioridadAtencion';
import OtStatus from '../../models/catalogs/OtStatus';
import RecursosStatus from '../../models/catalogs/RecursosStatus';
import TallerStatus from '../../models/catalogs/TallerStatus';
import Tarea from '../../models/Tarea';

export const getAllOrdenesTrabajo = async (req: Request, res: Response) => {
  try {
    const ordenes = await OrdenTrabajo.findAll({
      include: [
        { model: Cliente, as: 'cliente' },
        { model: Estrategia, as: 'estrategia' },
        { model: CodigoReparacion, as: 'codigo_reparacion' },
        { model: Equipo, as: 'equipo' },
        { model: Garantia, as: 'garantia' },
        { model: AtencionReparacion, as: 'atencion_reparacion' },
        { model: TipoReparacion, as: 'tipo_reparacion' },
        { model: TipoGarantia, as: 'tipo_garantia' },
        { model: PrioridadAtencion, as: 'prioridad_atencion' },
        { model: BaseMetalica, as: 'base_metalica' },
        { model: OtStatus, as: 'ot_status' },
        { model: RecursosStatus, as: 'recursos_status' },
        { model: TallerStatus, as: 'taller_status' }
      ],
      order: [['ot_id', 'DESC']]
    });
    res.json(ordenes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener órdenes de trabajo', details: error });
  }
};

export const getOrdenTrabajoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const orden = await OrdenTrabajo.findByPk(parseInt(id as string), {
      include: [
        { model: Cliente, as: 'cliente' },
        { model: Estrategia, as: 'estrategia' },
        { model: CodigoReparacion, as: 'codigo_reparacion' },
        { model: Equipo, as: 'equipo' },
        { model: Garantia, as: 'garantia' },
        { model: AtencionReparacion, as: 'atencion_reparacion' },
        { model: TipoReparacion, as: 'tipo_reparacion' },
        { model: TipoGarantia, as: 'tipo_garantia' },
        { model: PrioridadAtencion, as: 'prioridad_atencion' },
        { model: BaseMetalica, as: 'base_metalica' },
        { model: OtStatus, as: 'ot_status' },
        { model: RecursosStatus, as: 'recursos_status' },
        { model: TallerStatus, as: 'taller_status' },
        { model: Tarea, as: 'tareas' }
      ]
    });
    
    if (!orden) {
      return res.status(404).json({ error: 'Orden de trabajo no encontrada' });
    }
    
    res.json(orden);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener orden de trabajo', details: error });
  }
};

export const createOrdenTrabajo = async (req: Request, res: Response) => {
  try {
    const orden = await OrdenTrabajo.create(req.body);
    res.status(201).json(orden);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear orden de trabajo', details: error });
  }
};

export const updateOrdenTrabajo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [updated] = await OrdenTrabajo.update(req.body, { where: { ot_id: id } });
    
    if (!updated) {
      return res.status(404).json({ error: 'Orden de trabajo no encontrada' });
    }
    
    const orden = await OrdenTrabajo.findByPk(parseInt(id as string));
    res.json(orden);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar orden de trabajo', details: error });
  }
};

export const deleteOrdenTrabajo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await OrdenTrabajo.destroy({ where: { ot_id: id } });
    
    if (!deleted) {
      return res.status(404).json({ error: 'Orden de trabajo no encontrada' });
    }
    
    res.json({ message: 'Orden de trabajo eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar orden de trabajo', details: error });
  }
};
