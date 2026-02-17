# 🔄 Reestructuración del API - ERP HPyK

## 📌 RESUMEN DE CAMBIOS

Se ha reorganizado completamente la estructura del API para alinearla con el diseño del sistema ERP basado en las 6 tablas principales.

---

## 🗂️ NUEVA ESTRUCTURA DE ARCHIVOS

```
src/
├── routes/
│   ├── index.ts                     ← Archivo maestro de rutas
│   ├── catalogos.routes.ts          ← Rutas de catálogos/maestros
│   ├── tablas-principales/          ← Nuevas rutas por tabla principal
│   │   ├── materiales.routes.ts     → 1_Log - Material
│   │   ├── equipos.routes.ts        → 2_Mant - Equipos y Herramientas
│   │   ├── estrategias.routes.ts    → 3_Todos - Estrategias
│   │   ├── tareas.routes.ts         → 4_Log_prod - Task List Materiales
│   │   ├── codRep.routes.ts         → 5_Cod_Rep
│   │   └── ots.routes.ts            → 6_OTs
│   ├── logistica.routes.ts          (DEPRECADO - mantener por compatibilidad)
│   ├── mantenimiento.routes.ts      (DEPRECADO)
│   ├── produccion.routes.ts         (DEPRECADO)
│   └── compartido.routes.ts         (DEPRECADO)
```

---

## 🎯 MAPEO DE ENDPOINTS

### ANTES (Enfoque por módulo)
```
❌ /api/logistica/proveedores
❌ /api/logistica/almacenes
❌ /api/mantenimiento/herramientas
❌ /api/produccion/recetas
```

### AHORA (Enfoque por tabla principal)
```
✅ /api/materiales       → Tabla Material (TODOS)
✅ /api/equipos          → Tabla Equipo (LOG + MANT)
✅ /api/estrategias      → Tabla Estrategia (TODOS)
✅ /api/tareas           → Tabla Tarea (LOG + PROD)
✅ /api/cod-rep          → Tabla RegistroReparacion (PROD + LOG)
✅ /api/ots              → Tabla OrdenTrabajo (TODOS)
✅ /api/catalogos/*      → Tablas de catálogo
```

---

## 📝 ARCHIVOS MODIFICADOS

### 1. `src/app.ts`
**Cambios:**
- ❌ Eliminados imports individuales de rutas por módulo
- ❌ Eliminados imports de controladores legacy
- ✅ Agregado import único: `import apiRoutes from './routes/index'`
- ✅ Simplificado registro: `app.use('/api', apiRoutes)`

**Antes:**
```typescript
import logisticaRoutes from './routes/logistica.routes';
import mantenimientoRoutes from './routes/mantenimiento.routes';
// ... más imports

app.use('/api/logistica', logisticaRoutes);
app.use('/api/mantenimiento', mantenimientoRoutes);
// ... más rutas legacy
```

**Ahora:**
```typescript
import apiRoutes from './routes/index';

app.use('/api', apiRoutes);
```

### 2. `src/routes/index.ts` (NUEVO)
**Propósito:** Archivo maestro que centraliza todas las rutas del API

**Contenido:**
```typescript
router.use('/materiales', materialesRoutes);
router.use('/equipos', equiposRoutes);
router.use('/estrategias', estrategiasRoutes);
router.use('/tareas', tareasRoutes);
router.use('/cod-rep', codRepRoutes);
router.use('/ots', otsRoutes);
router.use('/catalogos', catalogosRoutes);
```

### 3. `src/routes/catalogos.routes.ts` (NUEVO)
**Propósito:** Centraliza TODOS los endpoints de catálogo

**Catálogos incluidos:**
- ✅ Plantas, Áreas, Sub Áreas
- ✅ Categorías, Clasificaciones
- ✅ Unidades de Medida, Monedas, Fabricantes
- ✅ Criticidades, Tipos de Equipo
- ✅ Tipos de Componente, Flotas de Equipo
- ✅ Clientes

---

## ✅ VENTAJAS DE LA NUEVA ESTRUCTURA

1. **Alineación con el diseño ERP**
   - Los endpoints reflejan las 6 tablas principales del sistema
   - Más fácil de entender para nuevos desarrolladores

2. **Separación por tabla vs. por módulo**
   - Evita duplicación de lógica entre áreas
   - Cada tabla tiene un único endpoint principal

3. **Centralización de catálogos**
   - Todos los maestros en `/api/catalogos/*`
   - Fácil de encontrar y mantener

4. **Mejor escalabilidad**
   - Agregar nuevos endpoints es más claro
   - Menos archivos de rutas duplicados

