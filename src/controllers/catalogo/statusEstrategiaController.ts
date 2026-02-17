import { Request, Response } from 'express';
import StatusEstrategia from '../../models/catalogs/StatusEstrategia';

export const getAllStatusEstrategia = async (req: Request, res: Response) => {
  try {
    const status = await StatusEstrategia.findAll();
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener status de estrategias', details: error });
  }
};

export const getStatusEstrategiaById = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const status = await StatusEstrategia.findByPk(codigo as string);
    
    if (!status) {
      return res.status(404).json({ error: 'Status de estrategia no encontrado' });
    }
    
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener status de estrategia', details: error });
  }
};
