import { Request, Response } from 'express';
import Planta from '../../models/Planta';

export const getAllPlantas = async (req: Request, res: Response) => {
  try {
    const plantas = await Planta.findAll();
    res.json(plantas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener plantas', details: error });
  }
};

export const getPlantaById = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const planta = await Planta.findByPk(codigo as string);
    
    if (!planta) {
      return res.status(404).json({ error: 'Planta no encontrada' });
    }
    
    res.json(planta);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener planta', details: error });
  }
};

export const createPlanta = async (req: Request, res: Response) => {
  try {
    const planta = await Planta.create(req.body);
    res.status(201).json(planta);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear planta', details: error });
  }
};

export const updatePlanta = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const [updated] = await Planta.update(req.body, { where: { codigo } });
    
    if (!updated) {
      return res.status(404).json({ error: 'Planta no encontrada' });
    }
    
    const planta = await Planta.findByPk(codigo as string);
    res.json(planta);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar planta', details: error });
  }
};

export const deletePlanta = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const deleted = await Planta.destroy({ where: { codigo } });
    
    if (!deleted) {
      return res.status(404).json({ error: 'Planta no encontrada' });
    }
    
    res.json({ message: 'Planta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar planta', details: error });
  }
};
