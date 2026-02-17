import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';

interface AreaAttributes {
  area_id: number;
  codigo: string;
  nombre: string;
  planta_codigo?: string;
  activo: boolean;
}

interface AreaCreationAttributes extends Optional<AreaAttributes, 'area_id'> {}

class Area extends Model<AreaAttributes, AreaCreationAttributes> implements AreaAttributes {
  public area_id!: number;
  public codigo!: string;
  public nombre!: string;
  public planta_codigo?: string;
  public activo!: boolean;
}

Area.init(
  {
    area_id: {
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
    planta_codigo: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'area',
    timestamps: false,
  }
);

export default Area;
