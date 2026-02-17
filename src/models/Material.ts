import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

// 1️⃣ 1_Log - Material — TODOS

interface MaterialAttributes {
  material_id: number;
  codigo: string; // Autogenerado por software
  descripcion: string;
  planta_codigo: string;
  area_codigo: string;
  categoria_codigo: string;
  clasificacion_codigo: string;
  punto_reposicion?: number; // PRODUCCIÓN
  stock_maximo?: number; // PRODUCCIÓN
  unidad_medida_codigo: string;
  plazo_entrega?: number; // LOGÍSTICA
  precio?: number; // LOGÍSTICA
  moneda_codigo?: string; // LOGÍSTICA
  fabricante_codigo?: string;
  np?: string; // Número de parte
  ubicacion?: string; // Para inventario físico
  caja?: string; // Para inventario físico
}

interface MaterialCreationAttributes extends Optional<MaterialAttributes, 'material_id'> {}

class Material extends Model<MaterialAttributes, MaterialCreationAttributes> implements MaterialAttributes {
  public material_id!: number;
  public codigo!: string;
  public descripcion!: string;
  public planta_codigo!: string;
  public area_codigo!: string;
  public categoria_codigo!: string;
  public clasificacion_codigo!: string;
  public punto_reposicion?: number;
  public stock_maximo?: number;
  public unidad_medida_codigo!: string;
  public plazo_entrega?: number;
  public precio?: number;
  public moneda_codigo?: string;
  public fabricante_codigo?: string;
public np?: string;
  public ubicacion?: string;
  public caja?: string;
}

Material.init(
  {
    material_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    codigo: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      comment: 'Código del material (autogenerado)',
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    planta_codigo: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: { model: 'planta', key: 'codigo' },
    },
    area_codigo: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: { model: 'area', key: 'codigo' },
    },
    categoria_codigo: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: { model: 'categoria', key: 'codigo' },
    },
    clasificacion_codigo: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: { model: 'clasificacion', key: 'codigo' },
    },
    punto_reposicion: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      comment: 'PRODUCCIÓN - Punto de reposición',
    },
    stock_maximo: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      comment: 'PRODUCCIÓN - Stock máximo',
    },
    unidad_medida_codigo: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: { model: 'unidad_medida', key: 'codigo' },
    },
    plazo_entrega: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'LOGÍSTICA - Plazo de entrega en días',
    },
    precio: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
      comment: 'LOGÍSTICA - Precio unitario',
    },
    moneda_codigo: {
      type: DataTypes.STRING(10),
      allowNull: true,
      references: { model: 'moneda', key: 'codigo' },
      comment: 'LOGÍSTICA - Moneda del precio',
    },
    fabricante_codigo: {
      type: DataTypes.STRING(10),
      allowNull: true,
      references: { model: 'fabricante', key: 'codigo' },
    },
    np: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: 'Número de parte del fabricante',
    },
    ubicacion: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: 'Ubicación física en almacén (ej: A6)',
    },
    caja: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: 'Identificador de caja (ej: CAJA 3)',
    },
  },
  {
    sequelize,
    tableName: 'material',
    timestamps: false,
  }
);

export default Material;
