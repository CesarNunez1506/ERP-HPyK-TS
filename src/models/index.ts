// Importar modelos en orden de dependencias
import Planta from './Planta';
import Area from './Area';
import SubArea from './SubArea';
import Categoria from './Categoria';
import Clasificacion from './Clasificacion';
import UnidadMedida from './UnidadMedida';
import Moneda from './Moneda';
import Fabricante from './Fabricante';
import Criticidad from './Criticidad';
import TipoComponente from './TipoComponente';
import Posicion from './Posicion';
import StatusEquipo from './StatusEquipo';
import StatusEstrategia from './StatusEstrategia';
import TipoEstrategia from './TipoEstrategia';
import OtStatus from './OtStatus';
import RecursosStatus from './RecursosStatus';
import TallerStatus from './TallerStatus';
import PrioridadAtencion from './PrioridadAtencion';
import AtencionReparacion from './AtencionReparacion';
import TipoReparacion from './TipoReparacion';
import Garantia from './Garantia';
import TipoGarantia from './TipoGarantia';
import BaseMetalica from './BaseMetalica';
import Cliente from './Cliente';
import EstrategiaOt from './EstrategiaOt';
import TipoEquipo from './TipoEquipo';
import Material from './Material';
import Equipo from './Equipo';
import FlotaEquipo from './FlotaEquipo';
import EquipoFlota from './EquipoFlota';
import Componente from './Componente';
import Servicio from './Servicio';
import Estrategia from './Estrategia';
import RegistroReparacion from './RegistroReparacion';
import OrdenTrabajo from './OrdenTrabajo';
import Tarea from './Tarea';

