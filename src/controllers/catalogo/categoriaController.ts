import { Request, Response } from 'express';
import Categoria from '../../models/catalogs/Categoria';

export const getAllCategorias = async (req: Request, res: Response) => {
  console.log('\n📁 [GET ALL CATEGORIAS] === INICIO DE SOLICITUD ===');
  try {
    console.log('[GET ALL CATEGORIAS] Intentando obtener categorías...');
    const categorias = await Categoria.findAll({
      order: [['codigo', 'ASC']]
    });
    console.log(`[GET ALL CATEGORIAS] ✅ ${categorias.length} categorías encontradas`);
    res.json(categorias);
  } catch (error) {
    console.error('[GET ALL CATEGORIAS] ❌ ERROR DETALLADO:');
    console.error('[GET ALL CATEGORIAS] Error message:', error instanceof Error ? error.message : 'Unknown error');
    console.error('[GET ALL CATEGORIAS] Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    res.status(500).json({ 
      error: 'Error al obtener categorías', 
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getCategoriaById = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const categoria = await Categoria.findByPk(codigo as string);
    
    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener categoría', details: error });
  }
};

export const createCategoria = async (req: Request, res: Response) => {
  try {
    const categoria = await Categoria.create(req.body);
    res.status(201).json(categoria);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear categoría', details: error });
  }
};

export const updateCategoria = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const [updated] = await Categoria.update(req.body, { where: { codigo } });
    
    if (!updated) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    
    const categoria = await Categoria.findByPk(codigo as string);
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar categoría', details: error });
  }
};

export const deleteCategoria = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const deleted = await Categoria.destroy({ where: { codigo } });
    
    if (!deleted) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    
    res.json({ message: 'Categoría eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar categoría', details: error });
  }
};
