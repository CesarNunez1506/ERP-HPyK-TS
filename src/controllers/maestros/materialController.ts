import { Request, Response } from 'express';
import Material from '../../models/Material';
import Planta from '../../models/Planta';
import Area from '../../models/Area';
import Categoria from '../../models/Categoria';
import Clasificacion from '../../models/Clasificacion';
import UnidadMedida from '../../models/UnidadMedida';
import Moneda from '../../models/Moneda';
import Fabricante from '../../models/Fabricante';

export const getAllMateriales = async (req: Request, res: Response) => {
  try {
    const materiales = await Material.findAll({
      include: [
        { model: Planta },
        { model: Area },
        { model: Categoria },
        { model: Clasificacion },
        { model: UnidadMedida },
        { model: Moneda },
        { model: Fabricante }
      ]
    });
    res.json(materiales);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener materiales', details: error });
  }
};

export const getMaterialById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const material = await Material.findByPk(parseInt(id as string), {
      include: [
        { model: Planta },
        { model: Area },
        { model: Categoria },
        { model: Clasificacion },
        { model: UnidadMedida },
        { model: Moneda },
        { model: Fabricante }
      ]
    });
    
    if (!material) {
      return res.status(404).json({ error: 'Material no encontrado' });
    }
    
    res.json(material);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener material', details: error });
  }
};

export const createMaterial = async (req: Request, res: Response) => {
  try {
    const material = await Material.create(req.body);
    res.status(201).json(material);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear material', details: error });
  }
};

export const updateMaterial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [updated] = await Material.update(req.body, { where: { material_id: id } });
    
    if (!updated) {
      return res.status(404).json({ error: 'Material no encontrado' });
    }
    
    const material = await Material.findByPk(parseInt(id as string));
    res.json(material);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar material', details: error });
  }
};

export const deleteMaterial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Material.destroy({ where: { material_id: id } });
    
    if (!deleted) {
      return res.status(404).json({ error: 'Material no encontrado' });
    }
    
    res.json({ message: 'Material eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar material', details: error });
  }
};
