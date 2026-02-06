import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class OtStatus extends Model {
  public codigo!: string;
  public descripcion!: string;
}

OtStatus.init(
  {
    codigo: {
      type: DataTypes.STRING(15),
      primaryKey: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'ot_status',
    timestamps: false,
  }
);

export default OtStatus;
