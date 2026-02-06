import { Request, Response } from 'express';
import Clasificacion from '../../models/Clasificacion';

export const getAllClasificaciones = async (req: Request, res: Response) => {
  try {
    const clasificaciones = await Clasificacion.findAll();
    res.json(clasificaciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener clasificaciones', details: error });
  }
};

export const getClasificacionById = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const clasificacion = await Clasificacion.findByPk(codigo as string);
    
    if (!clasificacion) {
      return res.status(404).json({ error: 'Clasificación no encontrada' });
    }
    
    res.json(clasificacion);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener clasificación', details: error });
  }
};

export const createClasificacion = async (req: Request, res: Response) => {
  try {
    const clasificacion = await Clasificacion.create(req.body);
    res.status(201).json(clasificacion);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear clasificación', details: error });
  }
};

export const updateClasificacion = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const [updated] = await Clasificacion.update(req.body, { where: { codigo } });
    
    if (!updated) {
      return res.status(404).json({ error: 'Clasificación no encontrada' });
    }
    
    const clasificacion = await Clasificacion.findByPk(codigo as string);
    res.json(clasificacion);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar clasificación', details: error });
  }
};

export const deleteClasificacion = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const deleted = await Clasificacion.destroy({ where: { codigo } });
    
    if (!deleted) {
      return res.status(404).json({ error: 'Clasificación no encontrada' });
    }
    
    res.json({ message: 'Clasificación eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar clasificación', details: error });
  }
};
