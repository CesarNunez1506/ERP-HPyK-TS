import { Request, Response } from 'express';
import TipoEstrategia from '../../models/catalogs/TipoEstrategia';

export const getAllTiposEstrategia = async (req: Request, res: Response) => {
  try {
    const tipos = await TipoEstrategia.findAll();
    res.json(tipos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tipos de estrategia', details: error });
  }
};

export const getTipoEstrategiaById = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const tipo = await TipoEstrategia.findByPk(codigo as string);
    
    if (!tipo) {
      return res.status(404).json({ error: 'Tipo de estrategia no encontrado' });
    }
    
    res.json(tipo);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tipo de estrategia', details: error });
  }
};
