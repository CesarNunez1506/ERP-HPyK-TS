import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Estrategia extends Model {
  public estrategia_id!: number;
  public usuario!: string;
  public area_codigo!: string;
  public equipo_codigo!: string;
  public actividad!: string;
  public frecuencia!: number;
  public unidad_medida_codigo!: string;
  public descripcion!: string;
  public tipo_estrategia_codigo!: string;
  public status_codigo!: string;
}

Estrategia.init(
  {
    estrategia_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    area_codigo: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },
    equipo_codigo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    actividad: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    frecuencia: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    unidad_medida_codigo: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tipo_estrategia_codigo: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },
    status_codigo: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'estrategia',
    timestamps: false,
  }
);

export default Estrategia;
