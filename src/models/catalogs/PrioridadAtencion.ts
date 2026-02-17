import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';

interface PrioridadAtencionAttributes {
  prioridad_atencion_id: number;
  codigo: string;
  nombre: string;
  nivel?: number;
  activo: boolean;
}

interface PrioridadAtencionCreationAttributes extends Optional<PrioridadAtencionAttributes, 'prioridad_atencion_id'> {}

class PrioridadAtencion extends Model<PrioridadAtencionAttributes, PrioridadAtencionCreationAttributes> implements PrioridadAtencionAttributes {
  public prioridad_atencion_id!: number;
  public codigo!: string;
  public nombre!: string;
  public nivel?: number;
  public activo!: boolean;
}

PrioridadAtencion.init(
  {
    prioridad_atencion_id: {
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
      comment: '1=Urgente, 2=Alta, 3=Media, 4=Baja',
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'prioridad_atencion',
    timestamps: false,
  }
);

export default PrioridadAtencion;
