import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface OTRepuestoAttributes {
  id: number;
  ot_id: number;
  material_id: number;
  cantidad: number;
  proveedor_id?: number;
  precio_unitario?: number;
  fecha_entrega_esperada?: Date;
  observaciones?: string;
  estado: 'Pendiente' | 'Aprobado' | 'En PO' | 'Recibido' | 'Cancelado';
  po_id?: number;
  fecha_solicitud: Date;
  fecha_aprobacion?: Date;
  usuario_solicita: string;
  usuario_aprueba?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface OTRepuestoCreationAttributes extends Optional<OTRepuestoAttributes, 'id' | 'proveedor_id' | 'precio_unitario' | 'fecha_entrega_esperada' | 'observaciones' | 'po_id' | 'fecha_aprobacion' | 'usuario_aprueba'> {}

class OTRepuesto extends Model<OTRepuestoAttributes, OTRepuestoCreationAttributes> implements OTRepuestoAttributes {
  public id!: number;
  public ot_id!: number;
  public material_id!: number;
  public cantidad!: number;
  public proveedor_id?: number;
  public precio_unitario?: number;
  public fecha_entrega_esperada?: Date;
  public observaciones?: string;
  public estado!: 'Pendiente' | 'Aprobado' | 'En PO' | 'Recibido' | 'Cancelado';
  public po_id?: number;
  public fecha_solicitud!: Date;
  public fecha_aprobacion?: Date;
  public usuario_solicita!: string;
  public usuario_aprueba?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

OTRepuesto.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ot_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: 'orden_trabajo',
      //   key: 'ot_id'
      // },
      comment: 'ID de la Orden de Trabajo'
    },
    material_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: 'materiales',
      //   key: 'id'
      // },
      comment: 'ID del Material/Repuesto'
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      },
      comment: 'Cantidad solicitada'
    },
    proveedor_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      // references: {
      //   model: 'proveedores',
      //   key: 'id'
      // },
      comment: 'Proveedor sugerido'
    },
    precio_unitario: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
      comment: 'Precio unitario estimado'
    },
    fecha_entrega_esperada: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: 'Fecha de entrega esperada'
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    estado: {
      type: DataTypes.ENUM('Pendiente', 'Aprobado', 'En PO', 'Recibido', 'Cancelado'),
      defaultValue: 'Pendiente',
      allowNull: false,
    },
    po_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      // references: {
      //   model: 'compras',
      //   key: 'id'
      // },
      comment: 'ID de la Orden de Compra generada'
    },
    fecha_solicitud: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    fecha_aprobacion: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    usuario_solicita: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: 'Usuario que solicita el repuesto'
    },
    usuario_aprueba: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: 'Usuario que aprueba la solicitud'
    },
  },
  {
    sequelize,
    tableName: 'ot_repuestos',
    timestamps: true,
    indexes: [
      {
        fields: ['ot_id']
      },
      {
        fields: ['estado']
      },
      {
        fields: ['po_id']
      }
    ]
  }
);

export default OTRepuesto;
