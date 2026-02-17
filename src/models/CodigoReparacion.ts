import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

// 5️⃣ 5_Cod_Rep — PRODUCCIÓN (+ Logística para precio)

interface CodigoReparacionAttributes {
  cod_rep_id: number;
  codigo: string; // Autogenerado
  descripcion: string;
  tipo_codigo: string;
  categoria_codigo: string;
  flota_codigo: string;
  fabricante_codigo?: string;
  np?: string; // Número de parte
  posicion_codigo?: string;
  precio?: number; // LOGÍSTICA
}

interface CodigoReparacionCreationAttributes extends Optional<CodigoReparacionAttributes, 'cod_rep_id'> {}

class CodigoReparacion extends Model<CodigoReparacionAttributes, CodigoReparacionCreationAttributes> implements CodigoReparacionAttributes {
  public cod_rep_id!: number;
  public codigo!: string;
  public descripcion!: string;
  public tipo_codigo!: string;
  public categoria_codigo!: string;
  public flota_codigo!: string;
  public fabricante_codigo?: string;
  public np?: string;
  public posicion_codigo?: string;
  public precio?: number;
}

CodigoReparacion.init(
  {
    cod_rep_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    codigo: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      comment: 'Código de reparación (autogenerado por software)',
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: 'PRODUCCIÓN - Descripción del código de reparación',
    },
    tipo_codigo: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: { model: 'tipo_cod_rep', key: 'codigo' },
      comment: 'PRODUCCIÓN - Tipo',
    },
    categoria_codigo: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: { model: 'categoria_cod_rep', key: 'codigo' },
      comment: 'PRODUCCIÓN - Categoría',
    },
    flota_codigo: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: { model: 'flota_equipo', key: 'codigo' },
      comment: 'PRODUCCIÓN - Flota',
    },
    fabricante_codigo: {
      type: DataTypes.STRING(10),
      allowNull: true,
      references: { model: 'fabricante', key: 'codigo' },
      comment: 'PRODUCCIÓN - Fabricante',
    },
    np: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: 'PRODUCCIÓN - Número de parte',
    },
    posicion_codigo: {
      type: DataTypes.STRING(10),
      allowNull: true,
      references: { model: 'posicion', key: 'codigo' },
      comment: 'PRODUCCIÓN - Posición',
    },
    precio: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
      comment: 'LOGÍSTICA - Precio del servicio/repuesto',
    },
  },
  {
    sequelize,
    tableName: 'codigo_reparacion',
    timestamps: false,
  }
);

export default CodigoReparacion;
