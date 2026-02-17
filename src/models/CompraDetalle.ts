import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface CompraDetalleAttributes {
  id: number;
  compra_id: number;
  material_id: number;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
  descuento?: number;
  impuesto?: number;
  total: number;
  observaciones?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CompraDetalleCreationAttributes extends Optional<CompraDetalleAttributes, 'id' | 'descuento' | 'impuesto' | 'observaciones'> {}

class CompraDetalle extends Model<CompraDetalleAttributes, CompraDetalleCreationAttributes> implements CompraDetalleAttributes {
  public id!: number;
  public compra_id!: number;
  public material_id!: number;
  public cantidad!: number;
  public precio_unitario!: number;
  public subtotal!: number;
  public descuento?: number;
  public impuesto?: number;
  public total!: number;
  public observaciones?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CompraDetalle.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    compra_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: 'compras',
      //   key: 'id'
      // },
      // onDelete: 'CASCADE'
    },
    material_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: 'materiales',
      //   key: 'id'
      // }
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    precio_unitario: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0,
    },
    subtotal: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0,
    },
    descuento: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
      defaultValue: 0,
    },
    impuesto: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
      defaultValue: 0,
    },
    total: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0,
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  },
  {
    sequelize,
    tableName: 'compras_detalle',
    timestamps: true,
    indexes: [
      {
        fields: ['compra_id']
      }
    ]
  }
);

export default CompraDetalle;
