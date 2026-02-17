import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';

interface BaseMetalicaAttributes {
  base_metalica_id: number;
  codigo: string;
  nombre: string;
  activo: boolean;
}

interface BaseMetalicaCreationAttributes extends Optional<BaseMetalicaAttributes, 'base_metalica_id'> {}

class BaseMetalica extends Model<BaseMetalicaAttributes, BaseMetalicaCreationAttributes> implements BaseMetalicaAttributes {
  public base_metalica_id!: number;
  public codigo!: string;
  public nombre!: string;
  public activo!: boolean;
}

BaseMetalica.init(
  {
    base_metalica_id: {
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
    tableName: 'base_metalica',
    timestamps: false,
  }
);

export default BaseMetalica;
