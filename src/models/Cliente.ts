import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Cliente extends Model {
  public codigo!: string;
  public descripcion!: string;
}

Cliente.init(
  {
    codigo: {
      type: DataTypes.STRING(10),
      primaryKey: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'cliente',
    timestamps: false,
  }
);

export default Cliente;
