import { Request, Response } from 'express';
import Material from '../../models/Material';

export const getAllMateriales = async (req: Request, res: Response) => {
  try {
    // Verificar si la tabla existe
    const materiales = await Material.findAll({
      order: [['material_id', 'ASC']],
      raw: true // Devolver objetos planos
    }).catch(err => {
      console.error('Error en findAll:', err.message);
      return [];
    });
    
    console.log(`✓ Materiales encontrados: ${materiales.length}`);
    res.json(materiales);
  } catch (error: any) {
    console.error('Error al obtener materiales:', error);
    // Devolver array vacío en lugar de error 500
    res.json([]);
  }
};

export const getMaterialById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const material = await Material.findByPk(parseInt(id as string));
    
    if (!material) {
      return res.status(404).json({ error: 'Material no encontrado' });
    }
    
    res.json(material);
  } catch (error: any) {
    console.error('Error al obtener material:', error);
    res.status(500).json({ 
      error: 'Error al obtener material', 
      details: error.message 
    });
  }
};

export const createMaterial = async (req: Request, res: Response) => {
  try {
    const material = await Material.create(req.body);
    res.status(201).json(material);
  } catch (error: any) {
    console.error('Error al crear material:', error);
    res.status(500).json({ 
      error: 'Error al crear material', 
      details: error.message 
    });
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
  } catch (error: any) {
    console.error('Error al actualizar material:', error);
    res.status(500).json({ 
      error: 'Error al actualizar material', 
      details: error.message 
    });
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
  } catch (error: any) {
    console.error('Error al eliminar material:', error);
    res.status(500).json({ 
      error: 'Error al eliminar material', 
      details: error.message 
    });
  }
};
