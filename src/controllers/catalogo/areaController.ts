import { Request, Response } from 'express';
import Area from '../../models/Area';

export const getAllAreas = async (req: Request, res: Response) => {
  try {
    const areas = await Area.findAll();
    res.json(areas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener áreas', details: error });
  }
};

export const getAreaById = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const area = await Area.findByPk(codigo as string);
    
    if (!area) {
      return res.status(404).json({ error: 'Área no encontrada' });
    }
    
    res.json(area);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener área', details: error });
  }
};

export const createArea = async (req: Request, res: Response) => {
  try {
    const area = await Area.create(req.body);
    res.status(201).json(area);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear área', details: error });
  }
};

export const updateArea = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const [updated] = await Area.update(req.body, { where: { codigo } });
    
    if (!updated) {
      return res.status(404).json({ error: 'Área no encontrada' });
    }
    
    const area = await Area.findByPk(codigo as string);
    res.json(area);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar área', details: error });
  }
};

export const deleteArea = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const deleted = await Area.destroy({ where: { codigo } });
    
    if (!deleted) {
      return res.status(404).json({ error: 'Área no encontrada' });
    }
    
    res.json({ message: 'Área eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar área', details: error });
  }
};
