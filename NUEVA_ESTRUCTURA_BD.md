# 🎯 NUEVA ESTRUCTURA DE BASE DE DATOS - ERP HPyK

## 📋 Descripción

Se ha recreado completamente la estructura de base de datos del ERP HPyK siguiendo las **especificaciones exactas de Excel** proporcionadas. 

**Total de modelos creados: 30**
- 6 tablas principales
- 24 tablas catálogo

---

## 🗂️ Estructura de Modelos

### 📦 6 TABLAS PRINCIPALES

#### 1️⃣ Material (`Material.new.ts`)
**Basada en:** `1_Log - Material — TODOS`  
**Campos:** 17  
**ID Principal:** `material_id`  
**Código:** `codigo` (autogenerado)

**Campos principales:**
- `codigo` (autogenerado por software)
- `descripcion`, `planta_codigo`, `area_codigo`
- `categoria_codigo`, `clasificacion_codigo`
- **PRODUCCIÓN:** `punto_reposicion`, `stock_maximo`
- **LOGÍSTICA:** `plazo_entrega`, `precio`, `moneda_codigo`
- **Inventario físico:** `ubicacion` (ejemplo: A6, B6), `caja` (ejemplo: CAJA 3)
- `fabricante_codigo`, `np` (número de parte)

**Foreign Keys (7):** planta, area, categoria, clasificacion, unidad_medida, moneda, fabricante

---

#### 2️⃣ Equipo (`Equipo.new.ts`)
**Basada en:** `2_Mant - Equipos — LOG + MANT`  
**Campos:** 17  
**ID Principal:** `equipo_id`  
**Código:** `codigo` (identificador único)

**Campos principales:**
- `codigo` (identificador), `descripcion`
- `status_codigo`, `area_codigo`, `sub_area_codigo`, `tipo_codigo`
- **Fechas:** `fecha_inicio`, `fecha_fabricacion`
- **Identificación:** `numero_serie` (N/S), `numero_parte` (N/P), `modelo`
- `fabricante_codigo`, `capacidad`, `unidad_medida_codigo`
- `observaciones`, `planta_codigo`, `criticidad_codigo`

**Foreign Keys (8):** status_equipo, area, sub_area, tipo_equipo, fabricante, unidad_medida, planta, criticidad

---

#### 3️⃣ Estrategia (`Estrategia.new.ts`)
**Basada en:** `3_Todos - Estrategias — TODOS`  
**Campos:** 10  
**ID Principal:** `estrategia_id`  
**Código:** `codigo` (autogenerado)

**Campos principales:**
- `codigo` (autogenerado)
- `area_codigo`, `equipo_codigo` (link a equipo.codigo)
- `actividad_codigo` (autogenerado)
- **Programación:** `frecuencia`, `unidad_medida_codigo`
- `descripcion`
- `tipo_estrategia_codigo`, `status_codigo`

**Foreign Keys (5):** area, equipo, unidad_medida, tipo_estrategia, status_estrategia

---

#### 4️⃣ Tarea (`Tarea.new.ts`)
**Basada en:** `4_Log_prod - Task List Materiales — LOG + PROD`  
**Campos:** 17 (incluye campos especiales de Excel)  
**ID Principal:** `tarea_id`  
**Actividad:** `actividad_codigo` (autogenerado)

**Campos principales:**
- `actividad_codigo` (autogenerado)
- `cod_rep_codigo` (FK a codigo_reparacion)
- **Campos Excel especiales:**
  - `np_cod1` (PROD + MANT)
  - `np_cod2` (extra)
  - `id_tubo` (extra)
  - `od_vas` (extra)
- `descripcion`, `item_numero`, `tipo_codigo`
- `material_codigo` (link a material.codigo)
- `requerimiento` (cantidad)
- `ref_descripcion`, `np`
- **Solo si es servicio:**
  - `texto` (descripción servicio)
  - `precio` (LOGÍSTICA)

**Foreign Keys (3):** codigo_reparacion, tipo_tarea, material

---

#### 5️⃣ CodigoReparacion (`CodigoReparacion.new.ts`)
**Basada en:** `5_Cod_Rep — PRODUCCIÓN`  
**Campos:** 10  
**ID Principal:** `cod_rep_id`  
**Código:** `codigo` (autogenerado)

**Campos principales:**
- `codigo` (autogenerado)
- **PRODUCCIÓN:**
  - `descripcion`
  - `tipo_codigo`, `categoria_codigo`, `flota_codigo`
  - `fabricante_codigo`, `np` (número de parte)
  - `posicion_codigo`
