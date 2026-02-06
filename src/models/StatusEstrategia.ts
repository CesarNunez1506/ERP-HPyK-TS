import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class StatusEstrategia extends Model {
  public codigo!: string;
  public descripcion!: string;
}

StatusEstrategia.init(
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
    tableName: 'status_estrategia',
    timestamps: false,
  }
);

export default StatusEstrategia;
