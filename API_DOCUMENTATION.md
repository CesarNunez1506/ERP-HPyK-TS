# 📚 Documentación API - Sistema ERP HPyK

**Base URL:** `http://localhost:3000/api`

---

## 🗂️ ESTRUCTURA DE TABLAS PRINCIPALES

### 1️⃣ MATERIALES (1_Log - Material)
**Área:** TODOS (Producción, Logística, Mantenimiento)  
**Tabla DB:** `material`  
**Endpoint Base:** `/api/materiales`

#### Endpoints:
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/materiales` | Obtener todos los materiales |
| GET | `/api/materiales/:id` | Obtener material por ID |
| POST | `/api/materiales` | Crear nuevo material |
| PUT | `/api/materiales/:id` | Actualizar material |
| DELETE | `/api/materiales/:id` | Eliminar material |

#### Campos:
- **TODOS:** material_id, codigo, descripcion, planta_codigo, area_codigo, categoria_codigo, clasificacion_codigo, unidad_medida_codigo, fabricante_codigo, np
- **PRODUCCIÓN:** punto_reposicion, stock_maximo
- **LOGÍSTICA:** plazo_entrega, precio, moneda_codigo

---

### 2️⃣ EQUIPOS Y HERRAMIENTAS (2_Mant - Equipos y Herramientas)
**Área:** LOGÍSTICA + MANTENIMIENTO  
**Tabla DB:** `equipo`  
**Endpoint Base:** `/api/equipos`

#### Endpoints:
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/equipos` | Obtener todos los equipos |
| GET | `/api/equipos/:id` | Obtener equipo por ID |
| POST | `/api/equipos` | Registrar nuevo equipo |
| PUT | `/api/equipos/:id` | Actualizar equipo |
| DELETE | `/api/equipos/:id` | Eliminar equipo |

#### Campos:
- equipo_id, codigo, descripcion, status_codigo, area_codigo, subarea_codigo
- tipo_codigo, planta_codigo, criticidad_codigo
- fecha_inicio, fecha_fabricacion, fabricante, modelo, ns, np
- capacidad, unidad_medida_codigo, observaciones

---

### 3️⃣ ESTRATEGIAS (3_Todos - Estrategias)
**Área:** TODOS (Producción, Logística, Mantenimiento)  
**Tabla DB:** `estrategia`  
**Endpoint Base:** `/api/estrategias`

#### Endpoints:
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/estrategias` | Obtener todas las estrategias |
| GET | `/api/estrategias/:id` | Obtener estrategia por ID |
| POST | `/api/estrategias` | Crear nueva estrategia |
| PUT | `/api/estrategias/:id` | Actualizar estrategia |
| DELETE | `/api/estrategias/:id` | Eliminar estrategia |

#### Campos:
- estrategia_id, usuario, area_codigo, equipo_codigo
- actividad, frecuencia, unidad_medida_codigo
- descripcion, tipo_estrategia_codigo, status_codigo

---

### 4️⃣ TASK LIST MATERIALES (4_Log_prod - Task List Materiales)
**Área:** LOGÍSTICA + PRODUCCIÓN (+ MANTENIMIENTO)  
**Tabla DB:** `tarea`  
**Endpoint Base:** `/api/tareas`

#### Endpoints:
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/tareas` | Obtener todas las tareas |
| GET | `/api/tareas/:id` | Obtener tarea por ID |
| GET | `/api/tareas/ot/:ot_id` | Obtener tareas de una OT específica |
| POST | `/api/tareas` | Crear nueva tarea |
| PUT | `/api/tareas/:id` | Actualizar tarea |
| DELETE | `/api/tareas/:id` | Eliminar tarea |

#### Campos:
- tarea_id, ot_id, usuario, actividad, item, tipo
- material_id, servicio_id, equipo_id, componente_id
- requerimiento, cantidad, precio_unitario, subtotal
- np, referencia_descripcion, observaciones

---

