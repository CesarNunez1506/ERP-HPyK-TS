import { Request, Response } from 'express';
import Estrategia from '../../models/Estrategia';
import Area from '../../models/catalogs/Area';
import Equipo from '../../models/Equipo';
import UnidadMedida from '../../models/catalogs/UnidadMedida';
import TipoEstrategia from '../../models/catalogs/TipoEstrategia';
import StatusEstrategia from '../../models/catalogs/StatusEstrategia';

export const getAllEstrategias = async (req: Request, res: Response) => {
  try {
    const estrategias = await Estrategia.findAll({
      include: [
        { model: Area, as: 'area' },
        { model: Equipo, as: 'equipo' },
        { model: UnidadMedida, as: 'unidad_medida' },
        { model: TipoEstrategia, as: 'tipo' },
        { model: StatusEstrategia, as: 'status' }
      ],
      order: [['estrategia_id', 'ASC']]
    });
    res.json(estrategias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener estrategias', details: error });
  }
};

export const getEstrategiaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const estrategia = await Estrategia.findByPk(parseInt(id as string), {
      include: [
        { model: Area, as: 'area' },
        { model: Equipo, as: 'equipo' },
        { model: UnidadMedida, as: 'unidad_medida' },
        { model: TipoEstrategia, as: 'tipo' },
        { model: StatusEstrategia, as: 'status' }
      ]
    });
    
    if (!estrategia) {
      return res.status(404).json({ error: 'Estrategia no encontrada' });
    }
    
    res.json(estrategia);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener estrategia', details: error });
  }
};

export const createEstrategia = async (req: Request, res: Response) => {
  try {
    const estrategia = await Estrategia.create(req.body);
    res.status(201).json(estrategia);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear estrategia', details: error });
  }
};

export const updateEstrategia = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [updated] = await Estrategia.update(req.body, { where: { estrategia_id: id } });
    
    if (!updated) {
      return res.status(404).json({ error: 'Estrategia no encontrada' });
    }
    
    const estrategia = await Estrategia.findByPk(parseInt(id as string));
    res.json(estrategia);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar estrategia', details: error });
  }
};

export const deleteEstrategia = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Estrategia.destroy({ where: { estrategia_id: id } });
    
    if (!deleted) {
      return res.status(404).json({ error: 'Estrategia no encontrada' });
    }
    
    res.json({ message: 'Estrategia eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar estrategia', details: error });
  }
};
