import { Request, Response } from 'express';
import Perdida from '../../models/Perdida';

export const getAllPerdidas = async (req: Request, res: Response) => {
  try {
    const perdidas = await Perdida.findAll({
      order: [['fecha', 'DESC']],
    });
    res.json(perdidas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pérdidas', details: error });
  }
};

export const getPerdidaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const perdida = await Perdida.findByPk(parseInt(id as string));
    
    if (!perdida) {
      return res.status(404).json({ error: 'Pérdida no encontrada' });
    }
    
    res.json(perdida);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pérdida', details: error });
  }
};

export const createPerdida = async (req: Request, res: Response) => {
  try {
    const nuevaPerdida = await Perdida.create(req.body);
    res.status(201).json(nuevaPerdida);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear pérdida', details: error });
  }
};

export const updatePerdida = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const perdida = await Perdida.findByPk(parseInt(id as string));
    
    if (!perdida) {
      return res.status(404).json({ error: 'Pérdida no encontrada' });
    }
    
    await perdida.update(req.body);
    res.json(perdida);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar pérdida', details: error });
  }
};

export const deletePerdida = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const perdida = await Perdida.findByPk(parseInt(id as string));
    
    if (!perdida) {
      return res.status(404).json({ error: 'Pérdida no encontrada' });
    }
    
    await perdida.destroy();
    res.json({ message: 'Pérdida eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar pérdida', details: error });
  }
};
