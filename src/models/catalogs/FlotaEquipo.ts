import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';

interface FlotaEquipoAttributes {
  flota_equipo_id: number;
  codigo: string;
  nombre: string;
  activo: boolean;
}

interface FlotaEquipoCreationAttributes extends Optional<FlotaEquipoAttributes, 'flota_equipo_id'> {}

class FlotaEquipo extends Model<FlotaEquipoAttributes, FlotaEquipoCreationAttributes> implements FlotaEquipoAttributes {
  public flota_equipo_id!: number;
  public codigo!: string;
  public nombre!: string;
  public activo!: boolean;
}

FlotaEquipo.init(
  {
    flota_equipo_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    codigo: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'flota_equipo',
    timestamps: false,
  }
);

export default FlotaEquipo;
