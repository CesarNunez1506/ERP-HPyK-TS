import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class SubArea extends Model {
  public codigo!: string;
  public descripcion!: string;
  public area_codigo!: string;
}

SubArea.init(
  {
    codigo: {
      type: DataTypes.STRING(3),
      primaryKey: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    area_codigo: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'subarea',
    timestamps: false,
  }
);

export default SubArea;
