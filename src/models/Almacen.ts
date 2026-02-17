import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface AlmacenAttributes {
  id: number;
  codigo: string;
  nombre: string;
  capacidad: number;
  ocupacion: number;
  zonas: number;
  ubicacion: string;
  estado: 'Activo' | 'Inactivo';
  createdAt?: Date;
  updatedAt?: Date;
}

interface AlmacenCreationAttributes extends Optional<AlmacenAttributes, 'id'> {}

class Almacen extends Model<AlmacenAttributes, AlmacenCreationAttributes> implements AlmacenAttributes {
  public id!: number;
  public codigo!: string;
  public nombre!: string;
  public capacidad!: number;
  public ocupacion!: number;
  public zonas!: number;
  public ubicacion!: string;
  public estado!: 'Activo' | 'Inactivo';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Almacen.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    codigo: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    capacidad: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: 'Capacidad en metros cúbicos',
    },
    ocupacion: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      comment: 'Ocupación en metros cúbicos',
    },
    zonas: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    ubicacion: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM('Activo', 'Inactivo'),
      defaultValue: 'Activo',
    },
  },
  {
    sequelize,
    tableName: 'almacenes',
    timestamps: true,
  }
);

export default Almacen;
