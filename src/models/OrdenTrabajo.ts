import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

// 6️⃣ 6_OTs — TODOS (tabla central del ERP)

interface OrdenTrabajoAttributes {
  ot_id: number;
  numero_ot: string; // Código OT (autogenerado)
  
  // Información Cliente y Estrategia
  cliente_id?: number;
  tiene_estrategia: boolean; // Si/No
  estrategia_codigo?: string;
  
  // Información Cod Rep (manual si hay estrategia)
  cod_rep_codigo?: string;
  // Los siguientes jalan automáticamente de Cod Rep:
  cod_rep_tipo?: string;
  cod_rep_np?: string;
  cod_rep_descripcion?: string;
  cod_rep_fabricante?: string;
  cod_rep_flota?: string;
  cod_rep_posicion?: string;
  
  // Información Equipo
  equipo_codigo: string;
  equipo_numero_serie?: string; // NS
  equipo_plaqueteo?: string;
  
  // Información Cliente
  wo_cliente?: string;
  po_cliente?: string;
  id_viajero?: string;
  guia_remision?: string; // Guía de remisión (llegada)
  empresa_entrega?: string;
  fecha_recepcion?: Date;
  
  // PCR y vida útil
  pcr?: number; // Vida útil programada
  horas?: number;
  porcentaje_pcr?: number; // Calculado (Hrs / PCR)
  
  // Garantías y tipo de reparación
  garantia_codigo?: string;
  atencion_reparacion_codigo?: string;
  tipo_reparacion_codigo?: string;
  tipo_garantia_codigo?: string;
  prioridad_atencion_codigo?: string;
  
  // Contrato y tiempos
  contrato_dias?: number; // Manual o calculado si tiene contrato
  base_metalica_codigo?: string;
  comentarios?: string;
  fecha_requerimiento_cliente?: Date;
  
  // Status
  ot_status_codigo: string;
  recursos_status_codigo?: string;
  taller_status_codigo?: string;
  
  // Metadata
  usuario_crea?: string;
  fecha_creacion?: Date;
  usuario_actualiza?: string;
  fecha_actualizacion?: Date;
}

interface OrdenTrabajoCreationAttributes extends Optional<OrdenTrabajoAttributes, 'ot_id'> {}

class OrdenTrabajo extends Model<OrdenTrabajoAttributes, OrdenTrabajoCreationAttributes> implements OrdenTrabajoAttributes {
  public ot_id!: number;
  public numero_ot!: string;
  
  public cliente_id?: number;
  public tiene_estrategia!: boolean;
  public estrategia_codigo?: string;
  
  public cod_rep_codigo?: string;
  public cod_rep_tipo?: string;
  public cod_rep_np?: string;
  public cod_rep_descripcion?: string;
  public cod_rep_fabricante?: string;
  public cod_rep_flota?: string;
  public cod_rep_posicion?: string;
  
  public equipo_codigo!: string;
  public equipo_numero_serie?: string;
  public equipo_plaqueteo?: string;
  
  public wo_cliente?: string;
  public po_cliente?: string;
  public id_viajero?: string;
  public guia_remision?: string;
  public empresa_entrega?: string;
  public fecha_recepcion?: Date;
  
  public pcr?: number;
  public horas?: number;
  public porcentaje_pcr?: number;
  
  public garantia_codigo?: string;
  public atencion_reparacion_codigo?: string;
  public tipo_reparacion_codigo?: string;
  public tipo_garantia_codigo?: string;
  public prioridad_atencion_codigo?: string;
  
  public contrato_dias?: number;
  public base_metalica_codigo?: string;
  public comentarios?: string;
  public fecha_requerimiento_cliente?: Date;
  
  public ot_status_codigo!: string;
  public recursos_status_codigo?: string;
  public taller_status_codigo?: string;
  
  public usuario_crea?: string;
  public fecha_creacion?: Date;
  public usuario_actualiza?: string;
  public fecha_actualizacion?: Date;
}

