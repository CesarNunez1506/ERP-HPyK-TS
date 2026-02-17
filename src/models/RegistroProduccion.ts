import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface RegistroProduccionAttributes {
  id: number;
  lote: string;
  fecha: Date;
  productoId: number;
  plantaId: number;
  cantidad: number;
  unidad: string;
  estado: 'En Proceso' | 'Completado';
  calidadAprobada: boolean;
  observaciones?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface RegistroProduccionCreationAttributes extends Optional<RegistroProduccionAttributes, 'id'> {}

class RegistroProduccion extends Model<RegistroProduccionAttributes, RegistroProduccionCreationAttributes> implements RegistroProduccionAttributes {
  public id!: number;
  public lote!: string;
  public fecha!: Date;
  public productoId!: number;
  public plantaId!: number;
  public cantidad!: number;
  public unidad!: string;
  public estado!: 'En Proceso' | 'Completado';
  public calidadAprobada!: boolean;
  public observaciones?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

RegistroProduccion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    lote: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    productoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    plantaId: {
      type: DataTypes.STRING(7),
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    unidad: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM('En Proceso', 'Completado'),
      defaultValue: 'En Proceso',
    },
    calidadAprobada: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'registros_produccion',
    timestamps: true,
  }
);

export default RegistroProduccion;
