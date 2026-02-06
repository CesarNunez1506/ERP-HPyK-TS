import { Request, Response } from 'express';
import Tarea from '../../models/Tarea';
import OrdenTrabajo from '../../models/OrdenTrabajo';
import Material from '../../models/Material';
import Servicio from '../../models/Servicio';
import Equipo from '../../models/Equipo';
import Componente from '../../models/Componente';

export const getAllTareas = async (req: Request, res: Response) => {
  try {
    const tareas = await Tarea.findAll({
      include: [
        { model: OrdenTrabajo },
        { model: Material },
        { model: Servicio },
        { model: Equipo },
        { model: Componente }
      ]
    });
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tareas', details: error });
  }
};

export const getTareaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tarea = await Tarea.findByPk(parseInt(id as string), {
      include: [
        { model: OrdenTrabajo },
        { model: Material },
        { model: Servicio },
        { model: Equipo },
        { model: Componente }
      ]
    });
    
    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tarea', details: error });
  }
};

export const getTareasByOrdenTrabajo = async (req: Request, res: Response) => {
  try {
    const { ot_id } = req.params;
    const tareas = await Tarea.findAll({
      where: { ot_id },
      include: [
        { model: Material },
        { model: Servicio },
        { model: Equipo },
        { model: Componente }
      ]
    });
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tareas de la orden', details: error });
  }
};

export const createTarea = async (req: Request, res: Response) => {
  try {
    const tarea = await Tarea.create(req.body);
    res.status(201).json(tarea);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear tarea', details: error });
  }
};

export const updateTarea = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [updated] = await Tarea.update(req.body, { where: { tarea_id: id } });
    
    if (!updated) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    
    const tarea = await Tarea.findByPk(parseInt(id as string));
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar tarea', details: error });
  }
};

export const deleteTarea = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Tarea.destroy({ where: { tarea_id: id } });
    
    if (!deleted) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    
    res.json({ message: 'Tarea eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar tarea', details: error });
  }
};
