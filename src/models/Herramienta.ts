import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface HerramientaAttributes {
  id: number;
  codigo: string;
  nombre: string;
  stock: number;
  asignadas: number;
  estado: 'Disponible' | 'Bajo Stock' | 'Agotado';
  createdAt?: Date;
  updatedAt?: Date;
}

interface HerramientaCreationAttributes extends Optional<HerramientaAttributes, 'id'> {}

class Herramienta extends Model<HerramientaAttributes, HerramientaCreationAttributes> implements HerramientaAttributes {
  public id!: number;
  public codigo!: string;
  public nombre!: string;
  public stock!: number;
  public asignadas!: number;
  public estado!: 'Disponible' | 'Bajo Stock' | 'Agotado';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Herramienta.init(
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
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    asignadas: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    estado: {
      type: DataTypes.ENUM('Disponible', 'Bajo Stock', 'Agotado'),
      defaultValue: 'Disponible',
    },
  },
  {
    sequelize,
    tableName: 'herramientas',
    timestamps: true,
  }
);

export default Herramienta;
