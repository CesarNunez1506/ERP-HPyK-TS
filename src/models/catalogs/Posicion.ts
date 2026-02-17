import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';

interface PosicionAttributes {
  posicion_id: number;
  codigo: string;
  nombre: string;
  activo: boolean;
}

interface PosicionCreationAttributes extends Optional<PosicionAttributes, 'posicion_id'> {}

class Posicion extends Model<PosicionAttributes, PosicionCreationAttributes> implements PosicionAttributes {
  public posicion_id!: number;
  public codigo!: string;
  public nombre!: string;
  public activo!: boolean;
}

Posicion.init(
  {
    posicion_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    codigo: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'posicion',
    timestamps: false,
  }
);

export default Posicion;
