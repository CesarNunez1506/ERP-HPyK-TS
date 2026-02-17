import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';

interface TipoReparacionAttributes {
  tipo_reparacion_id: number;
  codigo: string;
  nombre: string;
  activo: boolean;
}

interface TipoReparacionCreationAttributes extends Optional<TipoReparacionAttributes, 'tipo_reparacion_id'> {}

class TipoReparacion extends Model<TipoReparacionAttributes, TipoReparacionCreationAttributes> implements TipoReparacionAttributes {
  public tipo_reparacion_id!: number;
  public codigo!: string;
  public nombre!: string;
  public activo!: boolean;
}

TipoReparacion.init(
  {
    tipo_reparacion_id: {
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
    tableName: 'tipo_reparacion',
    timestamps: false,
  }
);

export default TipoReparacion;
