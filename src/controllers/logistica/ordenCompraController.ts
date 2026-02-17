import { Request, Response } from 'express';
import OrdenCompra from '../../models/OrdenCompra';
import Proveedor from '../../models/Proveedor';

export const getAllOrdenesCompra = async (req: Request, res: Response) => {
  try {
    const ordenesCompra = await OrdenCompra.findAll({
      include: [{ model: Proveedor, as: 'proveedor' }],
      order: [['fecha', 'DESC']],
    });
    res.json(ordenesCompra);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener órdenes de compra', details: error });
  }
};

export const getOrdenCompraById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ordenCompra = await OrdenCompra.findByPk(parseInt(id as string), {
      include: [{ model: Proveedor, as: 'proveedor' }],
    });
    
    if (!ordenCompra) {
      return res.status(404).json({ error: 'Orden de compra no encontrada' });
    }
    
    res.json(ordenCompra);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener orden de compra', details: error });
  }
};

export const createOrdenCompra = async (req: Request, res: Response) => {
  try {
    const nuevaOrdenCompra = await OrdenCompra.create(req.body);
    res.status(201).json(nuevaOrdenCompra);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear orden de compra', details: error });
  }
};

export const updateOrdenCompra = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ordenCompra = await OrdenCompra.findByPk(parseInt(id as string));
    
    if (!ordenCompra) {
      return res.status(404).json({ error: 'Orden de compra no encontrada' });
    }
    
    await ordenCompra.update(req.body);
    res.json(ordenCompra);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar orden de compra', details: error });
  }
};

export const deleteOrdenCompra = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ordenCompra = await OrdenCompra.findByPk(parseInt(id as string));
    
    if (!ordenCompra) {
      return res.status(404).json({ error: 'Orden de compra no encontrada' });
    }
    
    await ordenCompra.destroy();
    res.json({ message: 'Orden de compra eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar orden de compra', details: error });
  }
};
