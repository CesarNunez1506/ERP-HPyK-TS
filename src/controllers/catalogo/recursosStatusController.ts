import { Request, Response } from 'express';
import RecursosStatus from '../../models/catalogs/RecursosStatus';

export const getAllRecursosStatus = async (req: Request, res: Response) => {
  try {
    const status = await RecursosStatus.findAll();
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener status de recursos', details: error });
  }
};

export const getRecursosStatusById = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const status = await RecursosStatus.findByPk(codigo as string);
    
    if (!status) {
      return res.status(404).json({ error: 'Status de recursos no encontrado' });
    }
    
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener status de recursos', details: error });
  }
};
