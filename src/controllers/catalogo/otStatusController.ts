import { Request, Response } from 'express';
import OtStatus from '../../models/catalogs/OtStatus';

export const getAllOtStatus = async (req: Request, res: Response) => {
  try {
    const status = await OtStatus.findAll();
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener status de OT', details: error });
  }
};

export const getOtStatusById = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const status = await OtStatus.findByPk(codigo as string);
    
    if (!status) {
      return res.status(404).json({ error: 'Status de OT no encontrado' });
    }
    
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener status de OT', details: error });
  }
};