OrdenTrabajo.init(
  {
    ot_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    numero_ot: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      comment: 'Código OT (autogenerado por software)',
    },
    
    // Cliente y Estrategia
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'cliente', key: 'cliente_id' },
      comment: 'Tabla catálogo - Cliente',
    },
    tiene_estrategia: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: 'Tabla catálogo - Si/No tiene estrategia',
    },
    estrategia_codigo: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: { model: 'estrategia', key: 'codigo' },
      comment: 'Tabla catálogo (Si/No)',
    },
    
    // Cod Rep (manual si hay estrategia)
    cod_rep_codigo: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: { model: 'codigo_reparacion', key: 'codigo' },
      comment: 'Manual (habilitado si hay estrategia)',
    },
    cod_rep_tipo: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: 'Jala de Cod Rep automáticamente - Tipo',
    },
    cod_rep_np: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: 'Jala de Cod Rep automáticamente - NP',
    },
    cod_rep_descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Jala de Cod Rep automáticamente - Descripción',
    },
    cod_rep_fabricante: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: 'Jala de Cod Rep automáticamente - Fabricante',
    },
    cod_rep_flota: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: 'Jala de Cod Rep automáticamente - Flota',
    },
    cod_rep_posicion: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: 'Jala de Cod Rep automáticamente - Posición',
    },
    
    // Equipo
    equipo_codigo: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: { model: 'equipo', key: 'codigo' },
      comment: 'Manual - Código del equipo',
    },
    equipo_numero_serie: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: 'Manual - NS (Número de serie)',
    },
    equipo_plaqueteo: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: 'Manual - Plaqueteo',
    },
    
    // Información Cliente
    wo_cliente: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: 'Manual - WO Cliente',
    },
    po_cliente: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: 'Manual - PO Cliente',
    },
    id_viajero: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: 'Manual - ID Viajero',
    },
    guia_remision: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: 'Manual - Guía de remisión (llegada)',
    },
    empresa_entrega: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: 'Manual - Empresa que entrega',
    },
    fecha_recepcion: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: 'Manual - Fecha de recepción',
    },
    
    // PCR
    pcr: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      comment: 'Manual - PCR (vida útil programada)',
    },
    horas: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      comment: 'Manual - Horas',
    },
    porcentaje_pcr: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      comment: 'Calculado - % PCR (Hrs / PCR)',
    },
    
    // Garantías y Reparación
    garantia_codigo: {
      type: DataTypes.STRING(10),
      allowNull: true,
      references: { model: 'garantia', key: 'codigo' },
      comment: 'Tabla catálogo - Garantía',
    },
    atencion_reparacion_codigo: {
      type: DataTypes.STRING(10),
      allowNull: true,
      references: { model: 'atencion_reparacion', key: 'codigo' },
      comment: 'Tabla catálogo - Atención reparación',
    },
    tipo_reparacion_codigo: {
      type: DataTypes.STRING(10),
      allowNull: true,
      references: { model: 'tipo_reparacion', key: 'codigo' },
      comment: 'Tabla catálogo - Tipo Reparación',
    },
    tipo_garantia_codigo: {
      type: DataTypes.STRING(10),
      allowNull: true,
      references: { model: 'tipo_garantia', key: 'codigo' },
      comment: 'Tabla catálogo - Tipo Garantía',
    },
    prioridad_atencion_codigo: {
      type: DataTypes.STRING(10),
      allowNull: true,
      references: { model: 'prioridad_atencion', key: 'codigo' },
      comment: 'Tabla catálogo - Prioridad de atención',
    },
    
    // Contrato
    contrato_dias: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'Manual / calculado si tiene contrato - Contrato (días)',
    },
    base_metalica_codigo: {
      type: DataTypes.STRING(10),
      allowNull: true,
      references: { model: 'base_metalica', key: 'codigo' },
      comment: 'Tabla catálogo - Base Metálica',
    },
    comentarios: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Manual - Comentarios',
    },
    fecha_requerimiento_cliente: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: 'Manual - Fecha requerimiento cliente',
    },
    
    // Status
    ot_status_codigo: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: { model: 'ot_status', key: 'codigo' },
      comment: 'Tabla catálogo - OT Status',
    },
    recursos_status_codigo: {
      type: DataTypes.STRING(10),
      allowNull: true,
      references: { model: 'recursos_status', key: 'codigo' },
      comment: 'Tabla catálogo - Recursos Status',
    },
    taller_status_codigo: {
      type: DataTypes.STRING(10),
      allowNull: true,
      references: { model: 'taller_status', key: 'codigo' },
      comment: 'Tabla catálogo - Taller Status',
    },
    
    // Metadata
    usuario_crea: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    usuario_actualiza: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    fecha_actualizacion: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'orden_trabajo',
    timestamps: false,
  }
);

export default OrdenTrabajo;
