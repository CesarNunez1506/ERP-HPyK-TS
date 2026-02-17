import { Request, Response } from 'express';
import Almacen from '../../models/Almacen';

export const getAllAlmacenes = async (req: Request, res: Response) => {
  try {
    const almacenes = await Almacen.findAll({
      order: [['nombre', 'ASC']],
    });
    res.json(almacenes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener almacenes', details: error });
  }
};

export const getAlmacenById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const almacen = await Almacen.findByPk(parseInt(id as string));
    
    if (!almacen) {
      return res.status(404).json({ error: 'Almacén no encontrado' });
    }
    
    res.json(almacen);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener almacén', details: error });
  }
};

export const createAlmacen = async (req: Request, res: Response) => {
  try {
    const nuevoAlmacen = await Almacen.create(req.body);
    res.status(201).json(nuevoAlmacen);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear almacén', details: error });
  }
};

export const updateAlmacen = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const almacen = await Almacen.findByPk(parseInt(id as string));
    
    if (!almacen) {
      return res.status(404).json({ error: 'Almacén no encontrado' });
    }
    
    await almacen.update(req.body);
    res.json(almacen);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar almacén', details: error });
  }
};

export const deleteAlmacen = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const almacen = await Almacen.findByPk(parseInt(id as string));
    
    if (!almacen) {
      return res.status(404).json({ error: 'Almacén no encontrado' });
    }
    
    await almacen.destroy();
    res.json({ message: 'Almacén eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar almacén', details: error });
  }
};
