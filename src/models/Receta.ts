import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface RecetaAttributes {
  id: number;
  codigo: string;
  nombre: string;
  categoriaId: number;
  rendimiento: string;
  ingredientes: string;
  tiempoPreparacion: number;
  estado: 'Activo' | 'Inactivo';
  createdAt?: Date;
  updatedAt?: Date;
}

interface RecetaCreationAttributes extends Optional<RecetaAttributes, 'id'> {}

class Receta extends Model<RecetaAttributes, RecetaCreationAttributes> implements RecetaAttributes {
  public id!: number;
  public codigo!: string;
  public nombre!: string;
  public categoriaId!: number;
  public rendimiento!: string;
  public ingredientes!: string;
  public tiempoPreparacion!: number;
  public estado!: 'Activo' | 'Inactivo';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Receta.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    codigo: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    categoriaId: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    rendimiento: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    ingredientes: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: 'JSON con lista de ingredientes y cantidades',
    },
    tiempoPreparacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: 'Tiempo en minutos',
    },
    estado: {
      type: DataTypes.ENUM('Activo', 'Inactivo'),
      defaultValue: 'Activo',
    },
  },
  {
    sequelize,
    tableName: 'recetas',
    timestamps: true,
  }
);

export default Receta;
