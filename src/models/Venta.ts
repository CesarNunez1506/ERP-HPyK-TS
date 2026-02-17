import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface VentaAttributes {
  id: number;
  numeroVenta: string;
  fecha: Date;
  clienteNombre: string;
  ubicacion: string;
  metodoPago: 'Efectivo' | 'Tarjeta' | 'Transferencia' | 'Yape';
  monto: number;
  items: number;
  estado: 'Pendiente' | 'Completada' | 'Cancelada';
  createdAt?: Date;
  updatedAt?: Date;
}

interface VentaCreationAttributes extends Optional<VentaAttributes, 'id'> {}

class Venta extends Model<VentaAttributes, VentaCreationAttributes> implements VentaAttributes {
  public id!: number;
  public numeroVenta!: string;
  public fecha!: Date;
  public clienteNombre!: string;
  public ubicacion!: string;
  public metodoPago!: 'Efectivo' | 'Tarjeta' | 'Transferencia' | 'Yape';
  public monto!: number;
  public items!: number;
  public estado!: 'Pendiente' | 'Completada' | 'Cancelada';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Venta.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    numeroVenta: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    clienteNombre: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    ubicacion: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    metodoPago: {
      type: DataTypes.ENUM('Efectivo', 'Tarjeta', 'Transferencia', 'Yape'),
      allowNull: false,
    },
    monto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    items: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    estado: {
      type: DataTypes.ENUM('Pendiente', 'Completada', 'Cancelada'),
      defaultValue: 'Completada',
    },
  },
  {
    sequelize,
    tableName: 'ventas',
    timestamps: true,
  }
);

export default Venta;
