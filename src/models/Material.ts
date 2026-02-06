import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Material extends Model {
  public material_id!: number;
  public codigo!: string;
  public descripcion!: string;
  public planta_codigo!: string;
  public area_codigo!: string;
  public categoria_codigo!: string;
  public clasificacion_codigo!: string;
  public unidad_medida_codigo!: string;
  public punto_reposicion!: number;
  public stock_maximo!: number;
  public plazo_entrega!: number;
  public precio!: number;
  public moneda_codigo!: string;
  public fabricante_codigo!: string;
  public np?: string;
}

Material.init(
  {
    material_id: {
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
    planta_codigo: {
      type: DataTypes.STRING(7),
      allowNull: false,
    },
    area_codigo: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },
    categoria_codigo: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    clasificacion_codigo: {
      type: DataTypes.STRING(4),
      allowNull: false,
    },
    unidad_medida_codigo: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    punto_reposicion: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    stock_maximo: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    plazo_entrega: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    moneda_codigo: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    fabricante_codigo: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    np: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'material',
    timestamps: false,
  }
);

export default Material;
