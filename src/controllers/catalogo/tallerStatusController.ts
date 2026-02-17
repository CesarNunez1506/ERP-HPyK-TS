import { Request, Response } from 'express';
import TallerStatus from '../../models/catalogs/TallerStatus';

export const getAllTallerStatus = async (req: Request, res: Response) => {
  try {
    const status = await TallerStatus.findAll();
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener status de taller', details: error });
  }
};

export const getTallerStatusById = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const status = await TallerStatus.findByPk(codigo as string);
    
    if (!status) {
      return res.status(404).json({ error: 'Status de taller no encontrado' });
    }
    
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener status de taller', details: error });
  }
};