### 5️⃣ CÓDIGOS DE REPARACIÓN (5_Cod_Rep)
**Área:** PRODUCCIÓN (+ Logística para precio)  
**Tabla DB:** `registro_reparacion`  
**Endpoint Base:** `/api/cod-rep`

#### Endpoints:
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/cod-rep` | Obtener todos los códigos de reparación |
| GET | `/api/cod-rep/:id` | Obtener código por ID |
| POST | `/api/cod-rep` | Crear nuevo código de reparación |
| PUT | `/api/cod-rep/:id` | Actualizar código |
| DELETE | `/api/cod-rep/:id` | Eliminar código |

#### Campos:
- registro_id, usuario, codigo_reparacion, descripcion
- tipo_componente_codigo, categoria_codigo
- flota_equipo_codigo, fabricante_codigo
- np, posicion_codigo, precio, fecha_registro

---

### 6️⃣ ÓRDENES DE TRABAJO (6_OTs)
**Área:** TODOS (tabla central del ERP)  
**Tabla DB:** `orden_trabajo`  
**Endpoint Base:** `/api/ots`

#### Endpoints:
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/ots` | Obtener todas las órdenes de trabajo |
| GET | `/api/ots/:id` | Obtener OT por ID |
| POST | `/api/ots` | Crear nueva OT |
| PUT | `/api/ots/:id` | Actualizar OT |
| DELETE | `/api/ots/:id` | Eliminar OT |

#### Campos:
- **Identificación:** ot_id, numero_ot, cliente_codigo, estrategia_codigo
- **Reparación:** registro_reparacion_id, equipo_id, componente_id, cod_rep, tipo_reparacion_codigo
- **Detalles:** np, ns, fabricante, flota, posicion, plaqueteo
- **Cliente:** wo_cliente, po_cliente, fecha_requerimiento_cliente, contrato_dias
- **Logística:** id_viajero, guia_remision, empresa_entrega, fecha_recepcion
- **Métricas:** pcr, horas, porcentaje_pcr
- **Configuración:** base_metalica_codigo, garantia_codigo, tipo_garantia_codigo
- **Atención:** atencion_reparacion_codigo, prioridad_atencion_codigo
- **Estados:** ot_status_codigo, recursos_status_codigo, taller_status_codigo
- **Otros:** descripcion, comentarios, fecha_creacion

---

## 📋 CATÁLOGOS/MAESTROS

**Endpoint Base:** `/api/catalogos`

### Catálogos Comunes (TODOS)
| Recurso | GET All | GET Por Código |
|---------|---------|----------------|
| Plantas | `/api/catalogos/plantas` | `/api/catalogos/plantas/:codigo` |
| Áreas | `/api/catalogos/areas` | `/api/catalogos/areas/:codigo` |
| Sub Áreas | `/api/catalogos/subareas` | `/api/catalogos/subareas/:codigo` |
| Categorías | `/api/catalogos/categorias` | `/api/catalogos/categorias/:codigo` |
| Clasificaciones | `/api/catalogos/clasificaciones` | `/api/catalogos/clasificaciones/:codigo` |
| Unidades de Medida | `/api/catalogos/unidades-medida` | `/api/catalogos/unidades-medida/:codigo` |
| Monedas | `/api/catalogos/monedas` | `/api/catalogos/monedas/:codigo` |
| Fabricantes | `/api/catalogos/fabricantes` | `/api/catalogos/fabricantes/:codigo` |

### Catálogos de Mantenimiento
| Recurso | GET All | GET Por Código |
|---------|---------|----------------|
| Criticidades | `/api/catalogos/criticidades` | `/api/catalogos/criticidades/:codigo` |
| Tipos de Equipo | `/api/catalogos/tipos-equipo` | `/api/catalogos/tipos-equipo/:codigo` |
| Status Equipo | `/api/catalogos/status-equipo` | `/api/catalogos/status-equipo/:codigo` |

