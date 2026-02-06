import { Request, Response } from 'express';
import Componente from '../../models/Componente';
import Equipo from '../../models/Equipo';
import TipoComponente from '../../models/TipoComponente';
import Criticidad from '../../models/Criticidad';
import UnidadMedida from '../../models/UnidadMedida';

export const getAllComponentes = async (req: Request, res: Response) => {
  try {
    const componentes = await Componente.findAll({
      include: [
        { model: Equipo },
        { model: TipoComponente },
        { model: Criticidad },
        { model: UnidadMedida }
      ]
    });
    res.json(componentes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener componentes', details: error });
  }
};

export const getComponenteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const componente = await Componente.findByPk(parseInt(id as string), {
      include: [
        { model: Equipo },
        { model: TipoComponente },
        { model: Criticidad },
        { model: UnidadMedida }
      ]
    });
    
    if (!componente) {
      return res.status(404).json({ error: 'Componente no encontrado' });
    }
    
    res.json(componente);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener componente', details: error });
  }
};

export const getComponentesByEquipo = async (req: Request, res: Response) => {
  try {
    const { equipo_id } = req.params;
    const componentes = await Componente.findAll({
      where: { equipo_id },
      include: [
        { model: TipoComponente },
        { model: Criticidad },
        { model: UnidadMedida }
      ]
    });
    res.json(componentes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener componentes del equipo', details: error });
  }
};

export const createComponente = async (req: Request, res: Response) => {
  try {
    const componente = await Componente.create(req.body);
    res.status(201).json(componente);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear componente', details: error });
  }
};

export const updateComponente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [updated] = await Componente.update(req.body, { where: { componente_id: id } });
    
    if (!updated) {
      return res.status(404).json({ error: 'Componente no encontrado' });
    }
    
    const componente = await Componente.findByPk(parseInt(id as string));
    res.json(componente);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar componente', details: error });
  }
};

export const deleteComponente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Componente.destroy({ where: { componente_id: id } });
    
    if (!deleted) {
      return res.status(404).json({ error: 'Componente no encontrado' });
    }
    
    res.json({ message: 'Componente eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar componente', details: error });
  }
};
