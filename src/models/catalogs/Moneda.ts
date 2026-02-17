import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';

interface MonedaAttributes {
  moneda_id: number;
  codigo: string;
  nombre: string;
  simbolo?: string;
  activo: boolean;
}

interface MonedaCreationAttributes extends Optional<MonedaAttributes, 'moneda_id'> {}

class Moneda extends Model<MonedaAttributes, MonedaCreationAttributes> implements MonedaAttributes {
  public moneda_id!: number;
  public codigo!: string;
  public nombre!: string;
  public simbolo?: string;
  public activo!: boolean;
}

Moneda.init(
  {
    moneda_id: {
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
    simbolo: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'moneda',
    timestamps: false,
  }
);

export default Moneda;
