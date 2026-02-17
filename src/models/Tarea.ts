import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

// 4️⃣ 4_Log_prod - Task List Materiales — LOG + PROD

interface TareaAttributes {
  tarea_id: number;
  actividad_codigo: string; // Autogenerado
  cod_rep_codigo?: string; // Enlazado a Cod Rep
  np_cod1?: string; // PROD + MANT
  np_cod2?: string; // Campo extra
  id_tubo?: string; // Campo extra
  od_vas?: string; // Campo extra
  descripcion: string;
  item_numero: number; // Número de ítem
  tipo_codigo: string;
  material_codigo?: string; // Enlazado a Material (autogenerado)
  requerimiento: number; // Cantidad requerida
  ref_descripcion?: string; // Referencia
  np?: string; // Número de parte
  texto?: string; // Solo si es servicio
  precio?: number; // LOGÍSTICA - Solo si es servicio
}

interface TareaCreationAttributes extends Optional<TareaAttributes, 'tarea_id'> {}

class Tarea extends Model<TareaAttributes, TareaCreationAttributes> implements TareaAttributes {
  public tarea_id!: number;
  public actividad_codigo!: string;
  public cod_rep_codigo?: string;
  public np_cod1?: string;
  public np_cod2?: string;
  public id_tubo?: string;
  public od_vas?: string;
  public descripcion!: string;
  public item_numero!: number;
  public tipo_codigo!: string;
  public material_codigo?: string;
  public requerimiento!: number;
  public ref_descripcion?: string;
  public np?: string;
  public texto?: string;
  public precio?: number;
}

Tarea.init(
  {
    tarea_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    actividad_codigo: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: 'Código de actividad (autogenerado por software)',
    },
    cod_rep_codigo: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: { model: 'codigo_reparacion', key: 'codigo' },
      comment: 'Enlazado a Cod Rep',
    },
    np_cod1: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: 'PROD + MANT - Número de parte código 1',
    },
    np_cod2: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: 'Campo extra - Número de parte código 2',
    },
    id_tubo: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: 'Campo extra - ID TUBO',
    },
    od_vas: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: 'Campo extra - OD VAS',
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    item_numero: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: 'Número de ítem en la lista',
    },
    tipo_codigo: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: { model: 'tipo_tarea', key: 'codigo' },
    },
    material_codigo: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: { model: 'material', key: 'codigo' },
      comment: 'Enlazado a Material (código autogenerado)',
    },
    requerimiento: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: 'Cantidad requerida',
    },
    ref_descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Referencia - descripción adicional',
    },
    np: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: 'Número de parte',
    },
    texto: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'PROD + MANT - Texto libre (solo si es servicio)',
    },
    precio: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
      comment: 'LOGÍSTICA - Precio (solo si es servicio)',
    },
  },
  {
    sequelize,
    tableName: 'tarea',
    timestamps: false,
  }
);

export default Tarea;
