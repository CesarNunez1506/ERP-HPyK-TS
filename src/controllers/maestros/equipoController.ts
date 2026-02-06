import { Request, Response } from 'express';
import Equipo from '../../models/Equipo';
import StatusEquipo from '../../models/StatusEquipo';
import Area from '../../models/Area';
import SubArea from '../../models/SubArea';
import TipoEquipo from '../../models/TipoEquipo';
import Planta from '../../models/Planta';
import Criticidad from '../../models/Criticidad';
import UnidadMedida from '../../models/UnidadMedida';

export const getAllEquipos = async (req: Request, res: Response) => {
  try {
    const equipos = await Equipo.findAll({
      include: [
        { model: StatusEquipo },
        { model: Area },
        { model: SubArea },
        { model: TipoEquipo },
        { model: Planta },
        { model: Criticidad },
        { model: UnidadMedida }
      ]
    });
    res.json(equipos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener equipos', details: error });
  }
};

export const getEquipoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const equipo = await Equipo.findByPk(parseInt(id as string), {
      include: [
        { model: StatusEquipo },
        { model: Area },
        { model: SubArea },
        { model: TipoEquipo },
        { model: Planta },
        { model: Criticidad },
        { model: UnidadMedida }
      ]
    });
    
    if (!equipo) {
      return res.status(404).json({ error: 'Equipo no encontrado' });
    }
    
    res.json(equipo);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener equipo', details: error });
  }
};

export const createEquipo = async (req: Request, res: Response) => {
  try {
    const equipo = await Equipo.create(req.body);
    res.status(201).json(equipo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear equipo', details: error });
  }
};

export const updateEquipo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [updated] = await Equipo.update(req.body, { where: { equipo_id: id } });
    
    if (!updated) {
      return res.status(404).json({ error: 'Equipo no encontrado' });
    }
    
    const equipo = await Equipo.findByPk(parseInt(id as string));
    res.json(equipo);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar equipo', details: error });
  }
};

export const deleteEquipo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Equipo.destroy({ where: { equipo_id: id } });
    
    if (!deleted) {
      return res.status(404).json({ error: 'Equipo no encontrado' });
    }
    
    res.json({ message: 'Equipo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar equipo', details: error });
  }
};
