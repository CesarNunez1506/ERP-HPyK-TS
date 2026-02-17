import { Request, Response } from 'express';
import SubArea from '../../models/catalogs/SubArea';
import Area from '../../models/catalogs/Area';

export const getAllSubAreas = async (req: Request, res: Response) => {
  try {
    const subareas = await SubArea.findAll({
      include: [{ model: Area, as: 'area' }],
      order: [['codigo', 'ASC']]
    });
    res.json(subareas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener subáreas', details: error });
  }
};

export const getSubAreaById = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const subarea = await SubArea.findByPk(codigo as string, {
      include: [{ model: Area, as: 'area' }]
    });
    
    if (!subarea) {
      return res.status(404).json({ error: 'Subárea no encontrada' });
    }
    
    res.json(subarea);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener subárea', details: error });
  }
};

export const createSubArea = async (req: Request, res: Response) => {
  try {
    const subarea = await SubArea.create(req.body);
    res.status(201).json(subarea);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear subárea', details: error });
  }
};

export const updateSubArea = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const [updated] = await SubArea.update(req.body, { where: { codigo } });
    
    if (!updated) {
      return res.status(404).json({ error: 'Subárea no encontrada' });
    }
    
    const subarea = await SubArea.findByPk(codigo as string);
    res.json(subarea);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar subárea', details: error });
  }
};

export const deleteSubArea = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const deleted = await SubArea.destroy({ where: { codigo } });
    
    if (!deleted) {
      return res.status(404).json({ error: 'Subárea no encontrada' });
    }
    
    res.json({ message: 'Subárea eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar subárea', details: error });
  }
};
