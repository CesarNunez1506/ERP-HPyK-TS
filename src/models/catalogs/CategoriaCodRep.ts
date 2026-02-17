import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';

interface CategoriaCodRepAttributes {
  categoria_cod_rep_id: number;
  codigo: string;
  nombre: string;
  activo: boolean;
}

interface CategoriaCodRepCreationAttributes extends Optional<CategoriaCodRepAttributes, 'categoria_cod_rep_id'> {}

class CategoriaCodRep extends Model<CategoriaCodRepAttributes, CategoriaCodRepCreationAttributes> implements CategoriaCodRepAttributes {
  public categoria_cod_rep_id!: number;
  public codigo!: string;
  public nombre!: string;
  public activo!: boolean;
}

CategoriaCodRep.init(
  {
    categoria_cod_rep_id: {
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
    tableName: 'categoria_cod_rep',
    timestamps: false,
  }
);

export default CategoriaCodRep;
