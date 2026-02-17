/**
 * Controlador para Historial de Órdenes de Trabajo
 * Maneja el registro y consulta de operaciones realizadas en las OTs
 */

import { Request, Response } from 'express';
import { QueryTypes } from 'sequelize';
import OTHistorial from '../../models/OTHistorial';
import sequelize from '../../config/database';

// Helper para asegurar que el parámetro sea string
const ensureString = (param: string | string[]): string => {
  return Array.isArray(param) ? param[0] : param;
};

// Obtener historial completo de una OT
export const getHistorialByOT = async (req: Request, res: Response) => {
  try {
    const otId = ensureString(req.params.otId);
    
    const historial = await OTHistorial.findAll({
      where: { ot_id: parseInt(otId) },
      order: [['fecha', 'DESC']]
    });
    
    res.json(historial);
  } catch (error) {
    console.error('Error al obtener historial:', error);
    res.status(500).json({ error: 'Error al obtener historial de la OT', details: error });
  }
};

// Obtener historial detallado con información relacionada
export const getHistorialDetailedByOT = async (req: Request, res: Response) => {
  try {
    const otId = ensureString(req.params.otId);
    
    // Consulta con información relacionada
    const historial = await sequelize.query(
      `SELECT 
        h.*,
        CASE 
          WHEN h.tipo_operacion = 'Generación PO' THEN (
            SELECT numero_po FROM compras WHERE ot_id = h.ot_id LIMIT 1
          )
          ELSE NULL
        END as po_numero,
        CASE 
          WHEN h.tipo_operacion = 'Solicitud Repuestos' THEN (
            SELECT COUNT(*) FROM ot_repuestos WHERE ot_id = h.ot_id
          )
          ELSE NULL
        END as cantidad_repuestos
      FROM ot_historial h
      WHERE h.ot_id = :otId
      ORDER BY h.fecha DESC`,
      {
        replacements: { otId },
        type: QueryTypes.SELECT
      }
    );
    
    res.json(historial);
  } catch (error) {
    console.error('Error al obtener historial detallado:', error);
    res.status(500).json({ error: 'Error al obtener historial detallado', details: error });
  }
};

// Crear entrada manual en el historial
export const createHistorialEntry = async (req: Request, res: Response) => {
  try {
    const otId = ensureString(req.params.otId);
    const { tipo_operacion, descripcion, usuario, datos_adicionales } = req.body;
    
    const entrada = await OTHistorial.create({
      ot_id: parseInt(otId),
      tipo_operacion,
      descripcion,
      usuario: usuario || 'Admin',
      fecha: new Date(),
      datos_adicionales: datos_adicionales ? JSON.stringify(datos_adicionales) : undefined
    });
    
    res.status(201).json(entrada);
  } catch (error) {
    console.error('Error al crear entrada de historial:', error);
    res.status(400).json({ error: 'Error al crear entrada de historial', details: error });
  }
};

// Obtener resumen de operaciones de una OT
export const getResumenOperaciones = async (req: Request, res: Response) => {
  try {
    const otId = ensureString(req.params.otId);
    
    const resumen = await sequelize.query(
      `SELECT 
        tipo_operacion,
        COUNT(*) as cantidad,
        MAX(fecha) as ultima_fecha
      FROM ot_historial
      WHERE ot_id = :otId
      GROUP BY tipo_operacion
      ORDER BY cantidad DESC`,
      {
        replacements: { otId },
        type: QueryTypes.SELECT
      }
    );
    
    res.json(resumen);
  } catch (error) {
    console.error('Error al obtener resumen de operaciones:', error);
    res.status(500).json({ error: 'Error al obtener resumen', details: error });
  }
};
