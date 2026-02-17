import { Request, Response } from 'express';
import MovimientoInventario from '../../models/MovimientoInventario';
import Material from '../../models/Material';
import Almacen from '../../models/Almacen';

export const getAllMovimientos = async (req: Request, res: Response) => {
  try {
    const movimientos = await MovimientoInventario.findAll({
      include: [
        { model: Material, as: 'material' },
        { model: Almacen, as: 'almacenOrigen' },
        { model: Almacen, as: 'almacenDestino' },
      ],
      order: [['fecha', 'DESC']],
    });
    res.json(movimientos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener movimientos', details: error });
  }
};

export const getMovimientoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const movimiento = await MovimientoInventario.findByPk(parseInt(id as string), {
      include: [
        { model: Material, as: 'material' },
        { model: Almacen, as: 'almacenOrigen' },
        { model: Almacen, as: 'almacenDestino' },
      ],
    });
    
    if (!movimiento) {
      return res.status(404).json({ error: 'Movimiento no encontrado' });
    }
    
    res.json(movimiento);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener movimiento', details: error });
  }
};

export const createMovimiento = async (req: Request, res: Response) => {
  try {
    const nuevoMovimiento = await MovimientoInventario.create(req.body);
    res.status(201).json(nuevoMovimiento);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear movimiento', details: error });
  }
};

export const updateMovimiento = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const movimiento = await MovimientoInventario.findByPk(parseInt(id as string));
    
    if (!movimiento) {
      return res.status(404).json({ error: 'Movimiento no encontrado' });
    }
    
    await movimiento.update(req.body);
    res.json(movimiento);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar movimiento', details: error });
  }
};

export const deleteMovimiento = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const movimiento = await MovimientoInventario.findByPk(parseInt(id as string));
    
    if (!movimiento) {
      return res.status(404).json({ error: 'Movimiento no encontrado' });
    }
    
    await movimiento.destroy();
    res.json({ message: 'Movimiento eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar movimiento', details: error });
  }
};
