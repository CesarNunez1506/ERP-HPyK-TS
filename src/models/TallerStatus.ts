import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class TallerStatus extends Model {
  public codigo!: string;
  public descripcion!: string;
}

TallerStatus.init(
  {
    codigo: {
      type: DataTypes.STRING(25),
      primaryKey: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'taller_status',
    timestamps: false,
  }
);

export default TallerStatus;
