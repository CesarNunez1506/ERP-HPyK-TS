import { Request, Response } from 'express';
import Fabricante from '../../models/Fabricante';

export const getAllFabricantes = async (req: Request, res: Response) => {
  try {
    const fabricantes = await Fabricante.findAll();
    res.json(fabricantes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener fabricantes', details: error });
  }
};

export const getFabricanteById = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const fabricante = await Fabricante.findByPk(codigo as string);
    
    if (!fabricante) {
      return res.status(404).json({ error: 'Fabricante no encontrado' });
    }
    
    res.json(fabricante);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener fabricante', details: error });
  }
};

export const createFabricante = async (req: Request, res: Response) => {
  try {
    const fabricante = await Fabricante.create(req.body);
    res.status(201).json(fabricante);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear fabricante', details: error });
  }
};

export const updateFabricante = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const [updated] = await Fabricante.update(req.body, { where: { codigo } });
    
    if (!updated) {
      return res.status(404).json({ error: 'Fabricante no encontrado' });
    }
    
    const fabricante = await Fabricante.findByPk(codigo as string);
    res.json(fabricante);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar fabricante', details: error });
  }
};

export const deleteFabricante = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const deleted = await Fabricante.destroy({ where: { codigo } });
    
    if (!deleted) {
      return res.status(404).json({ error: 'Fabricante no encontrado' });
    }
    
    res.json({ message: 'Fabricante eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar fabricante', details: error });
  }
};