// Definir relaciones entre modelos
export const setupAssociations = () => {
  // SubArea - Area
  SubArea.belongsTo(Area, { foreignKey: 'area_codigo', targetKey: 'codigo' });
  Area.hasMany(SubArea, { foreignKey: 'area_codigo', sourceKey: 'codigo' });

  // TipoEquipo - Categoria
  TipoEquipo.belongsTo(Categoria, { foreignKey: 'categoria_codigo', targetKey: 'codigo' });
  Categoria.hasMany(TipoEquipo, { foreignKey: 'categoria_codigo', sourceKey: 'codigo' });

  // Material - Referencias
  Material.belongsTo(Planta, { foreignKey: 'planta_codigo', targetKey: 'codigo' });
  Material.belongsTo(Area, { foreignKey: 'area_codigo', targetKey: 'codigo' });
  Material.belongsTo(Categoria, { foreignKey: 'categoria_codigo', targetKey: 'codigo' });
  Material.belongsTo(Clasificacion, { foreignKey: 'clasificacion_codigo', targetKey: 'codigo' });
  Material.belongsTo(UnidadMedida, { foreignKey: 'unidad_medida_codigo', targetKey: 'codigo' });
  Material.belongsTo(Moneda, { foreignKey: 'moneda_codigo', targetKey: 'codigo' });
  Material.belongsTo(Fabricante, { foreignKey: 'fabricante_codigo', targetKey: 'codigo' });

  // Equipo - Referencias
  Equipo.belongsTo(StatusEquipo, { foreignKey: 'status_codigo', targetKey: 'codigo' });
  Equipo.belongsTo(Area, { foreignKey: 'area_codigo', targetKey: 'codigo' });
  Equipo.belongsTo(SubArea, { foreignKey: 'subarea_codigo', targetKey: 'codigo' });
  Equipo.belongsTo(TipoEquipo, { foreignKey: 'tipo_codigo', targetKey: 'codigo' });
  Equipo.belongsTo(Planta, { foreignKey: 'planta_codigo', targetKey: 'codigo' });
  Equipo.belongsTo(Criticidad, { foreignKey: 'criticidad_codigo', targetKey: 'codigo' });
  Equipo.belongsTo(UnidadMedida, { foreignKey: 'unidad_medida_codigo', targetKey: 'codigo' });

  // FlotaEquipo - Referencias
  FlotaEquipo.belongsTo(Categoria, { foreignKey: 'categoria_codigo', targetKey: 'codigo' });
  FlotaEquipo.belongsTo(Fabricante, { foreignKey: 'fabricante_codigo', targetKey: 'codigo' });

  // EquipoFlota - Relación muchos a muchos
  EquipoFlota.belongsTo(Equipo, { foreignKey: 'equipo_id', targetKey: 'equipo_id' });
  EquipoFlota.belongsTo(FlotaEquipo, { foreignKey: 'flota_codigo', targetKey: 'codigo' });
  Equipo.belongsToMany(FlotaEquipo, { through: EquipoFlota, foreignKey: 'equipo_id' });
  FlotaEquipo.belongsToMany(Equipo, { through: EquipoFlota, foreignKey: 'flota_codigo' });

  // Componente - Referencias
  Componente.belongsTo(Equipo, { foreignKey: 'equipo_id', targetKey: 'equipo_id' });
  Componente.belongsTo(TipoComponente, { foreignKey: 'tipo_componente_codigo', targetKey: 'codigo' });
  Componente.belongsTo(Criticidad, { foreignKey: 'criticidad_codigo', targetKey: 'codigo' });
  Componente.belongsTo(UnidadMedida, { foreignKey: 'unidad_medida_codigo', targetKey: 'codigo' });
  Equipo.hasMany(Componente, { foreignKey: 'equipo_id', sourceKey: 'equipo_id' });

  // Servicio - Referencias
  Servicio.belongsTo(Moneda, { foreignKey: 'moneda_codigo', targetKey: 'codigo' });

  // Estrategia - Referencias
  Estrategia.belongsTo(Area, { foreignKey: 'area_codigo', targetKey: 'codigo' });
  Estrategia.belongsTo(Equipo, { foreignKey: 'equipo_codigo', targetKey: 'codigo' });
  Estrategia.belongsTo(UnidadMedida, { foreignKey: 'unidad_medida_codigo', targetKey: 'codigo' });
  Estrategia.belongsTo(TipoEstrategia, { foreignKey: 'tipo_estrategia_codigo', targetKey: 'codigo' });
  Estrategia.belongsTo(StatusEstrategia, { foreignKey: 'status_codigo', targetKey: 'codigo' });

  // RegistroReparacion - Referencias
  RegistroReparacion.belongsTo(TipoComponente, { foreignKey: 'tipo_componente_codigo', targetKey: 'codigo' });
  RegistroReparacion.belongsTo(Categoria, { foreignKey: 'categoria_codigo', targetKey: 'codigo' });
  RegistroReparacion.belongsTo(FlotaEquipo, { foreignKey: 'flota_equipo_codigo', targetKey: 'codigo' });
  RegistroReparacion.belongsTo(Fabricante, { foreignKey: 'fabricante_codigo', targetKey: 'codigo' });
  RegistroReparacion.belongsTo(Posicion, { foreignKey: 'posicion_codigo', targetKey: 'codigo' });

  // OrdenTrabajo - Referencias
  OrdenTrabajo.belongsTo(Cliente, { foreignKey: 'cliente_codigo', targetKey: 'codigo' });
  OrdenTrabajo.belongsTo(EstrategiaOt, { foreignKey: 'estrategia_codigo', targetKey: 'codigo' });
  OrdenTrabajo.belongsTo(RegistroReparacion, { foreignKey: 'registro_reparacion_id', targetKey: 'registro_id' });
  OrdenTrabajo.belongsTo(Equipo, { foreignKey: 'equipo_id', targetKey: 'equipo_id' });
  OrdenTrabajo.belongsTo(Componente, { foreignKey: 'componente_id', targetKey: 'componente_id' });
  OrdenTrabajo.belongsTo(TipoReparacion, { foreignKey: 'tipo_reparacion_codigo', targetKey: 'codigo' });
  OrdenTrabajo.belongsTo(BaseMetalica, { foreignKey: 'base_metalica_codigo', targetKey: 'codigo' });
  OrdenTrabajo.belongsTo(Garantia, { foreignKey: 'garantia_codigo', targetKey: 'codigo' });
  OrdenTrabajo.belongsTo(TipoGarantia, { foreignKey: 'tipo_garantia_codigo', targetKey: 'codigo' });
  OrdenTrabajo.belongsTo(AtencionReparacion, { foreignKey: 'atencion_reparacion_codigo', targetKey: 'codigo' });
  OrdenTrabajo.belongsTo(PrioridadAtencion, { foreignKey: 'prioridad_atencion_codigo', targetKey: 'codigo' });
  OrdenTrabajo.belongsTo(OtStatus, { foreignKey: 'ot_status_codigo', targetKey: 'codigo' });
  OrdenTrabajo.belongsTo(RecursosStatus, { foreignKey: 'recursos_status_codigo', targetKey: 'codigo' });
  OrdenTrabajo.belongsTo(TallerStatus, { foreignKey: 'taller_status_codigo', targetKey: 'codigo' });

  // Tarea - Referencias
  Tarea.belongsTo(OrdenTrabajo, { foreignKey: 'ot_id', targetKey: 'ot_id' });
  Tarea.belongsTo(Material, { foreignKey: 'material_id', targetKey: 'material_id' });
  Tarea.belongsTo(Servicio, { foreignKey: 'servicio_id', targetKey: 'servicio_id' });
  Tarea.belongsTo(Equipo, { foreignKey: 'equipo_id', targetKey: 'equipo_id' });
  Tarea.belongsTo(Componente, { foreignKey: 'componente_id', targetKey: 'componente_id' });
  OrdenTrabajo.hasMany(Tarea, { foreignKey: 'ot_id', sourceKey: 'ot_id' });
};

// Exportar todos los modelos
export {
  Planta,
  Area,
  SubArea,
  Categoria,
  Clasificacion,
  UnidadMedida,
  Moneda,
  Fabricante,
  Criticidad,
  TipoComponente,
  Posicion,
  StatusEquipo,
  StatusEstrategia,
  TipoEstrategia,
  OtStatus,
  RecursosStatus,
  TallerStatus,
  PrioridadAtencion,
  AtencionReparacion,
  TipoReparacion,
  Garantia,
  TipoGarantia,
  BaseMetalica,
  Cliente,
  EstrategiaOt,
  TipoEquipo,
  Material,
  Equipo,
  FlotaEquipo,
  EquipoFlota,
  Componente,
  Servicio,
  Estrategia,
  RegistroReparacion,
  OrdenTrabajo,
  Tarea,
};
