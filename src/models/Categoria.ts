import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Categoria extends Model {
  public codigo!: string;
  public descripcion!: string;
  public observacion?: string;
}

Categoria.init(
  {
    codigo: {
      type: DataTypes.STRING(3),
      primaryKey: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    observacion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'categoria',
    timestamps: false,
  }
);

export default Categoria;
