import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class TipoEquipo extends Model {
  public codigo!: string;
  public descripcion!: string;
  public categoria_codigo?: string;
}

TipoEquipo.init(
  {
    codigo: {
      type: DataTypes.STRING(3),
      primaryKey: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    categoria_codigo: {
      type: DataTypes.STRING(3),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'tipo_equipo',
    timestamps: false,
  }
);

export default TipoEquipo;
