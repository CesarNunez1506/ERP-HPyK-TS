import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class EstrategiaOt extends Model {
  public codigo!: string;
  public descripcion!: string;
}

EstrategiaOt.init(
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
    tableName: 'estrategia_ot',
    timestamps: false,
  }
);

export default EstrategiaOt;
