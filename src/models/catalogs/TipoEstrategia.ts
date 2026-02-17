import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';

interface TipoEstrategiaAttributes {
  tipo_estrategia_id: number;
  codigo: string;
  nombre: string;
  activo: boolean;
}

interface TipoEstrategiaCreationAttributes extends Optional<TipoEstrategiaAttributes, 'tipo_estrategia_id'> {}

class TipoEstrategia extends Model<TipoEstrategiaAttributes, TipoEstrategiaCreationAttributes> implements TipoEstrategiaAttributes {
  public tipo_estrategia_id!: number;
  public codigo!: string;
  public nombre!: string;
  public activo!: boolean;
}

TipoEstrategia.init(
  {
    tipo_estrategia_id: {
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
    tableName: 'tipo_estrategia',
    timestamps: false,
  }
);

export default TipoEstrategia;
