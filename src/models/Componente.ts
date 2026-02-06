import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Componente extends Model {
  public componente_id!: number;
  public codigo!: string;
  public descripcion!: string;
  public equipo_id!: number;
  public tipo_componente_codigo?: string;
  public criticidad_codigo?: string;
  public tiempo_reposicion!: number;
  public unidad_medida_codigo!: string;
  public observaciones?: string;
}

Componente.init(
  {
    componente_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    equipo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipo_componente_codigo: {
      type: DataTypes.STRING(3),
      allowNull: true,
    },
    criticidad_codigo: {
      type: DataTypes.STRING(2),
      allowNull: true,
    },
    tiempo_reposicion: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    unidad_medida_codigo: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'componente',
    timestamps: false,
  }
);

export default Componente;