- **LOGÍSTICA:**
  - `precio`

**Foreign Keys (5):** tipo_cod_rep, categoria_cod_rep, flota_equipo, fabricante, posicion

---

#### 6️⃣ OrdenTrabajo (`OrdenTrabajo.new.ts`)
**Basada en:** `6_OTs — TODOS` (Tabla central del ERP)  
**Campos:** 35+  
**ID Principal:** `ot_id`  
**Número OT:** `numero_ot` (autogenerado)

**Campos principales:**
- `numero_ot` (autogenerado)
- **Cliente y Estrategia:**
  - `cliente_id`, `tiene_estrategia` (Si/No)
  - `estrategia_codigo`
- **Código de Reparación:**
  - `cod_rep_codigo` (manual si hay estrategia)
  - Campos que jalan automáticamente de Cod Rep:
    - `cod_rep_tipo`, `cod_rep_np`, `cod_rep_descripcion`
    - `cod_rep_fabricante`, `cod_rep_flota`, `cod_rep_posicion`
- **Equipo:**
  - `equipo_codigo`, `equipo_numero_serie` (NS)
  - `equipo_plaqueteo`
- **Información Cliente:**
  - `wo_cliente`, `po_cliente`, `id_viajero`
  - `guia_remision`, `empresa_entrega`, `fecha_recepcion`
- **PCR (vida útil):**
  - `pcr` (manual), `horas` (manual)
  - `porcentaje_pcr` (calculado: Hrs / PCR)
- **Garantías:**
  - `garantia_codigo`, `atencion_reparacion_codigo`
  - `tipo_reparacion_codigo`, `tipo_garantia_codigo`
  - `prioridad_atencion_codigo`
- **Contrato:**
  - `contrato_dias` (manual/calculado)
  - `base_metalica_codigo`, `comentarios`
  - `fecha_requerimiento_cliente`
- **Status (3 niveles):**
  - `ot_status_codigo`
  - `recursos_status_codigo`
  - `taller_status_codigo`

**Foreign Keys (13):** cliente, estrategia, codigo_reparacion, equipo, garantia, atencion_reparacion, tipo_reparacion, tipo_garantia, prioridad_atencion, base_metalica, ot_status, recursos_status, taller_status

---

### 📚 24 TABLAS CATÁLOGO

#### Catálogos Compartidos (8):
1. **Planta** - Plantas de operación
2. **Area** - Áreas funcionales (LOG, PROD, MANT, etc.)
3. **SubArea** - Sub-áreas dentro de cada área
4. **UnidadMedida** - Unidades de medida (UND, KG, MT, HR, etc.)
5. **Moneda** - Monedas (USD, PEN, EUR)
6. **Fabricante** - Fabricantes de equipos y materiales
7. **Categoria** - Categorías de materiales
8. **Clasificacion** - Clasificación ABC

#### Catálogos de Equipos (3):
9. **StatusEquipo** - Estado del equipo (Operativo, Mantenimiento, etc.)
10. **TipoEquipo** - Tipo de equipo (Turbo, Motor, etc.)
11. **Criticidad** - Nivel de criticidad (Alta, Media, Baja)

#### Catálogos de Estrategias (2):
12. **StatusEstrategia** - Estado de estrategia (Activa, Inactiva, Pausada)
13. **TipoEstrategia** - Tipo de mantenimiento (Preventivo, Predictivo, Correctivo)

#### Catálogos de Tareas (1):
14. **TipoTarea** - Tipo de tarea (Material, Servicio, Mano de Obra)

#### Catálogos de Códigos de Reparación (4):
15. **TipoCodRep** - Tipo de código de reparación
16. **CategoriaCodRep** - Categoría de código de reparación
17. **FlotaEquipo** - Flota de equipos
18. **Posicion** - Posición del componente

#### Catálogos de Órdenes de Trabajo (10):
19. **Cliente** - Clientes del sistema
20. **Garantia** - Si tiene garantía (Si/No)
21. **AtencionReparacion** - Tipo de atención (Urgente, Normal, Programado)
22. **TipoReparacion** - Tipo de reparación
23. **TipoGarantia** - Tipo de garantía
24. **PrioridadAtencion** - Prioridad (Urgente, Alta, Media, Baja)
25. **BaseMetalica** - Con/Sin base metálica
26. **OtStatus** - Estado de OT (Abierta, En Proceso, Cerrada, etc.)
27. **RecursosStatus** - Estado de recursos (Completo, Parcial, Pendiente)
28. **TallerStatus** - Estado en taller (No Ingresado, En Taller, etc.)

