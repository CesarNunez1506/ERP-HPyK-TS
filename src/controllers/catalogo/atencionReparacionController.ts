import { Request, Response } from 'express';
import AtencionReparacion from '../../models/catalogs/AtencionReparacion';

export const getAllAtencionesReparacion = async (req: Request, res: Response) => {
  try {
    const atenciones = await AtencionReparacion.findAll();
    res.json(atenciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener atenciones de reparación', details: error });
  }
};

export const getAtencionReparacionById = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const atencion = await AtencionReparacion.findByPk(codigo as string);
    
    if (!atencion) {
      return res.status(404).json({ error: 'Atención de reparación no encontrada' });
    }
    
    res.json(atencion);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener atención de reparación', details: error });
  }
};
