import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class TipoComponente extends Model {
  public codigo!: string;
  public descripcion!: string;
}

TipoComponente.init(
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
    tableName: 'tipo_componente',
    timestamps: false,
  }
);

export default TipoComponente;
