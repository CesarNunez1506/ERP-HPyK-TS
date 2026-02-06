import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Equipo extends Model {
  public equipo_id!: number;
  public codigo!: string;
  public descripcion!: string;
  public status_codigo!: string;
  public area_codigo!: string;
  public subarea_codigo!: string;
  public tipo_codigo!: string;
  public planta_codigo!: string;
  public criticidad_codigo!: string;
  public fecha_inicio!: Date;
  public fecha_fabricacion?: Date;
  public fabricante?: string;
  public modelo?: string;
  public ns?: string;
  public np?: string;
  public capacidad?: number;
  public unidad_medida_codigo?: string;
  public observaciones?: string;
}

Equipo.init(
  {
    equipo_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status_codigo: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    area_codigo: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },
    subarea_codigo: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    tipo_codigo: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    planta_codigo: {
      type: DataTypes.STRING(7),
      allowNull: false,
    },
    criticidad_codigo: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },
    fecha_inicio: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    fecha_fabricacion: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    fabricante: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    modelo: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ns: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    np: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    capacidad: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    unidad_medida_codigo: {
      type: DataTypes.STRING(3),
      allowNull: true,
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'equipo',
    timestamps: false,
  }
);

export default Equipo;
