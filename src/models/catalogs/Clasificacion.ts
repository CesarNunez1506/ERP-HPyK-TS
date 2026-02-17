import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';

interface ClasificacionAttributes {
  clasificacion_id: number;
  codigo: string;
  nombre: string;
  activo: boolean;
}

interface ClasificacionCreationAttributes extends Optional<ClasificacionAttributes, 'clasificacion_id'> {}

class Clasificacion extends Model<ClasificacionAttributes, ClasificacionCreationAttributes> implements ClasificacionAttributes {
  public clasificacion_id!: number;
  public codigo!: string;
  public nombre!: string;
  public activo!: boolean;
}

Clasificacion.init(
  {
    clasificacion_id: {
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
    tableName: 'clasificacion',
    timestamps: false,
  }
);

export default Clasificacion;
