import { Request, Response } from 'express';
import RegistroReparacion from '../../models/RegistroReparacion';
import TipoComponente from '../../models/TipoComponente';
import Categoria from '../../models/Categoria';
import FlotaEquipo from '../../models/FlotaEquipo';
import Fabricante from '../../models/Fabricante';
import Posicion from '../../models/Posicion';

export const getAllRegistrosReparacion = async (req: Request, res: Response) => {
  try {
    const registros = await RegistroReparacion.findAll({
      include: [
        { model: TipoComponente },
        { model: Categoria },
        { model: FlotaEquipo },
        { model: Fabricante },
        { model: Posicion }
      ]
    });
    res.json(registros);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener registros de reparación', details: error });
  }
};

export const getRegistroReparacionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const registro = await RegistroReparacion.findByPk(parseInt(id as string), {
      include: [
        { model: TipoComponente },
        { model: Categoria },
        { model: FlotaEquipo },
        { model: Fabricante },
        { model: Posicion }
      ]
    });
    
    if (!registro) {
      return res.status(404).json({ error: 'Registro de reparación no encontrado' });
    }
    
    res.json(registro);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener registro de reparación', details: error });
  }
};

export const createRegistroReparacion = async (req: Request, res: Response) => {
  try {
    const registro = await RegistroReparacion.create(req.body);
    res.status(201).json(registro);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear registro de reparación', details: error });
  }
};

export const updateRegistroReparacion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [updated] = await RegistroReparacion.update(req.body, { where: { registro_id: id } });
    
    if (!updated) {
      return res.status(404).json({ error: 'Registro de reparación no encontrado' });
    }
    
    const registro = await RegistroReparacion.findByPk(parseInt(id as string));
    res.json(registro);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar registro de reparación', details: error });
  }
};

export const deleteRegistroReparacion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await RegistroReparacion.destroy({ where: { registro_id: id } });
    
    if (!deleted) {
      return res.status(404).json({ error: 'Registro de reparación no encontrado' });
    }
    
    res.json({ message: 'Registro de reparación eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar registro de reparación', details: error });
  }
};
