import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class OrdenTrabajo extends Model {
  public ot_id!: number;
  public numero_ot!: string;
  public cliente_codigo!: string;
  public estrategia_codigo?: string;
  public registro_reparacion_id?: number;
  public equipo_id?: number;
  public componente_id?: number;
  public cod_rep?: string;
  public tipo_reparacion_codigo?: string;
  public np?: string;
  public ns?: string;
  public fabricante?: string;
  public flota?: string;
  public posicion?: string;
  public plaqueteo?: string;
  public wo_cliente?: string;
  public po_cliente?: string;
  public fecha_requerimiento_cliente?: Date;
  public contrato_dias?: number;
  public id_viajero?: string;
  public guia_remision?: string;
  public empresa_entrega?: string;
  public fecha_recepcion?: Date;
  public pcr?: number;
  public horas?: number;
  public porcentaje_pcr?: number;
  public base_metalica_codigo?: string;
  public garantia_codigo?: string;
  public tipo_garantia_codigo?: string;
  public atencion_reparacion_codigo?: string;
  public prioridad_atencion_codigo?: string;
  public ot_status_codigo?: string;
  public recursos_status_codigo?: string;
  public taller_status_codigo?: string;
  public descripcion?: string;
  public comentarios?: string;
  public fecha_creacion!: Date;
}

OrdenTrabajo.init(
  {
    ot_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    numero_ot: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    cliente_codigo: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    estrategia_codigo: {
      type: DataTypes.STRING(2),
      allowNull: true,
    },
    registro_reparacion_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    equipo_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    componente_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cod_rep: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tipo_reparacion_codigo: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    np: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ns: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fabricante: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    flota: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    posicion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    plaqueteo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    wo_cliente: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    po_cliente: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fecha_requerimiento_cliente: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    contrato_dias: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    id_viajero: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    guia_remision: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    empresa_entrega: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fecha_recepcion: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    pcr: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    horas: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    porcentaje_pcr: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    base_metalica_codigo: {
      type: DataTypes.STRING(2),
      allowNull: true,
    },
    garantia_codigo: {
      type: DataTypes.STRING(2),
      allowNull: true,
    },
    tipo_garantia_codigo: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    atencion_reparacion_codigo: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    prioridad_atencion_codigo: {
      type: DataTypes.STRING(3),
      allowNull: true,
    },
    ot_status_codigo: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    recursos_status_codigo: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },
    taller_status_codigo: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    comentarios: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'orden_trabajo',
    timestamps: false,
  }
);

export default OrdenTrabajo;
