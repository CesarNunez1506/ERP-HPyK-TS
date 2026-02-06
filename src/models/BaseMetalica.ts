import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class BaseMetalica extends Model {
  public codigo!: string;
  public descripcion!: string;
}

BaseMetalica.init(
  {
    codigo: {
      type: DataTypes.STRING(2),
      primaryKey: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'base_metalica',
    timestamps: false,
  }
);

export default BaseMetalica;
