import { Request, Response } from 'express';
import Planta from '../../models/catalogs/Planta';

export const getAllPlantas = async (req: Request, res: Response) => {
  console.log('\n[GET ALL PLANTAS] Solicitud recibida');
  try {
    const plantas = await Planta.findAll({
      order: [['codigo', 'ASC']]
    });
    console.log(`[GET ALL PLANTAS] ${plantas.length} plantas encontradas`);
    if (plantas.length > 0) {
      console.log('[GET ALL PLANTAS] Primera planta:', JSON.stringify(plantas[0].toJSON(), null, 2));
    }
    res.json(plantas);
  } catch (error) {
    console.error('[GET ALL PLANTAS] Error:', error);
    res.status(500).json({ error: 'Error al obtener plantas', details: error });
  }
};

export const getPlantaById = async (req: Request, res: Response) => {
  const { codigo } = req.params;
  console.log(`\n[GET PLANTA BY ID] Solicitud para codigo: "${codigo}"`);
  try {
    const planta = await Planta.findOne({ where: { codigo } });
    
    if (!planta) {
      console.log('[GET PLANTA BY ID] Planta NO encontrada');
      return res.status(404).json({ error: 'Planta no encontrada' });
    }
    
    console.log('[GET PLANTA BY ID] Planta encontrada:');
    console.log(JSON.stringify(planta.toJSON(), null, 2));
    console.log('[GET PLANTA BY ID] Campos de la planta:');
    console.log('  - planta_id:', planta.planta_id);
    console.log('  - codigo:', planta.codigo);
    console.log('  - nombre:', planta.nombre);
    console.log('  - direccion:', planta.direccion);
    console.log('  - activo:', planta.activo);
    
    res.json(planta);
  } catch (error) {
    console.error('[GET PLANTA BY ID] Error:', error);
    res.status(500).json({ error: 'Error al obtener planta', details: error });
  }
};

export const createPlanta = async (req: Request, res: Response) => {
  console.log('\n[CREATE PLANTA] Solicitud recibida');
  console.log('[CREATE PLANTA] Datos recibidos:', JSON.stringify(req.body, null, 2));
  try {
    const planta = await Planta.create(req.body);
    console.log('[CREATE PLANTA] Planta creada exitosamente:', JSON.stringify(planta.toJSON(), null, 2));
    res.status(201).json(planta);
  } catch (error) {
    console.error('[CREATE PLANTA] Error:', error);
    res.status(500).json({ error: 'Error al crear planta', details: error });
  }
};

export const updatePlanta = async (req: Request, res: Response) => {
  const { codigo } = req.params;
  console.log(`\n[UPDATE PLANTA] Solicitud para codigo: "${codigo}"`);
  console.log('[UPDATE PLANTA] Datos a actualizar:', JSON.stringify(req.body, null, 2));
  try {
    const [updated] = await Planta.update(req.body, { where: { codigo } });
    
    if (!updated) {
      console.log('[UPDATE PLANTA] Planta NO encontrada');
      return res.status(404).json({ error: 'Planta no encontrada' });
    }
    
    const planta = await Planta.findOne({ where: { codigo } });
    console.log('[UPDATE PLANTA] Planta actualizada:', JSON.stringify(planta?.toJSON(), null, 2));
    res.json(planta);
  } catch (error) {
    console.error('[UPDATE PLANTA] Error:', error);
    res.status(500).json({ error: 'Error al actualizar planta', details: error });
  }
};

export const deletePlanta = async (req: Request, res: Response) => {
  const { codigo } = req.params;
  console.log(`\n[DELETE PLANTA] Solicitud para eliminar codigo: "${codigo}"`);
  try {
    const deleted = await Planta.destroy({ where: { codigo } });
    
    if (!deleted) {
      console.log('[DELETE PLANTA] Planta NO encontrada');
      return res.status(404).json({ error: 'Planta no encontrada' });
    }
    
    console.log('[DELETE PLANTA] Planta eliminada correctamente');
    res.json({ message: 'Planta eliminada correctamente' });
  } catch (error) {
    console.error('[DELETE PLANTA] Error:', error);
    res.status(500).json({ error: 'Error al eliminar planta', details: error });
  }
};
