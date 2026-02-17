import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';

interface GarantiaAttributes {
  garantia_id: number;
  codigo: string;
  nombre: string;
  activo: boolean;
}

interface GarantiaCreationAttributes extends Optional<GarantiaAttributes, 'garantia_id'> {}

class Garantia extends Model<GarantiaAttributes, GarantiaCreationAttributes> implements GarantiaAttributes {
  public garantia_id!: number;
  public codigo!: string;
  public nombre!: string;
  public activo!: boolean;
}

Garantia.init(
  {
    garantia_id: {
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
    tableName: 'garantia',
    timestamps: false,
  }
);

export default Garantia;
