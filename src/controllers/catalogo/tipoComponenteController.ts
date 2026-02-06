import { Request, Response } from 'express';
import TipoComponente from '../../models/TipoComponente';

export const getAllTiposComponente = async (req: Request, res: Response) => {
  try {
    const tipos = await TipoComponente.findAll();
    res.json(tipos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tipos de componente', details: error });
  }
};

export const getTipoComponenteById = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const tipo = await TipoComponente.findByPk(codigo as string);
    
    if (!tipo) {
      return res.status(404).json({ error: 'Tipo de componente no encontrado' });
    }
    
    res.json(tipo);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tipo de componente', details: error });
  }
};

export const createTipoComponente = async (req: Request, res: Response) => {
  try {
    const tipo = await TipoComponente.create(req.body);
    res.status(201).json(tipo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear tipo de componente', details: error });
  }
};

export const updateTipoComponente = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const [updated] = await TipoComponente.update(req.body, { where: { codigo } });
    
    if (!updated) {
      return res.status(404).json({ error: 'Tipo de componente no encontrado' });
    }
    
    const tipo = await TipoComponente.findByPk(codigo as string);
    res.json(tipo);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar tipo de componente', details: error });
  }
};

export const deleteTipoComponente = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const deleted = await TipoComponente.destroy({ where: { codigo } });
    
    if (!deleted) {
      return res.status(404).json({ error: 'Tipo de componente no encontrado' });
    }
    
    res.json({ message: 'Tipo de componente eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar tipo de componente', details: error });
  }
};
