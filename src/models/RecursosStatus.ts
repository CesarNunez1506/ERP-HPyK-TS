import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class RecursosStatus extends Model {
  public codigo!: string;
  public descripcion!: string;
}

RecursosStatus.init(
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
    tableName: 'recursos_status',
    timestamps: false,
  }
);

export default RecursosStatus;
