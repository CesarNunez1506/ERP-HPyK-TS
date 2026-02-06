import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class TipoReparacion extends Model {
  public codigo!: string;
  public descripcion!: string;
}

TipoReparacion.init(
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
    tableName: 'tipo_reparacion',
    timestamps: false,
  }
);

export default TipoReparacion;
