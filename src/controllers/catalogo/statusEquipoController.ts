import { Request, Response } from 'express';
import StatusEquipo from '../../models/catalogs/StatusEquipo';

export const getAllStatusEquipo = async (req: Request, res: Response) => {
  try {
    const status = await StatusEquipo.findAll();
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener status de equipos', details: error });
  }
};

export const getStatusEquipoById = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const status = await StatusEquipo.findByPk(codigo as string);
    
    if (!status) {
      return res.status(404).json({ error: 'Status de equipo no encontrado' });
    }
    
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener status de equipo', details: error });
  }
};
