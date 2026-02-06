import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class TipoEstrategia extends Model {
  public codigo!: string;
  public descripcion!: string;
}

TipoEstrategia.init(
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
    tableName: 'tipo_estrategia',
    timestamps: false,
  }
);

export default TipoEstrategia;
