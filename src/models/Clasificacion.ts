import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Clasificacion extends Model {
  public codigo!: string;
  public descripcion!: string;
}

Clasificacion.init(
  {
    codigo: {
      type: DataTypes.STRING(4),
      primaryKey: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'clasificacion',
    timestamps: false,
  }
);

export default Clasificacion;
