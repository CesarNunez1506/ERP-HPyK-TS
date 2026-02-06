import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Planta extends Model {
  public codigo!: string;
  public descripcion!: string;
}

Planta.init(
  {
    codigo: {
      type: DataTypes.STRING(7),
      primaryKey: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'planta',
    timestamps: false,
  }
);

export default Planta;
