import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';

interface UnidadMedidaAttributes {
  unidad_medida_id: number;
  codigo: string;
  nombre: string;
  abreviatura?: string;
  activo: boolean;
}

interface UnidadMedidaCreationAttributes extends Optional<UnidadMedidaAttributes, 'unidad_medida_id'> {}

class UnidadMedida extends Model<UnidadMedidaAttributes, UnidadMedidaCreationAttributes> implements UnidadMedidaAttributes {
  public unidad_medida_id!: number;
  public codigo!: string;
  public nombre!: string;
  public abreviatura?: string;
  public activo!: boolean;
}

UnidadMedida.init(
  {
    unidad_medida_id: {
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
    abreviatura: {
      type: DataTypes.STRING(20),
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
    tableName: 'unidad_medida',
    timestamps: false,
  }
);

export default UnidadMedida;
