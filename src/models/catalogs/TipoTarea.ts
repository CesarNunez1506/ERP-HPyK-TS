import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';

interface TipoTareaAttributes {
  tipo_tarea_id: number;
  codigo: string;
  nombre: string;
  activo: boolean;
}

interface TipoTareaCreationAttributes extends Optional<TipoTareaAttributes, 'tipo_tarea_id'> {}

class TipoTarea extends Model<TipoTareaAttributes, TipoTareaCreationAttributes> implements TipoTareaAttributes {
  public tipo_tarea_id!: number;
  public codigo!: string;
  public nombre!: string;
  public activo!: boolean;
}

TipoTarea.init(
  {
    tipo_tarea_id: {
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
    tableName: 'tipo_tarea',
    timestamps: false,
  }
);

export default TipoTarea;
