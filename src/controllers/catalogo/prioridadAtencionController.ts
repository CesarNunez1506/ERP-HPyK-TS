import { Request, Response } from 'express';
import PrioridadAtencion from '../../models/catalogs/PrioridadAtencion';

export const getAllPrioridadesAtencion = async (req: Request, res: Response) => {
  try {
    const prioridades = await PrioridadAtencion.findAll();
    res.json(prioridades);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener prioridades de atención', details: error });
  }
};

export const getPrioridadAtencionById = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const prioridad = await PrioridadAtencion.findByPk(codigo as string);
    
    if (!prioridad) {
      return res.status(404).json({ error: 'Prioridad de atención no encontrada' });
    }
    
    res.json(prioridad);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener prioridad de atención', details: error });
  }
};
