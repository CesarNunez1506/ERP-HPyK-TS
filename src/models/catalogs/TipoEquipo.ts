import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';

interface TipoEquipoAttributes {
  tipo_equipo_id: number;
  codigo: string;
  nombre: string;
  activo: boolean;
}

interface TipoEquipoCreationAttributes extends Optional<TipoEquipoAttributes, 'tipo_equipo_id'> {}

class TipoEquipo extends Model<TipoEquipoAttributes, TipoEquipoCreationAttributes> implements TipoEquipoAttributes {
  public tipo_equipo_id!: number;
  public codigo!: string;
  public nombre!: string;
  public activo!: boolean;
}

TipoEquipo.init(
  {
    tipo_equipo_id: {
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
    tableName: 'tipo_equipo',
    timestamps: false,
  }
);

export default TipoEquipo;
