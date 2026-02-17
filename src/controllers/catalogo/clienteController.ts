import { Request, Response } from 'express';
import Cliente from '../../models/catalogs/Cliente';

export const getAllClientes = async (req: Request, res: Response) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener clientes', details: error });
  }
};

export const getClienteById = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const cliente = await Cliente.findByPk(codigo as string);
    
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener cliente', details: error });
  }
};

export const createCliente = async (req: Request, res: Response) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear cliente', details: error });
  }
};

export const updateCliente = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const [updated] = await Cliente.update(req.body, { where: { codigo } });
    
    if (!updated) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    
    const cliente = await Cliente.findByPk(codigo as string);
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar cliente', details: error });
  }
};

export const deleteCliente = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const deleted = await Cliente.destroy({ where: { codigo } });
    
    if (!deleted) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    
    res.json({ message: 'Cliente eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar cliente', details: error });
  }
};
