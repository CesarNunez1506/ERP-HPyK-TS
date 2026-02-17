import { Request, Response } from 'express';
import Posicion from '../../models/catalogs/Posicion';

export const getAllPosiciones = async (req: Request, res: Response) => {
  try {
    const posiciones = await Posicion.findAll();
    res.json(posiciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener posiciones', details: error });
  }
};

export const getPosicionById = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const posicion = await Posicion.findByPk(codigo as string);
    
    if (!posicion) {
      return res.status(404).json({ error: 'Posición no encontrada' });
    }
    
    res.json(posicion);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener posición', details: error });
  }
};
