import { Request, Response } from 'express';
import Proveedor from '../../models/Proveedor';

export const getAllProveedores = async (req: Request, res: Response) => {
  try {
    const proveedores = await Proveedor.findAll({
      order: [['razonSocial', 'ASC']],
    });
    res.json(proveedores);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener proveedores', details: error });
  }
};

export const getProveedorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const proveedor = await Proveedor.findByPk(parseInt(id as string));
    
    if (!proveedor) {
      return res.status(404).json({ error: 'Proveedor no encontrado' });
    }
    
    res.json(proveedor);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener proveedor', details: error });
  }
};

export const createProveedor = async (req: Request, res: Response) => {
  try {
    const nuevoProveedor = await Proveedor.create(req.body);
    res.status(201).json(nuevoProveedor);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear proveedor', details: error });
  }
};

export const updateProveedor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const proveedor = await Proveedor.findByPk(parseInt(id as string));
    
    if (!proveedor) {
      return res.status(404).json({ error: 'Proveedor no encontrado' });
    }
    
    await proveedor.update(req.body);
    res.json(proveedor);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar proveedor', details: error });
  }
};

export const deleteProveedor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const proveedor = await Proveedor.findByPk(parseInt(id as string));
    
    if (!proveedor) {
      return res.status(404).json({ error: 'Proveedor no encontrado' });
    }
    
    await proveedor.destroy();
    res.json({ message: 'Proveedor eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar proveedor', details: error });
  }
};