---

## 🔧 Archivos Creados

### Modelos Principales:
```
src/models/
├── Material.new.ts
├── Equipo.new.ts
├── Estrategia.new.ts
├── Tarea.new.ts
├── CodigoReparacion.new.ts
└── OrdenTrabajo.new.ts
```

### Modelos Catálogo:
```
src/models/catalogs/
├── Planta.new.ts
├── Area.new.ts
├── SubArea.new.ts
├── UnidadMedida.new.ts
├── Moneda.new.ts
├── Fabricante.new.ts
├── Categoria.new.ts
├── Clasificacion.new.ts
├── StatusEquipo.new.ts
├── TipoEquipo.new.ts
├── Criticidad.new.ts
├── StatusEstrategia.new.ts
├── TipoEstrategia.new.ts
├── TipoTarea.new.ts
├── TipoCodRep.new.ts
├── CategoriaCodRep.new.ts
├── FlotaEquipo.new.ts
├── Posicion.new.ts
├── Cliente.new.ts
├── Garantia.new.ts
├── AtencionReparacion.new.ts
├── TipoReparacion.new.ts
├── TipoGarantia.new.ts
├── PrioridadAtencion.new.ts
├── BaseMetalica.new.ts
├── OtStatus.new.ts
├── RecursosStatus.new.ts
└── TallerStatus.new.ts
```

### Configuración y Seeds:
```
src/models/index.new.ts          ← Configuración de asociaciones
src/seeds/catalogs.seed.ts       ← Datos iniciales para catálogos
```

### Scripts y Documentación:
```
MIGRACION_NUEVA_BD.md            ← Guía detallada de migración
migrate.ps1                      ← Script automatizado de migración
NUEVA_ESTRUCTURA_BD.md           ← Este archivo
```

---

## 🚀 Cómo Ejecutar la Migración

### Opción 1: Script Automatizado (Recomendado)

```powershell
cd "c:\Users\Cesar\Desktop\Proyecto Monasterio\ERP-HPyK"
.\migrate.ps1
```

Este script:
1. ✅ Crea respaldo de la base de datos
2. ✅ Detiene el servidor
3. ✅ Renombra archivos `.new.ts` a `.ts`
4. ✅ Configura `app.ts` con `force: true`
5. ✅ Ejecuta la migración (recrear base de datos)
6. ✅ Restaura `force: false`
7. ✅ Reinicia el servidor

### Opción 2: Manual

Ver instrucciones detalladas en: [`MIGRACION_NUEVA_BD.md`](./MIGRACION_NUEVA_BD.md)

---

## 🌱 Poblar Datos Iniciales (Seeds)

Después de la migración, ejecuta:

```powershell
cd "c:\Users\Cesar\Desktop\Proyecto Monasterio\ERP-HPyK"
node -r ts-node/register src/seeds/catalogs.seed.ts
```

Esto creará:
- 3 Monedas (USD, PEN, EUR)
- 11 Unidades de medida
- 2 Plantas (Lima, Callao)
- 5 Áreas (Logística, Producción, etc.)
- 6 Sub-áreas
- 5 Fabricantes
- Y todos los demás catálogos necesarios...

**Total de registros creados: ~100+ registros**

---

## 📊 Asociaciones Configuradas

### Material:
- `belongsTo`: Planta, Area, Categoria, Clasificacion, UnidadMedida, Moneda, Fabricante

### Equipo:
- `belongsTo`: StatusEquipo, Area, SubArea, TipoEquipo, Fabricante, UnidadMedida, Planta, Criticidad

### Estrategia:
- `belongsTo`: Area, Equipo, UnidadMedida, TipoEstrategia, StatusEstrategia

### Tarea:
- `belongsTo`: CodigoReparacion, TipoTarea, Material

### CodigoReparacion:
- `belongsTo`: TipoCodRep, CategoriaCodRep, FlotaEquipo, Fabricante, Posicion

### OrdenTrabajo:
- `belongsTo`: Cliente, Estrategia, CodigoReparacion, Equipo, Garantia, AtencionReparacion, TipoReparacion, TipoGarantia, PrioridadAtencion, BaseMetalica, OtStatus, RecursosStatus, TallerStatus

