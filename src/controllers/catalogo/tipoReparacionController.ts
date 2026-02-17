import { Request, Response } from 'express';
import TipoReparacion from '../../models/catalogs/TipoReparacion';

export const getAllTiposReparacion = async (req: Request, res: Response) => {
  try {
    const tipos = await TipoReparacion.findAll();
    res.json(tipos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tipos de reparación', details: error });
  }
};

export const getTipoReparacionById = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const tipo = await TipoReparacion.findByPk(codigo as string);
    
    if (!tipo) {
      return res.status(404).json({ error: 'Tipo de reparación no encontrado' });
    }
    
    res.json(tipo);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tipo de reparación', details: error });
  }
};
