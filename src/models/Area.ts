import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Area extends Model {
  public codigo!: string;
  public descripcion!: string;
}

Area.init(
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
    tableName: 'area',
    timestamps: false,
  }
);

export default Area;
