import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class UnidadMedida extends Model {
  public codigo!: string;
  public descripcion!: string;
}

UnidadMedida.init(
  {
    codigo: {
      type: DataTypes.STRING(3),
      primaryKey: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'unidad_medida',
    timestamps: false,
  }
);

export default UnidadMedida;
