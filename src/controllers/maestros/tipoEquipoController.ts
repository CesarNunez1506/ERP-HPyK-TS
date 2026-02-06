import { Request, Response } from 'express';
import TipoEquipo from '../../models/TipoEquipo';
import Categoria from '../../models/Categoria';

export const getAllTiposEquipo = async (req: Request, res: Response) => {
  try {
    const tipos = await TipoEquipo.findAll({
      include: [{ model: Categoria }]
    });
    res.json(tipos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tipos de equipo', details: error });
  }
};

export const getTipoEquipoById = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const tipo = await TipoEquipo.findByPk(codigo as string, {
      include: [{ model: Categoria }]
    });
    
    if (!tipo) {
      return res.status(404).json({ error: 'Tipo de equipo no encontrado' });
    }
    
    res.json(tipo);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tipo de equipo', details: error });
  }
};

export const createTipoEquipo = async (req: Request, res: Response) => {
  try {
    const tipo = await TipoEquipo.create(req.body);
    res.status(201).json(tipo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear tipo de equipo', details: error });
  }
};

export const updateTipoEquipo = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const [updated] = await TipoEquipo.update(req.body, { where: { codigo } });
    
    if (!updated) {
      return res.status(404).json({ error: 'Tipo de equipo no encontrado' });
    }
    
    const tipo = await TipoEquipo.findByPk(codigo as string);
    res.json(tipo);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar tipo de equipo', details: error });
  }
};

export const deleteTipoEquipo = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const deleted = await TipoEquipo.destroy({ where: { codigo } });
    
    if (!deleted) {
      return res.status(404).json({ error: 'Tipo de equipo no encontrado' });
    }
    
    res.json({ message: 'Tipo de equipo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar tipo de equipo', details: error });
  }
};
