import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class PrioridadAtencion extends Model {
  public codigo!: string;
  public descripcion!: string;
}

PrioridadAtencion.init(
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
    tableName: 'prioridad_atencion',
    timestamps: false,
  }
);

export default PrioridadAtencion;
