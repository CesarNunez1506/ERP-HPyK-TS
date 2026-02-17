import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface OrdenCompraAttributes {
  id: number;
  numeroOC: string;
  proveedorId: number;
  fecha: Date;
  items: number;
  monto: number;
  estado: 'Pendiente' | 'En Proceso' | 'Completada' | 'Cancelada';
  observaciones?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface OrdenCompraCreationAttributes extends Optional<OrdenCompraAttributes, 'id'> {}

class OrdenCompra extends Model<OrdenCompraAttributes, OrdenCompraCreationAttributes> implements OrdenCompraAttributes {
  public id!: number;
  public numeroOC!: string;
  public proveedorId!: number;
  public fecha!: Date;
  public items!: number;
  public monto!: number;
  public estado!: 'Pendiente' | 'En Proceso' | 'Completada' | 'Cancelada';
  public observaciones?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

OrdenCompra.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    numeroOC: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    proveedorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    items: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    monto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    estado: {
      type: DataTypes.ENUM('Pendiente', 'En Proceso', 'Completada', 'Cancelada'),
      defaultValue: 'Pendiente',
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'ordenes_compra',
    timestamps: true,
  }
);

export default OrdenCompra;
