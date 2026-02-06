import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Criticidad extends Model {
  public codigo!: string;
  public descripcion!: string;
}

Criticidad.init(
  {
    codigo: {
      type: DataTypes.STRING(2),
      primaryKey: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'criticidad',
    timestamps: false,
  }
);

export default Criticidad;