5. **Documentación más clara**
   - Ver `API_DOCUMENTATION.md` para endpoints completos

---

## 🚀 CÓMO INICIAR EL SERVIDOR

```bash
# Instalar dependencias (si aún no lo hiciste)
npm install

# Iniciar en modo desarrollo
npm run dev
```

**Mensaje esperado:**
```
✓ Conexión a la base de datos establecida
✓ Asociaciones de modelos configuradas
✓ Modelos sincronizados con la base de datos

🚀 Servidor corriendo en http://localhost:3000
📊 Dashboard disponible en http://localhost:3000
📋 API disponible en http://localhost:3000/api
```

---

## 🧪 PROBAR LOS ENDPOINTS

### Usando cURL:
```bash
# Obtener todos los materiales
curl http://localhost:3000/api/materiales

# Obtener todas las plantas
curl http://localhost:3000/api/catalogos/plantas

# Crear un nuevo equipo
curl -X POST http://localhost:3000/api/equipos \
  -H "Content-Type: application/json" \
  -d '{"codigo":"EQ001","descripcion":"Equipo de prueba",...}'
```

### Usando Postman:
1. **GET** `http://localhost:3000/api/materiales`
2. **GET** `http://localhost:3000/api/equipos`
3. **GET** `http://localhost:3000/api/ots`

---

## 📚 DOCUMENTACIÓN COMPLETA

Ver archivo: [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

**Incluye:**
- Listado completo de endpoints
- Descripción de campos por tabla
- Formatos de request/response
- Catálogos pendientes de implementar

---

## ⚠️ TAREAS PENDIENTES

### 1. ~~Controladores de Catálogo Faltantes~~ ✅ COMPLETADO

Todos los controladores de catálogo han sido implementados exitosamente:
- ✅ Base Metálica, Garantía, Tipo Garantía
- ✅ Atención Reparación, Tipo Reparación, Prioridad Atención
- ✅ OT Status, Recursos Status, Taller Status
- ✅ Status Equipo, Tipo Estrategia, Status Estrategia
- ✅ Posición, Estrategia OT

**Archivos creados (14 controladores):**
- `src/controllers/catalogo/statusEquipoController.ts`
- `src/controllers/catalogo/tipoEstrategiaController.ts`
- `src/controllers/catalogo/statusEstrategiaController.ts`
- `src/controllers/catalogo/posicionController.ts`
- `src/controllers/catalogo/estrategiaOtController.ts`
- `src/controllers/catalogo/baseMetalicaController.ts`
- `src/controllers/catalogo/garantiaController.ts`
- `src/controllers/catalogo/tipoGarantiaController.ts`
- `src/controllers/catalogo/atencionReparacionController.ts`
- `src/controllers/catalogo/tipoReparacionController.ts`
- `src/controllers/catalogo/prioridadAtencionController.ts`
- `src/controllers/catalogo/otStatusController.ts`
- `src/controllers/catalogo/recursosStatusController.ts`
- `src/controllers/catalogo/tallerStatusController.ts`

### 2. Endpoints Especializados
Agregar métodos de búsqueda específicos:
- [ ] `GET /api/ots/numero/:numeroOt` - Buscar OT por número
- [ ] `GET /api/ots/cliente/:clienteCodigo` - OTs filtradas por cliente
- [ ] `GET /api/ots/status/:status` - OTs por estado
- [ ] `GET /api/cod-rep/codigo/:codigo` - Buscar código de reparación específico
- [ ] `GET /api/materiales/planta/:planta` - Materiales por planta

### 3. Validaciones
Implementar middleware de validación para:
- [ ] Campos obligatorios en POST/PUT
- [ ] Tipos de datos correctos
- [ ] Foreign keys válidas

### 4. Paginación
Agregar soporte de paginación para endpoints con muchos registros:
```typescript
GET /api/materiales?page=1&limit=50
GET /api/ots?page=2&limit=25
```

### 5. Filtros avanzados
Query parameters para filtrado:
```typescript
GET /api/equipos?planta=PLANT01&criticidad=CR01
GET /api/materiales?categoria=CAT01&fabricante=FAB01
```

---

## 📞 CONTACTO

Si encuentras errores o tienes sugerencias, documenta:
1. Endpoint usado
2. Request enviado (headers + body)
3. Response recibido
4. Comportamiento esperado

---

**Última actualización:** 10 de febrero de 2026  
**Versión del API:** 2.0.0  
**Estado:** ✅ **FUNCIONAL COMPLETO** - Todos los catálogos implementados
