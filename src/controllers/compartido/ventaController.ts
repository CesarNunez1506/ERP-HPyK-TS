import { Request, Response } from 'express';
import Venta from '../../models/Venta';

export const getAllVentas = async (req: Request, res: Response) => {
  try {
    const ventas = await Venta.findAll({
      order: [['fecha', 'DESC']],
    });
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener ventas', details: error });
  }
};

export const getVentaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const venta = await Venta.findByPk(parseInt(id as string));
    
    if (!venta) {
      return res.status(404).json({ error: 'Venta no encontrada' });
    }
    
    res.json(venta);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener venta', details: error });
  }
};

export const createVenta = async (req: Request, res: Response) => {
  try {
    const nuevaVenta = await Venta.create(req.body);
    res.status(201).json(nuevaVenta);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear venta', details: error });
  }
};

export const updateVenta = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const venta = await Venta.findByPk(parseInt(id as string));
    
    if (!venta) {
      return res.status(404).json({ error: 'Venta no encontrada' });
    }
    
    await venta.update(req.body);
    res.json(venta);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar venta', details: error });
  }
};

export const deleteVenta = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const venta = await Venta.findByPk(parseInt(id as string));
    
    if (!venta) {
      return res.status(404).json({ error: 'Venta no encontrada' });
    }
    
    await venta.destroy();
    res.json({ message: 'Venta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar venta', details: error });
  }
};
