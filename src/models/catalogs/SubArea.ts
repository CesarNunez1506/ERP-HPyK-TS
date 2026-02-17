import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';

interface SubAreaAttributes {
  sub_area_id: number;
  codigo: string;
  nombre: string;
  area_codigo: string;
  activo: boolean;
}

interface SubAreaCreationAttributes extends Optional<SubAreaAttributes, 'sub_area_id'> {}

class SubArea extends Model<SubAreaAttributes, SubAreaCreationAttributes> implements SubAreaAttributes {
  public sub_area_id!: number;
  public codigo!: string;
  public nombre!: string;
  public area_codigo!: string;
  public activo!: boolean;
}

SubArea.init(
  {
    sub_area_id: {
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
    area_codigo: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: { model: 'area', key: 'codigo' },
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'sub_area',
    timestamps: false,
  }
);

export default SubArea;
