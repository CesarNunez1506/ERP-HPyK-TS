import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class StatusEquipo extends Model {
  public codigo!: string;
  public descripcion!: string;
}

StatusEquipo.init(
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
    tableName: 'status_equipo',
    timestamps: false,
  }
);

export default StatusEquipo;
