import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';

interface PlantaAttributes {
  planta_id: number;
  codigo: string;
  nombre: string;
  direccion?: string;
  activo: boolean;
}

interface PlantaCreationAttributes extends Optional<PlantaAttributes, 'planta_id'> {}

class Planta extends Model<PlantaAttributes, PlantaCreationAttributes> implements PlantaAttributes {
  public planta_id!: number;
  public codigo!: string;
  public nombre!: string;
  public direccion?: string;
  public activo!: boolean;
}

Planta.init(
  {
    planta_id: {
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
    direccion: {
      type: DataTypes.STRING(200),
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
    tableName: 'planta',
    timestamps: false,
  }
);

export default Planta;