---

## ✅ Ventajas de la Nueva Estructura

1. **✅ Alineado con Excel:** Todos los campos y nombres coinciden con las hojas Excel
2. **✅ Campos Autogenerados:** `codigo`, `actividad_codigo`, `numero_ot` marcados claramente
3. **✅ Área de Responsabilidad:** Cada campo indica si pertenece a PRODUCCIÓN, LOGÍSTICA, MANT o TODOS
4. **✅ Campos Especiales:** np_cod1, np_cod2, id_tubo, od_vas preservados
5. **✅ Campos Calculados:** `porcentaje_pcr` = (horas / pcr) * 100
6. **✅ Auto-llenado:** OrdenTrabajo jala automáticamente 6 campos de CodigoReparacion
7. **✅ Inventario Físico:** Material ahora tiene `ubicacion` y `caja`
8. **✅ Triple Status:** OT tiene 3 niveles de status (OT, Recursos, Taller)

---

## 🧪 Próximos Pasos

### 1. Actualizar Controladores
Revisa estos controladores para usar los nuevos nombres de campo:
- `src/controllers/maestros/materialController.ts`
- `src/controllers/mantenimiento/equipoController.ts`
- `src/controllers/mantenimiento/otController.ts`

### 2. Actualizar Vistas
Verifica estas vistas HTML:
- `src/vistas/logistica/materiales.html`
- `src/vistas/logistica/inventario-valorizado.html`
- `src/vistas/mantenimiento/equipos.html`
- `src/vistas/mantenimiento/ordenes-trabajo.html`

### 3. Probar APIs
```bash
# Materiales
curl http://localhost:3000/api/materiales

# Equipos
curl http://localhost:3000/api/equipos

# Órdenes de Trabajo
curl http://localhost:3000/api/ordenes-trabajo
```

### 4. Crear Datos de Prueba
Crea algunos registros de prueba para verificar que todo funciona:
- 5-10 Materiales
- 3-5 Equipos
- 2-3 Estrategias
- 5-10 Códigos de Reparación
- 2-3 Órdenes de Trabajo

---

## 🔄 Rollback

Si necesitas volver a la estructura anterior:

```powershell
# Detener servidor
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force

# Restaurar respaldo (usa tu archivo específico)
$env:PGPASSWORD="1234"
pg_restore -U postgres -h localhost -d erp_hpyk_main -c -v "backups/backup_erp_YYYYMMDD_HHMMSS.backup"

# Restaurar modelos antiguos
$timestamp = "YYYYMMDD_HHMMSS"  # El timestamp del respaldo
cd "c:\Users\Cesar\Desktop\Proyecto Monasterio\ERP-HPyK\src\models"
Get-ChildItem -Path "OLD_MODELS_BACKUP_$timestamp" | 
    ForEach-Object { Copy-Item $_.FullName ".\" -Force }
```

---

## 📝 Notas Técnicas

### Esquema de Nombres:
- **Primary Keys:** `[tabla]_id` (INTEGER autoincrement)
- **Códigos:** `codigo` (STRING unique, autogenerado o manual)
- **Foreign Keys:** `[tabla]_codigo` → referencia a `[tabla].codigo`
- **Relaciones ID:** `[tabla]_id` → referencia a `[tabla].[tabla]_id`

### Tipos de Datos:
- Códigos: `STRING(10)` o `STRING(50)`
- Nombres: `STRING(100)` o `STRING(200)`
- Descripciones: `TEXT`
- Precios: `DECIMAL(12, 2)`
- Fechas: `DATE`
- Booleanos: `BOOLEAN`

### Timestamps:
- **Desactivados** en todos los modelos: `{ timestamps: false }`
- OrdenTrabajo tiene campos manuales: `usuario_crea`, `fecha_creacion`, `usuario_actualiza`, `fecha_actualizacion`

---

## 📞 Soporte

Si encuentras problemas durante la migración:

1. **Revisa los logs:** El servidor muestra información detallada
2. **Verifica foreign keys:** Asegúrate de que las tablas catálogo existan
3. **Consulta la documentación:** [`MIGRACION_NUEVA_BD.md`](./MIGRACION_NUEVA_BD.md)
4. **Restaura el respaldo:** Si algo falla, siempre puedes hacer rollback

---

**Fecha de creación:** 2024  
**Autor:** ERP HPyK Development Team  
**Versión:** 2.0 - Nueva Estructura Excel  
