import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface UbicacionAttributes {
  id: number;
  codigo: string;
  nombre: string;
  direccion: string;
  telefono: string;
  tipo: 'Planta' | 'Almacén' | 'Oficina' | 'Punto de Venta';
  estado: 'Activo' | 'Inactivo';
  createdAt?: Date;
  updatedAt?: Date;
}

interface UbicacionCreationAttributes extends Optional<UbicacionAttributes, 'id'> {}

class Ubicacion extends Model<UbicacionAttributes, UbicacionCreationAttributes> implements UbicacionAttributes {
  public id!: number;
  public codigo!: string;
  public nombre!: string;
  public direccion!: string;
  public telefono!: string;
  public tipo!: 'Planta' | 'Almacén' | 'Oficina' | 'Punto de Venta';
  public estado!: 'Activo' | 'Inactivo';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Ubicacion.init(
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
    direccion: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    tipo: {
      type: DataTypes.ENUM('Planta', 'Almacén', 'Oficina', 'Punto de Venta'),
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM('Activo', 'Inactivo'),
      defaultValue: 'Activo',
    },
  },
  {
    sequelize,
    tableName: 'ubicaciones',
    timestamps: true,
  }
);

export default Ubicacion;
