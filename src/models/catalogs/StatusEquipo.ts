import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';

interface StatusEquipoAttributes {
  status_equipo_id: number;
  codigo: string;
  nombre: string;
  activo: boolean;
}

interface StatusEquipoCreationAttributes extends Optional<StatusEquipoAttributes, 'status_equipo_id'> {}

class StatusEquipo extends Model<StatusEquipoAttributes, StatusEquipoCreationAttributes> implements StatusEquipoAttributes {
  public status_equipo_id!: number;
  public codigo!: string;
  public nombre!: string;
  public activo!: boolean;
}

StatusEquipo.init(
  {
    status_equipo_id: {
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
    tableName: 'status_equipo',
    timestamps: false,
  }
);

export default StatusEquipo;
