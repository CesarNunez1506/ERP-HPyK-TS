import { Request, Response } from 'express';
import Criticidad from '../../models/Criticidad';

export const getAllCriticidades = async (req: Request, res: Response) => {
  try {
    const criticidades = await Criticidad.findAll();
    res.json(criticidades);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener criticidades', details: error });
  }
};

export const getCriticidadById = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const criticidad = await Criticidad.findByPk(codigo as string);
    
    if (!criticidad) {
      return res.status(404).json({ error: 'Criticidad no encontrada' });
    }
    
    res.json(criticidad);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener criticidad', details: error });
  }
};

export const createCriticidad = async (req: Request, res: Response) => {
  try {
    const criticidad = await Criticidad.create(req.body);
    res.status(201).json(criticidad);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear criticidad', details: error });
  }
};

export const updateCriticidad = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const [updated] = await Criticidad.update(req.body, { where: { codigo } });
    
    if (!updated) {
      return res.status(404).json({ error: 'Criticidad no encontrada' });
    }
    
    const criticidad = await Criticidad.findByPk(codigo as string);
    res.json(criticidad);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar criticidad', details: error });
  }
};

export const deleteCriticidad = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const deleted = await Criticidad.destroy({ where: { codigo } });
    
    if (!deleted) {
      return res.status(404).json({ error: 'Criticidad no encontrada' });
    }
    
    res.json({ message: 'Criticidad eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar criticidad', details: error });
  }
};
