import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Garantia extends Model {
  public codigo!: string;
  public descripcion!: string;
}

Garantia.init(
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
    tableName: 'garantia',
    timestamps: false,
  }
);

export default Garantia;
