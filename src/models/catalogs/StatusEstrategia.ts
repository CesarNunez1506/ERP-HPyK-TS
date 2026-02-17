import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';

interface StatusEstrategiaAttributes {
  status_estrategia_id: number;
  codigo: string;
  nombre: string;
  activo: boolean;
}

interface StatusEstrategiaCreationAttributes extends Optional<StatusEstrategiaAttributes, 'status_estrategia_id'> {}

class StatusEstrategia extends Model<StatusEstrategiaAttributes, StatusEstrategiaCreationAttributes> implements StatusEstrategiaAttributes {
  public status_estrategia_id!: number;
  public codigo!: string;
  public nombre!: string;
  public activo!: boolean;
}

StatusEstrategia.init(
  {
    status_estrategia_id: {
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
    tableName: 'status_estrategia',
    timestamps: false,
  }
);

export default StatusEstrategia;
