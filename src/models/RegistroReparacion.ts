import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class RegistroReparacion extends Model {
  public registro_id!: number;
  public usuario!: string;
  public codigo_reparacion?: string;
  public descripcion!: string;
  public tipo_componente_codigo?: string;
  public categoria_codigo?: string;
  public flota_equipo_codigo?: string;
  public fabricante_codigo?: string;
  public np?: string;
  public posicion_codigo?: string;
  public precio?: number;
  public fecha_registro!: Date;
}

RegistroReparacion.init(
  {
    registro_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    codigo_reparacion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tipo_componente_codigo: {
      type: DataTypes.STRING(3),
      allowNull: true,
    },
    categoria_codigo: {
      type: DataTypes.STRING(3),
      allowNull: true,
    },
    flota_equipo_codigo: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    fabricante_codigo: {
      type: DataTypes.STRING(3),
      allowNull: true,
    },
    np: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    posicion_codigo: {
      type: DataTypes.STRING(3),
      allowNull: true,
    },
    precio: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    fecha_registro: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'registro_reparacion',
    timestamps: false,
  }
);

export default RegistroReparacion;
