import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';

interface TipoCodRepAttributes {
  tipo_cod_rep_id: number;
  codigo: string;
  nombre: string;
  activo: boolean;
}

interface TipoCodRepCreationAttributes extends Optional<TipoCodRepAttributes, 'tipo_cod_rep_id'> {}

class TipoCodRep extends Model<TipoCodRepAttributes, TipoCodRepCreationAttributes> implements TipoCodRepAttributes {
  public tipo_cod_rep_id!: number;
  public codigo!: string;
  public nombre!: string;
  public activo!: boolean;
}

TipoCodRep.init(
  {
    tipo_cod_rep_id: {
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
    tableName: 'tipo_cod_rep',
    timestamps: false,
  }
);

export default TipoCodRep;
