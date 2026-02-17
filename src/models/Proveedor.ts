import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface ProveedorAttributes {
  id: number;
  ruc: string;
  razonSocial: string;
  contacto: string;
  telefono: string;
  email: string;
  direccion?: string;
  estado: 'Activo' | 'Inactivo';
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProveedorCreationAttributes extends Optional<ProveedorAttributes, 'id'> {}

class Proveedor extends Model<ProveedorAttributes, ProveedorCreationAttributes> implements ProveedorAttributes {
  public id!: number;
  public ruc!: string;
  public razonSocial!: string;
  public contacto!: string;
  public telefono!: string;
  public email!: string;
  public direccion?: string;
  public estado!: 'Activo' | 'Inactivo';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Proveedor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ruc: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: true,
    },
    razonSocial: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    contacto: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    direccion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    estado: {
      type: DataTypes.ENUM('Activo', 'Inactivo'),
      defaultValue: 'Activo',
    },
  },
  {
    sequelize,
    tableName: 'proveedores',
    timestamps: true,
  }
);

export default Proveedor;