### Catálogos de Estrategias
| Recurso | GET All | GET Por Código |
|---------|---------|----------------|
| Tipos de Estrategia | `/api/catalogos/tipos-estrategia` | `/api/catalogos/tipos-estrategia/:codigo` |
| Status Estrategia | `/api/catalogos/status-estrategia` | `/api/catalogos/status-estrategia/:codigo` |
| Estrategia OT | `/api/catalogos/estrategia-ot` | `/api/catalogos/estrategia-ot/:codigo` |

### Catálogos de Producción
| Recurso | GET All | GET Por Código |
|---------|---------|----------------|
| Tipos de Componente | `/api/catalogos/tipos-componente` | `/api/catalogos/tipos-componente/:codigo` |
| Flotas de Equipo | `/api/catalogos/flotas-equipo` | `/api/catalogos/flotas-equipo/:codigo` |
| Posiciones | `/api/catalogos/posiciones` | `/api/catalogos/posiciones/:codigo` |

### Catálogos de Órdenes de Trabajo
| Recurso | GET All | GET Por Código |
|---------|---------|----------------|
| Clientes | `/api/catalogos/clientes` | `/api/catalogos/clientes/:codigo` |
| Bases Metálicas | `/api/catalogos/bases-metalicas` | `/api/catalogos/bases-metalicas/:codigo` |
| Garantías | `/api/catalogos/garantias` | `/api/catalogos/garantias/:codigo` |
| Tipos de Garantía | `/api/catalogos/tipos-garantia` | `/api/catalogos/tipos-garantia/:codigo` |
| Atención Reparación | `/api/catalogos/atencion-reparacion` | `/api/catalogos/atencion-reparacion/:codigo` |
| Tipos de Reparación | `/api/catalogos/tipos-reparacion` | `/api/catalogos/tipos-reparacion/:codigo` |
| Prioridades Atención | `/api/catalogos/prioridades-atencion` | `/api/catalogos/prioridades-atencion/:codigo` |
| OT Status | `/api/catalogos/ot-status` | `/api/catalogos/ot-status/:codigo` |
| Recursos Status | `/api/catalogos/recursos-status` | `/api/catalogos/recursos-status/:codigo` |
| Taller Status | `/api/catalogos/taller-status` | `/api/catalogos/taller-status/:codigo` |

---

## 🔧 FORMATO DE RESPUESTAS

### Éxito (200/201):
```json
{
  "campo1": "valor1",
  "campo2": "valor2",
  ...
}
```

### Error (404):
```json
{
  "error": "Recurso no encontrado"
}
```

### Error (500):
```json
{
  "error": "Descripción del error",
  "details": { ... }
}
```

---

## 📝 NOTAS IMPORTANTES

1. **CORS habilitado**: El API acepta peticiones desde cualquier origen
2. **Content-Type**: Las peticiones POST/PUT deben usar `application/json`
3. **IDs vs Códigos**: 
   - Tablas principales usan `id` numérico autoincremental
   - Catálogos usan `codigo` alfanumérico único
4. **Asociaciones**: Los endpoints retornan datos relacionados automáticamente (usando Sequelize `include`)
5. **Timestamps**: Las tablas principales NO tienen campos `createdAt`/`updatedAt` automáticos (excepto `orden_trabajo` con `fecha_creacion`)

---

## 🚀 PRÓXIMOS PASOS

1. ✅ **~~Completar controladores de catálogo faltantes~~** (COMPLETADO)
2. **Agregar endpoints especializados**:
   - `/api/ots/numero/:numeroOt` - Buscar OT por número
   - `/api/ots/cliente/:clienteCodigo` - OTs por cliente
   - `/api/ots/status/:status` - OTs por estado
   - `/api/cod-rep/codigo/:codigo` - Buscar código de reparación
3. **Agregar validaciones** con middleware
4. **Implementar paginación** para endpoints con muchos registros
5. **Agregar autenticación/autorización** por área
6. **Documentar con Swagger/OpenAPI**
