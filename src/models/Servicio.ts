import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Servicio extends Model {
  public servicio_id!: number;
  public codigo!: string;
  public descripcion!: string;
  public tipo_servicio!: string;
  public plazo_entrega!: number;
  public costo!: number;
  public moneda_codigo!: string;
}

Servicio.init(
  {
    servicio_id: {
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
    tipo_servicio: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    plazo_entrega: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    costo: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    moneda_codigo: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'servicio',
    timestamps: false,
  }
);

export default Servicio;
