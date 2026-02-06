import { Request, Response } from 'express';
import UnidadMedida from '../../models/UnidadMedida';

export const getAllUnidadesMedida = async (req: Request, res: Response) => {
  try {
    const unidades = await UnidadMedida.findAll();
    res.json(unidades);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener unidades de medida', details: error });
  }
};

export const getUnidadMedidaById = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const unidad = await UnidadMedida.findByPk(codigo as string);
    
    if (!unidad) {
      return res.status(404).json({ error: 'Unidad de medida no encontrada' });
    }
    
    res.json(unidad);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener unidad de medida', details: error });
  }
};

export const createUnidadMedida = async (req: Request, res: Response) => {
  try {
    const unidad = await UnidadMedida.create(req.body);
    res.status(201).json(unidad);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear unidad de medida', details: error });
  }
};

export const updateUnidadMedida = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const [updated] = await UnidadMedida.update(req.body, { where: { codigo } });
    
    if (!updated) {
      return res.status(404).json({ error: 'Unidad de medida no encontrada' });
    }
    
    const unidad = await UnidadMedida.findByPk(codigo as string);
    res.json(unidad);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar unidad de medida', details: error });
  }
};

export const deleteUnidadMedida = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const deleted = await UnidadMedida.destroy({ where: { codigo } });
    
    if (!deleted) {
      return res.status(404).json({ error: 'Unidad de medida no encontrada' });
    }
    
    res.json({ message: 'Unidad de medida eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar unidad de medida', details: error });
  }
};
