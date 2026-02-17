import { Request, Response } from 'express';
import TipoGarantia from '../../models/catalogs/TipoGarantia';

export const getAllTiposGarantia = async (req: Request, res: Response) => {
  try {
    const tipos = await TipoGarantia.findAll();
    res.json(tipos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tipos de garantía', details: error });
  }
};

export const getTipoGarantiaById = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const tipo = await TipoGarantia.findByPk(codigo as string);
    
    if (!tipo) {
      return res.status(404).json({ error: 'Tipo de garantía no encontrado' });
    }
    
    res.json(tipo);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tipo de garantía', details: error });
  }
};
