import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Moneda extends Model {
  public codigo!: string;
  public descripcion!: string;
}

Moneda.init(
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
    tableName: 'moneda',
    timestamps: false,
  }
);

export default Moneda;
