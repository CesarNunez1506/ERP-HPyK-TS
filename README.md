# ERP-HPyK

Proyecto TypeScript con modelado de base de datos para sistema ERP de mantenimiento y reparaciones.

## Estructura del Proyecto

```
ERP-HPyK/
├── src/
│   ├── config/
│   │   └── database.ts      # Configuración de conexión a PostgreSQL
│   ├── models/              # Modelos Sequelize (38 tablas)
│   │   ├── index.ts         # Exportación y asociaciones de modelos
│   │   ├── Area.ts
│   │   ├── Equipo.ts
│   │   ├── Material.ts
│   │   ├── OrdenTrabajo.ts
│   │   └── ... (otros modelos)
│   └── index.ts             # Punto de entrada de la aplicación
├── .env                     # Variables de entorno
├── package.json
└── tsconfig.json
```

## Modelos Creados

### Tablas de Catálogo (23)
- Planta, Area, SubArea, Categoria, Clasificacion
- UnidadMedida, Moneda, Fabricante, Criticidad
- TipoComponente, Posicion, StatusEquipo, StatusEstrategia
- TipoEstrategia, OtStatus, RecursosStatus, TallerStatus
- PrioridadAtencion, AtencionReparacion, TipoReparacion
- Garantia, TipoGarantia, BaseMetalica, Cliente, EstrategiaOt

### Tablas Maestras (6)
- TipoEquipo, Material, Equipo, FlotaEquipo
- Componente, Servicio

### Tablas de Relaciones (1)
- EquipoFlota (Many-to-Many entre Equipo y FlotaEquipo)

### Tablas Operativas (3)
- Estrategia, RegistroReparacion, OrdenTrabajo, Tarea

## Instalación

```bash
npm install
```

## Scripts Disponibles

- `npm run dev` - Ejecuta en modo desarrollo con ts-node
- `npm run build` - Compila el proyecto TypeScript
- `npm start` - Ejecuta el proyecto compilado

## Configuración

El archivo `.env` debe contener:

```env
SECRET_KEY=aXienSoeunsO1fes

PG_USER=admin
PG_PASSWORD=admin123
PG_NAME=local
PG_HOST=localhost
PG_PORT=5432
PORT=3005

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=Admin_123
```

## Migración de Base de Datos

Al ejecutar `npm run dev`, el sistema:

1. Se conecta a la base de datos PostgreSQL
2. Configura todas las asociaciones entre modelos
3. Sincroniza los modelos con la base de datos usando `sequelize.sync({ alter: true })`
   - `alter: true` actualiza las tablas sin borrar datos existentes
   - Para recrear las tablas desde cero, cambiar a `force: true` (¡CUIDADO: borra todos los datos!)

## Relaciones Principales

- **SubArea → Area**: Cada subárea pertenece a un área
- **Equipo → Multiple**: Relaciones con StatusEquipo, Area, SubArea, TipoEquipo, Planta, Criticidad
- **Equipo ↔ FlotaEquipo**: Relación many-to-many a través de EquipoFlota
- **Componente → Equipo**: Cada componente pertenece a un equipo
- **OrdenTrabajo → Multiple**: Referencias a Cliente, Equipo, Componente, RegistroReparacion, etc.
- **Tarea → OrdenTrabajo**: Cada tarea pertenece a una orden de trabajo

## Uso

```bash
# Instalar dependencias
npm install

# Ejecutar migración y sincronización
npm run dev
```

La aplicación se conectará a la base de datos y creará/actualizará todas las tablas automáticamente.

