/**
 * Controlador para Repuestos de Órdenes de Trabajo
 * Maneja las solicitudes de repuestos vinculadas a OTs
 */

import { Request, Response } from 'express';
import { QueryTypes } from 'sequelize';
import OTRepuesto from '../../models/OTRepuesto';
import OTHistorial from '../../models/OTHistorial';
import sequelize from '../../config/database';

// Helper para asegurar que el parámetro sea string
const ensureString = (param: string | string[]): string => {
  return Array.isArray(param) ? param[0] : param;
};

// Obtener todos los repuestos de una OT
export const getRepuestosByOT = async (req: Request, res: Response) => {
  try {
    const otId = ensureString(req.params.otId);
    
    const repuestos = await sequelize.query(
      `SELECT 
        otr.*,
        m.nombre as material_nombre,
        m.codigo_sap as material_codigo,
        p.razonSocial as proveedor_nombre,
        po.numero_po as po_numero
      FROM ot_repuestos otr
      LEFT JOIN materiales m ON otr.material_id = m.id
      LEFT JOIN proveedores p ON otr.proveedor_id = p.id
      LEFT JOIN compras po ON otr.po_id = po.id
      WHERE otr.ot_id = :otId
      ORDER BY otr.fecha_solicitud DESC`,
      {
        replacements: { otId },
        type: QueryTypes.SELECT
      }
    );
    
    res.json(repuestos);
  } catch (error) {
    console.error('Error al obtener repuestos:', error);
    res.status(500).json({ error: 'Error al obtener repuestos de la OT', details: error });
  }
};

// Crear solicitud de repuestos para una OT
export const createRepuestos = async (req: Request, res: Response) => {
  try {
    const otId = ensureString(req.params.otId);
    const { repuestos, usuario } = req.body;
    
    if (!Array.isArray(repuestos) || repuestos.length === 0) {
      return res.status(400).json({ error: 'Debe proporcionar al menos un repuesto' });
    }
    
    // Iniciar transacción
    const transaction = await sequelize.transaction();
    
    try {
      // Crear los repuestos
      const repuestosCreados = await Promise.all(
        repuestos.map((rep: any) => 
          OTRepuesto.create({
            ot_id: parseInt(otId),
            material_id: rep.material_id,
            cantidad: rep.cantidad,
            proveedor_id: rep.proveedor_id || null,
            observaciones: rep.observaciones || null,
            estado: 'Pendiente',
            usuario_solicita: usuario || 'Admin',
            fecha_solicitud: new Date()
          }, { transaction })
        )
      );
      
      // Registrar en el historial
      await OTHistorial.create({
        ot_id: parseInt(otId),
        tipo_operacion: 'Solicitud Repuestos',
        descripcion: `Solicitud de ${repuestos.length} repuesto(s)`,
        usuario: usuario || 'Admin',
        fecha: new Date(),
        datos_adicionales: JSON.stringify({ cantidad_items: repuestos.length })
      }, { transaction });
      
      await transaction.commit();
      
      res.status(201).json({ 
        message: 'Repuestos solicitados correctamente',
        repuestos: repuestosCreados 
      });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error('Error al crear solicitud de repuestos:', error);
    res.status(400).json({ error: 'Error al crear solicitud de repuestos', details: error });
  }
};

// Actualizar estado de un repuesto
export const updateRepuesto = async (req: Request, res: Response) => {
  try {
    const id = ensureString(req.params.id);
    const { estado, usuario_aprueba, po_id } = req.body;
    
    const repuesto = await OTRepuesto.findByPk(parseInt(id));
    
    if (!repuesto) {
      return res.status(404).json({ error: 'Repuesto no encontrado' });
    }
    
    const updates: any = { estado };
    
    if (estado === 'Aprobado' && usuario_aprueba) {
      updates.usuario_aprueba = usuario_aprueba;
      updates.fecha_aprobacion = new Date();
    }
    
    if (po_id) {
      updates.po_id = po_id;
      updates.estado = 'En PO';
    }
    
    await repuesto.update(updates);
    
    // Registrar en historial
    await OTHistorial.create({
      ot_id: repuesto.ot_id,
      tipo_operacion: 'Cambio Estado',
      descripcion: `Repuesto ${id} cambió a estado: ${estado}`,
      usuario: usuario_aprueba || 'Admin',
      fecha: new Date(),
      datos_adicionales: JSON.stringify({ repuesto_id: id, estado_anterior: repuesto.estado, estado_nuevo: estado })
    });
    
    res.json(repuesto);
  } catch (error) {
    console.error('Error al actualizar repuesto:', error);
    res.status(400).json({ error: 'Error al actualizar repuesto', details: error });
  }
};

// Eliminar repuesto (solo si está en estado Pendiente)
export const deleteRepuesto = async (req: Request, res: Response) => {
  try {
    const id = ensureString(req.params.id);
    
    const repuesto = await OTRepuesto.findByPk(parseInt(id));
    
    if (!repuesto) {
      return res.status(404).json({ error: 'Repuesto no encontrado' });
    }
    
    if (repuesto.estado !== 'Pendiente') {
      return res.status(400).json({ 
        error: 'Solo se pueden eliminar repuestos en estado Pendiente' 
      });
    }
    
    await repuesto.destroy();
    
    res.json({ message: 'Repuesto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar repuesto:', error);
    res.status(500).json({ error: 'Error al eliminar repuesto', details: error });
  }
};
