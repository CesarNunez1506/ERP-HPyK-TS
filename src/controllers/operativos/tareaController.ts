import { Request, Response } from 'express';
import Tarea from '../../models/Tarea';
import OrdenTrabajo from '../../models/OrdenTrabajo';
import Material from '../../models/Material';
import CodigoReparacion from '../../models/CodigoReparacion';
import TipoTarea from '../../models/catalogs/TipoTarea';

export const getAllTareas = async (req: Request, res: Response) => {
  try {
    const tareas = await Tarea.findAll({
      include: [
        { 
          model: Material, 
          as: 'material',
          required: false 
        },
        { 
          model: CodigoReparacion, 
          as: 'codigo_reparacion',
          required: false 
        },
        { 
          model: TipoTarea, 
          as: 'tipo',
          required: false 
        }
      ],
      order: [['tarea_id', 'ASC']]
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
        { 
          model: Material, 
          as: 'material',
          required: false 
        },
        { 
          model: CodigoReparacion, 
          as: 'codigo_reparacion',
          required: false 
        },
        { 
          model: TipoTarea, 
          as: 'tipo',
          required: false 
        }
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
    
    // Primero, buscar la orden de trabajo para obtener su cod_rep_codigo
    const ordenTrabajo = await OrdenTrabajo.findByPk(parseInt(ot_id as string));
    
    if (!ordenTrabajo) {
      return res.status(404).json({ error: 'Orden de trabajo no encontrada' });
    }
    
    // Si la OT no tiene cod_rep_codigo, devolver array vacío
    if (!ordenTrabajo.cod_rep_codigo) {
      return res.json([]);
    }
    
    // Buscar tareas con el mismo cod_rep_codigo
    const tareas = await Tarea.findAll({
      where: { cod_rep_codigo: ordenTrabajo.cod_rep_codigo },
      include: [
        { 
          model: Material, 
          as: 'material',
          required: false 
        },
        { 
          model: CodigoReparacion, 
          as: 'codigo_reparacion',
          required: false 
        },
        { 
          model: TipoTarea, 
          as: 'tipo',
          required: false 
        }
      ],
      order: [['item_numero', 'ASC']]
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
