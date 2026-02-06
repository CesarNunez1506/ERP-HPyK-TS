import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class EquipoFlota extends Model {
  public equipo_id!: number;
  public flota_codigo!: string;
}

EquipoFlota.init(
  {
    equipo_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    flota_codigo: {
      type: DataTypes.STRING(10),
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: 'equipo_flota',
    timestamps: false,
  }
);

export default EquipoFlota;
