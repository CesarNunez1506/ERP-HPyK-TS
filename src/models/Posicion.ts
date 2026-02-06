import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Posicion extends Model {
  public codigo!: string;
  public descripcion!: string;
}

Posicion.init(
  {
    codigo: {
      type: DataTypes.STRING(3),
      primaryKey: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'posicion',
    timestamps: false,
  }
);

export default Posicion;
