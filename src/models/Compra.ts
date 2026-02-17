import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface CompraAttributes {
  id: number;
  numero_po: string;
  ot_id?: number; // Vinculación con OT
  proveedor_id: number;
  fecha_solicitud: Date;
  fecha_entrega_esperada?: Date;
  fecha_entrega_real?: Date;
  almacen_id: number;
  estado: 'Pendiente' | 'Aprobado' | 'En Proceso' | 'Recibido' | 'Cancelado';
  subtotal: number;
  impuesto: number;
  total: number;
  moneda: string;
  observaciones?: string;
  usuario_solicita: string;
  usuario_aprueba?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CompraCreationAttributes extends Optional<CompraAttributes, 'id' | 'ot_id' | 'fecha_entrega_esperada' | 'fecha_entrega_real' | 'observaciones' | 'usuario_aprueba'> {}

class Compra extends Model<CompraAttributes, CompraCreationAttributes> implements CompraAttributes {
  public id!: number;
  public numero_po!: string;
  public ot_id?: number;
  public proveedor_id!: number;
  public fecha_solicitud!: Date;
  public fecha_entrega_esperada?: Date;
  public fecha_entrega_real?: Date;
  public almacen_id!: number;
  public estado!: 'Pendiente' | 'Aprobado' | 'En Proceso' | 'Recibido' | 'Cancelado';
  public subtotal!: number;
  public impuesto!: number;
  public total!: number;
  public moneda!: string;
  public observaciones?: string;
  public usuario_solicita!: string;
  public usuario_aprueba?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Compra.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    numero_po: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      comment: 'Número de Purchase Order'
    },
    ot_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      // references: {
      //   model: 'orden_trabajo',
      //   key: 'ot_id'
      // },
      comment: 'ID de la Orden de Trabajo relacionada (opcional)'
    },
    proveedor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: 'proveedores',
      //   key: 'id'
      // },
    },
    fecha_solicitud: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    fecha_entrega_esperada: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fecha_entrega_real: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    almacen_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: 'almacenes',
      //   key: 'id'
      // }
    },
    estado: {
      type: DataTypes.ENUM('Pendiente', 'Aprobado', 'En Proceso', 'Recibido', 'Cancelado'),
      defaultValue: 'Pendiente',
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0,
    },
    impuesto: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0,
    },
    total: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0,
    },
    moneda: {
      type: DataTypes.STRING(3),
      allowNull: false,
      defaultValue: 'USD',
      comment: 'Código de moneda (USD, PEN, EUR, etc.)'
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    usuario_solicita: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    usuario_aprueba: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'compras',
    timestamps: true,
    indexes: [
      {
        fields: ['numero_po']
      },
      {
        fields: ['estado']
      },
      {
        fields: ['ot_id']
      }
    ]
  }
);

export default Compra;
