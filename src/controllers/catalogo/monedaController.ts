import { Request, Response } from 'express';
import Moneda from '../../models/Moneda';

export const getAllMonedas = async (req: Request, res: Response) => {
  try {
    const monedas = await Moneda.findAll();
    res.json(monedas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener monedas', details: error });
  }
};

export const getMonedaById = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const moneda = await Moneda.findByPk(codigo as string);
    
    if (!moneda) {
      return res.status(404).json({ error: 'Moneda no encontrada' });
    }
    
    res.json(moneda);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener moneda', details: error });
  }
};

export const createMoneda = async (req: Request, res: Response) => {
  try {
    const moneda = await Moneda.create(req.body);
    res.status(201).json(moneda);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear moneda', details: error });
  }
};

export const updateMoneda = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const [updated] = await Moneda.update(req.body, { where: { codigo } });
    
    if (!updated) {
      return res.status(404).json({ error: 'Moneda no encontrada' });
    }
    
    const moneda = await Moneda.findByPk(codigo as string);
    res.json(moneda);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar moneda', details: error });
  }
};

export const deleteMoneda = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const deleted = await Moneda.destroy({ where: { codigo } });
    
    if (!deleted) {
      return res.status(404).json({ error: 'Moneda no encontrada' });
    }
    
    res.json({ message: 'Moneda eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar moneda', details: error });
  }
};
