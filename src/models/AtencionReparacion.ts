import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class AtencionReparacion extends Model {
  public codigo!: string;
  public descripcion!: string;
}

AtencionReparacion.init(
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
    tableName: 'atencion_reparacion',
    timestamps: false,
  }
);

export default AtencionReparacion;
