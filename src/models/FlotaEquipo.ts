import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class FlotaEquipo extends Model {
  public codigo!: string;
  public descripcion!: string;
  public categoria_codigo!: string;
  public fabricante_codigo!: string;
}

FlotaEquipo.init(
  {
    codigo: {
      type: DataTypes.STRING(10),
      primaryKey: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    categoria_codigo: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    fabricante_codigo: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'flota_equipo',
    timestamps: false,
  }
);

export default FlotaEquipo;
