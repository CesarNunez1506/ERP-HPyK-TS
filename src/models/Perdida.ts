import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface PerdidaAttributes {
  id: number;
  fecha: Date;
  lote: string;
  productoId: number;
  cantidad: number;
  unidad: string;
  motivo: 'Quemado' | 'Contaminación' | 'Rotura' | 'Vencimiento' | 'Otros';
  responsable: string;
  valorPerdido: number;
  observaciones?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface PerdidaCreationAttributes extends Optional<PerdidaAttributes, 'id'> {}

class Perdida extends Model<PerdidaAttributes, PerdidaCreationAttributes> implements PerdidaAttributes {
  public id!: number;
  public fecha!: Date;
  public lote!: string;
  public productoId!: number;
  public cantidad!: number;
  public unidad!: string;
  public motivo!: 'Quemado' | 'Contaminación' | 'Rotura' | 'Vencimiento' | 'Otros';
  public responsable!: string;
  public valorPerdido!: number;
  public observaciones?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Perdida.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    lote: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    productoId: {
      type: DataTypes.INTEGER,
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
    motivo: {
      type: DataTypes.ENUM('Quemado', 'Contaminación', 'Rotura', 'Vencimiento', 'Otros'),
      allowNull: false,
    },
    responsable: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    valorPerdido: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'perdidas',
    timestamps: true,
  }
);

export default Perdida;
