import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class TipoGarantia extends Model {
  public codigo!: string;
  public descripcion!: string;
}

TipoGarantia.init(
  {
    codigo: {
      type: DataTypes.STRING(15),
      primaryKey: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'tipo_garantia',
    timestamps: false,
  }
);

export default TipoGarantia;
