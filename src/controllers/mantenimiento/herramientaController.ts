import { Request, Response } from 'express';
import Herramienta from '../../models/Herramienta';

export const getAllHerramientas = async (req: Request, res: Response) => {
  try {
    const herramientas = await Herramienta.findAll({
      order: [['nombre', 'ASC']],
    });
    res.json(herramientas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener herramientas', details: error });
  }
};

export const getHerramientaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const herramienta = await Herramienta.findByPk(parseInt(id as string));
    
    if (!herramienta) {
      return res.status(404).json({ error: 'Herramienta no encontrada' });
    }
    
    res.json(herramienta);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener herramienta', details: error });
  }
};

export const createHerramienta = async (req: Request, res: Response) => {
  try {
    const nuevaHerramienta = await Herramienta.create(req.body);
    res.status(201).json(nuevaHerramienta);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear herramienta', details: error });
  }
};

export const updateHerramienta = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const herramienta = await Herramienta.findByPk(parseInt(id as string));
    
    if (!herramienta) {
      return res.status(404).json({ error: 'Herramienta no encontrada' });
    }
    
    await herramienta.update(req.body);
    res.json(herramienta);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar herramienta', details: error });
  }
};

export const deleteHerramienta = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const herramienta = await Herramienta.findByPk(parseInt(id as string));
    
    if (!herramienta) {
      return res.status(404).json({ error: 'Herramienta no encontrada' });
    }
    
    await herramienta.destroy();
    res.json({ message: 'Herramienta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar herramienta', details: error });
  }
};
