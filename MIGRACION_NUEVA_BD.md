# 📋 MIGRACIÓN A NUEVA ESTRUCTURA DE BASE DE DATOS

## ⚠️ IMPORTANTE: ANTES DE EJECUTAR

Este documento explica cómo migrar de la estructura antigua a la nueva estructura basada en Excel.

## 🎯 ¿Qué se va a cambiar?

Se han creado **30 modelos nuevos** basados en las especificaciones de Excel:

### 📦 6 Tablas Principales:
1. **Material** (1_Log - Material — TODOS)
2. **Equipo** (2_Mant - Equipos — LOG + MANT)
3. **Estrategia** (3_Todos - Estrategias — TODOS)
4. **Tarea** (4_Log_prod - Task List — LOG + PROD)
5. **CodigoReparacion** (5_Cod_Rep — PRODUCCIÓN)
6. **OrdenTrabajo** (6_OTs — TODOS)

### 📚 24 Tablas Catálogo:
- **Compartidas**: Planta, Area, SubArea, UnidadMedida, Moneda, Fabricante, Categoria, Clasificacion
- **Equipos**: StatusEquipo, TipoEquipo, Criticidad
- **Estrategias**: StatusEstrategia, TipoEstrategia
- **Tareas**: TipoTarea
- **Códigos Reparación**: TipoCodRep, CategoriaCodRep, FlotaEquipo, Posicion
- **Órdenes de Trabajo**: Cliente, Garantia, AtencionReparacion, TipoReparacion, TipoGarantia, PrioridadAtencion, BaseMetalica, OtStatus, RecursosStatus, TallerStatus

---

## 🔧 PASOS PARA LA MIGRACIÓN

### PASO 1: RESPALDO DE BASE DE DATOS ACTUAL

**OPCIÓN A: Respaldo completo (Recomendado)**
```powershell
# Desde la raíz del proyecto ERP-HPyK
$env:PGPASSWORD="1234"; pg_dump -U postgres -h localhost -d erp_hpyk_main -F c -b -v -f "backup_erp_$(Get-Date -Format 'yyyyMMdd_HHmmss').backup"
```

**OPCIÓN B: Respaldo SQL simple**
```powershell
$env:PGPASSWORD="1234"; pg_dump -U postgres -h localhost -d erp_hpyk_main > "backup_erp_$(Get-Date -Format 'yyyyMMdd_HHmmss').sql"
```

### PASO 2: ACTIVAR LOS NUEVOS MODELOS

Renombrar los archivos `.new.ts` a `.ts`:

```powershell
# Desde c:\Users\Cesar\Desktop\Proyecto Monasterio\ERP-HPyK\src\models\

# 1. Renombrar modelos principales
Rename-Item "Material.new.ts" "Material.ts" -Force
Rename-Item "Equipo.new.ts" "Equipo.ts" -Force
Rename-Item "Estrategia.new.ts" "Estrategia.ts" -Force
Rename-Item "Tarea.new.ts" "Tarea.ts" -Force
Rename-Item "CodigoReparacion.new.ts" "CodigoReparacion.ts" -Force
Rename-Item "OrdenTrabajo.new.ts" "OrdenTrabajo.ts" -Force

# 2. Renombrar index
Rename-Item "index.new.ts" "index.ts" -Force

# 3. Renombrar catálogos (todos están en catalogs/)
cd catalogs
Get-ChildItem -Filter "*.new.ts" | ForEach-Object {
    $newName = $_.Name -replace ".new.ts$", ".ts"
    Rename-Item $_.Name $newName -Force
}
cd ..
```

### PASO 3: ACTUALIZAR APP.TS

El archivo `app.ts` ya está configurado correctamente. Solo necesitas cambiar **UNA LÍNEA** para recrear la base de datos:

**Busca esta línea (aprox. línea 227):**
```typescript
await sequelize.sync({ force: false });
```

**Cámbiala a:**
```typescript
await sequelize.sync({ force: true });  // ⚠️ ESTO BORRARÁ Y RECREARÁ TODAS LAS TABLAS
```

### PASO 4: EJECUTAR LA MIGRACIÓN

```powershell
# Detener el servidor si está corriendo
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force

# Esperar 2 segundos
Start-Sleep -Seconds 2

# Iniciar servidor con recreación de base de datos
cd "c:\Users\Cesar\Desktop\Proyecto Monasterio\ERP-HPyK"
node -r ts-node/register src/app.ts
```

**Observa la consola:**
- Deberías ver: `✓ Modelos sincronizados con la base de datos`
- El servidor debería iniciar sin errores

### PASO 5: RESTAURAR force: false

**⚠️ MUY IMPORTANTE:** Después de que el servidor inicie correctamente, **DETÉN EL SERVIDOR** y cambia la línea de nuevo:

