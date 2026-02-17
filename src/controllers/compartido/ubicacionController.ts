import { Request, Response } from 'express';
import Ubicacion from '../../models/Ubicacion';

export const getAllUbicaciones = async (req: Request, res: Response) => {
  try {
    const ubicaciones = await Ubicacion.findAll({
      order: [['nombre', 'ASC']],
    });
    res.json(ubicaciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener ubicaciones', details: error });
  }
};

export const getUbicacionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ubicacion = await Ubicacion.findByPk(parseInt(id as string));
    
    if (!ubicacion) {
      return res.status(404).json({ error: 'Ubicación no encontrada' });
    }
    
    res.json(ubicacion);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener ubicación', details: error });
  }
};

export const createUbicacion = async (req: Request, res: Response) => {
  try {
    const nuevaUbicacion = await Ubicacion.create(req.body);
    res.status(201).json(nuevaUbicacion);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear ubicación', details: error });
  }
};

export const updateUbicacion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ubicacion = await Ubicacion.findByPk(parseInt(id as string));
    
    if (!ubicacion) {
      return res.status(404).json({ error: 'Ubicación no encontrada' });
    }
    
    await ubicacion.update(req.body);
    res.json(ubicacion);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar ubicación', details: error });
  }
};

export const deleteUbicacion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ubicacion = await Ubicacion.findByPk(parseInt(id as string));
    
    if (!ubicacion) {
      return res.status(404).json({ error: 'Ubicación no encontrada' });
    }
    
    await ubicacion.destroy();
    res.json({ message: 'Ubicación eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar ubicación', details: error });
  }
};
