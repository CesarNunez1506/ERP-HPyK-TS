import { Request, Response } from 'express';
import EstrategiaOt from '../../models/EstrategiaOt';

export const getAllEstrategiasOt = async (req: Request, res: Response) => {
  try {
    const estrategias = await EstrategiaOt.findAll();
    res.json(estrategias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener estrategias de OT', details: error });
  }
};

export const getEstrategiaOtById = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const estrategia = await EstrategiaOt.findByPk(codigo as string);
    
    if (!estrategia) {
      return res.status(404).json({ error: 'Estrategia de OT no encontrada' });
    }
    
    res.json(estrategia);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener estrategia de OT', details: error });
  }
};