```typescript
await sequelize.sync({ force: false });  // ✅ Restaurar para evitar borrar datos
```

Guarda el archivo y vuelve a iniciar el servidor:
```powershell
node -r ts-node/register src/app.ts
```

---

## 📊 PASO 6: POBLAR DATOS CATÁLOGO (SEED)

Una vez que la base de datos esté recreada, necesitas poblar las tablas catálogo con datos iniciales.

**Archivo de seeds recomendado:** `src/seeds/catalogs.seed.ts`

Ejemplos de datos iniciales necesarios:

### Monedas:
```sql
INSERT INTO moneda (codigo, nombre, simbolo, activo) VALUES
('USD', 'Dólar Estadounidense', '$', true),
('PEN', 'Sol Peruano', 'S/', true);
```

### Unidades de Medida:
```sql
INSERT INTO unidad_medida (codigo, nombre, abreviatura, activo) VALUES
('UND', 'Unidad', 'und', true),
('KG', 'Kilogramo', 'kg', true),
('MT', 'Metro', 'm', true),
('LT', 'Litro', 'L', true);
```

### Status de OT:
```sql
INSERT INTO ot_status (codigo, nombre, activo) VALUES
('ABIERTA', 'Abierta', true),
('EN_PROCESO', 'En Proceso', true),
('CERRADA', 'Cerrada', true),
('CANCELADA', 'Cancelada', true);
```

---

## 🧪 PASO 7: VERIFICAR LA MIGRACIÓN

### 1. Verificar tablas creadas:
```sql
-- Conectarse a PostgreSQL
psql -U postgres -d erp_hpyk_main

-- Listar todas las tablas
\dt

-- Deberías ver 30 tablas nuevas
```

### 2. Verificar estructura de una tabla:
```sql
\d material
```

### 3. Probar API:
```powershell
# En navegador o con curl
curl http://localhost:3000/api/materiales
```

---

## 🔄 ROLLBACK (En caso de problemas)

Si algo sale mal, puedes restaurar el respaldo:

```powershell
# Detener servidor
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force

# Restaurar respaldo (usa el nombre del archivo que creaste)
$env:PGPASSWORD="1234"; pg_restore -U postgres -h localhost -d erp_hpyk_main -c -v "backup_erp_YYYYMMDD_HHMMSS.backup"

# O si usaste SQL simple:
$env:PGPASSWORD="1234"; psql -U postgres -h localhost -d erp_hpyk_main < "backup_erp_YYYYMMDD_HHMMSS.sql"
```

---

## ✅ CHECKLIST DE MIGRACIÓN

- [ ] Respaldo de base de datos creado
- [ ] Archivos `.new.ts` renombrados a `.ts`
- [ ] `app.ts` modificado con `force: true`
- [ ] Servidor ejecutado y base de datos recreada exitosamente
- [ ] `app.ts` restaurado con `force: false`
- [ ] Datos catálogo sembrados (seeds)
- [ ] API probada y funcionando
- [ ] Vistas HTML probadas
- [ ] Controllers actualizados si es necesario

---

## 📝 NOTAS ADICIONALES

### Cambios en nombres de campos:
- **Material**: Ahora usa `codigo` (autogenerado) y `material_id` como PK
- **Equipo**: Ahora usa `codigo` (identificador) y `equipo_id` como PK
- **OrdenTrabajo**: Ahora usa `numero_ot` (autogenerado) y `ot_id` como PK

### Campos nuevos:
- **Material**: `ubicacion`, `caja` (ya existían en migration)
- **Tarea**: `np_cod1`, `np_cod2`, `id_tubo`, `od_vas` (campos Excel)
- **OrdenTrabajo**: ~30 campos según especificación Excel

### Controladores a revisar:
- `src/controllers/maestros/materialController.ts`
- `src/controllers/mantenimiento/equipoController.ts`
- `src/controllers/mantenimiento/otController.ts`

### Vistas a revisar:
- `src/vistas/logistica/materiales.html`
- `src/vistas/logistica/inventario-valorizado.html`
- `src/vistas/mantenimiento/equipos.html`
- `src/vistas/mantenimiento/ordenes-trabajo.html`

---

## 🆘 AYUDA

Si encuentras errores durante la migración:

1. **Error de foreign key**: Verifica que las tablas catálogo existan y tengan datos
2. **Error de columna no existe**: Revisa que los controladores usen los nuevos nombres de campo
3. **Error 500 en API**: Revisa los includes de Sequelize en los controladores
4. **Error en vistas**: Actualiza los nombres de campos en el JavaScript del frontend

---

**Fecha de creación**: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
**Autor**: ERP HPyK Migration Script
