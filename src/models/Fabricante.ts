import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Fabricante extends Model {
  public codigo!: string;
  public descripcion!: string;
}

Fabricante.init(
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
    tableName: 'fabricante',
    timestamps: false,
  }
);

export default Fabricante;
