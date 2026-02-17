import { Request, Response } from 'express';
import Garantia from '../../models/catalogs/Garantia';

export const getAllGarantias = async (req: Request, res: Response) => {
  try {
    const garantias = await Garantia.findAll();
    res.json(garantias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener garantías', details: error });
  }
};

export const getGarantiaById = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const garantia = await Garantia.findByPk(codigo as string);
    
    if (!garantia) {
      return res.status(404).json({ error: 'Garantía no encontrada' });
    }
    
    res.json(garantia);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener garantía', details: error });
  }
};
