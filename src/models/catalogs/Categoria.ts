import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';

interface CategoriaAttributes {
  categoria_id: number;
  codigo: string;
  nombre: string;
  activo: boolean;
}

interface CategoriaCreationAttributes extends Optional<CategoriaAttributes, 'categoria_id'> {}

class Categoria extends Model<CategoriaAttributes, CategoriaCreationAttributes> implements CategoriaAttributes {
  public categoria_id!: number;
  public codigo!: string;
  public nombre!: string;
  public activo!: boolean;
}

Categoria.init(
  {
    categoria_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    codigo: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'categoria',
    timestamps: false,
  }
);

export default Categoria;
