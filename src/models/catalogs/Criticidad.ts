import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';

interface CriticidadAttributes {
  criticidad_id: number;
  codigo: string;
  nombre: string;
  nivel?: number;
  activo: boolean;
}

interface CriticidadCreationAttributes extends Optional<CriticidadAttributes, 'criticidad_id'> {}

class Criticidad extends Model<CriticidadAttributes, CriticidadCreationAttributes> implements CriticidadAttributes {
  public criticidad_id!: number;
  public codigo!: string;
  public nombre!: string;
  public nivel?: number;
  public activo!: boolean;
}

Criticidad.init(
  {
    criticidad_id: {
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
    nivel: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '1=Alta, 2=Media, 3=Baja',
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'criticidad',
    timestamps: false,
  }
);

export default Criticidad;
