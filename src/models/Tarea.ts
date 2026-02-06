import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Tarea extends Model {
  public tarea_id!: number;
  public ot_id!: number;
  public usuario!: string;
  public actividad!: string;
  public item!: number;
  public tipo!: string;
  public material_id?: number;
  public servicio_id?: number;
  public equipo_id?: number;
  public componente_id?: number;
  public requerimiento!: number;
  public cantidad!: number;
  public precio_unitario!: number;
  public subtotal!: number;
  public np?: string;
  public referencia_descripcion?: string;
  public observaciones?: string;
}

Tarea.init(
  {
    tarea_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ot_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    usuario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    actividad: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    item: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    material_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    servicio_id: {
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
    requerimiento: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    precio_unitario: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    np: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    referencia_descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'tarea',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['ot_id', 'item'],
      },
    ],
  }
);

export default Tarea;
