import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface MovimientoInventarioAttributes {
  id: number;
  fecha: Date;
  tipo: 'Entrada' | 'Salida' | 'Transferencia';
  materialId: number;
  almacenOrigenId?: number;
  almacenDestinoId?: number;
  cantidad: number;
  usuario: string;
  observaciones?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface MovimientoInventarioCreationAttributes extends Optional<MovimientoInventarioAttributes, 'id'> {}

class MovimientoInventario extends Model<MovimientoInventarioAttributes, MovimientoInventarioCreationAttributes> implements MovimientoInventarioAttributes {
  public id!: number;
  public fecha!: Date;
  public tipo!: 'Entrada' | 'Salida' | 'Transferencia';
  public materialId!: number;
  public almacenOrigenId?: number;
  public almacenDestinoId?: number;
  public cantidad!: number;
  public usuario!: string;
  public observaciones?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

MovimientoInventario.init(
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
    tipo: {
      type: DataTypes.ENUM('Entrada', 'Salida', 'Transferencia'),
      allowNull: false,
    },
    materialId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    almacenOrigenId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    almacenDestinoId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cantidad: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    usuario: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'movimientos_inventario',
    timestamps: true,
  }
);

export default MovimientoInventario;
