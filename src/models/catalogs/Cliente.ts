import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';

interface ClienteAttributes {
  cliente_id: number;
  codigo: string;
  razon_social: string;
  nombre_comercial?: string;
  ruc?: string;
  direccion?: string;
  telefono?: string;
  email?: string;
  contacto_principal?: string;
  activo: boolean;
}

interface ClienteCreationAttributes extends Optional<ClienteAttributes, 'cliente_id'> {}

class Cliente extends Model<ClienteAttributes, ClienteCreationAttributes> implements ClienteAttributes {
  public cliente_id!: number;
  public codigo!: string;
  public razon_social!: string;
  public nombre_comercial?: string;
  public ruc?: string;
  public direccion?: string;
  public telefono?: string;
  public email?: string;
  public contacto_principal?: string;
  public activo!: boolean;
}

Cliente.init(
  {
    cliente_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    codigo: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
    },
    razon_social: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    nombre_comercial: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    ruc: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    direccion: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
    telefono: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    contacto_principal: {
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
    tableName: 'cliente',
    timestamps: false,
  }
);

export default Cliente;
