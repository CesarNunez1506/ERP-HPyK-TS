import { Request, Response } from 'express';
import BaseMetalica from '../../models/catalogs/BaseMetalica';

export const getAllBasesMetalicas = async (req: Request, res: Response) => {
  try {
    const bases = await BaseMetalica.findAll();
    res.json(bases);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener bases metálicas', details: error });
  }
};

export const getBaseMetalicaById = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const base = await BaseMetalica.findByPk(codigo as string);
    
    if (!base) {
      return res.status(404).json({ error: 'Base metálica no encontrada' });
    }
    
    res.json(base);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener base metálica', details: error });
  }
};
