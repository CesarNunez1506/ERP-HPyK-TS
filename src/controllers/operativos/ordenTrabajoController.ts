import { Request, Response } from 'express';
import OrdenTrabajo from '../../models/OrdenTrabajo';
import Cliente from '../../models/Cliente';
import EstrategiaOt from '../../models/EstrategiaOt';
import RegistroReparacion from '../../models/RegistroReparacion';
import Equipo from '../../models/Equipo';
import Componente from '../../models/Componente';
import TipoReparacion from '../../models/TipoReparacion';
import BaseMetalica from '../../models/BaseMetalica';
import Garantia from '../../models/Garantia';
import TipoGarantia from '../../models/TipoGarantia';
import AtencionReparacion from '../../models/AtencionReparacion';
import PrioridadAtencion from '../../models/PrioridadAtencion';
import OtStatus from '../../models/OtStatus';
import RecursosStatus from '../../models/RecursosStatus';
import TallerStatus from '../../models/TallerStatus';
import Tarea from '../../models/Tarea';

export const getAllOrdenesTrabajo = async (req: Request, res: Response) => {
  try {
    const ordenes = await OrdenTrabajo.findAll({
      include: [
        { model: Cliente },
        { model: EstrategiaOt },
        { model: RegistroReparacion },
        { model: Equipo },
        { model: Componente },
        { model: TipoReparacion },
        { model: BaseMetalica },
        { model: Garantia },
        { model: TipoGarantia },
        { model: AtencionReparacion },
        { model: PrioridadAtencion },
        { model: OtStatus },
        { model: RecursosStatus },
        { model: TallerStatus }
      ]
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
        { model: Cliente },
        { model: EstrategiaOt },
        { model: RegistroReparacion },
        { model: Equipo },
        { model: Componente },
        { model: TipoReparacion },
        { model: BaseMetalica },
        { model: Garantia },
        { model: TipoGarantia },
        { model: AtencionReparacion },
        { model: PrioridadAtencion },
        { model: OtStatus },
        { model: RecursosStatus },
        { model: TallerStatus },
        { model: Tarea }
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
