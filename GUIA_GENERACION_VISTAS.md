# Guía de Generación de Vistas para Catálogos - ERP Monasterio

## 📋 Resumen Ejecutivo

Este documento explica cómo generar automáticamente 27 vistas HTML para los catálogos del sistema utilizando el template genérico y la configuración predefinida.

---

## 🎯 Objetivo

Crear vistas HTML completas con CRUD para todos los catálogos del sistema (27 en total) sin duplicar código manualmente.

---

## 📊 Catálogos por Categoría

### Maestros Globales (11)
1. ✅ plantas
2. ✅ areas
3. ✅ subareas
4. ✅ categorias
5. ✅ clasificaciones
6. ✅ unidades_medida
7. ✅ monedas
8. ✅ fabricantes
9. ✅ criticidad
10. ✅ posiciones
11. ✅ clientes

### Mantenimiento (6)
12. ✅ tipo_equipo
13. ✅ tipo_componente
14. ✅ status_equipo
15. ✅ tipo_estrategia
16. ✅ status_estrategia
17. ✅ estrategia_ot

### OT (10)
18. ✅ ot_status
19. ✅ recursos_status
20. ✅ taller_status
21. ✅ tipo_garantia
22. ✅ garantias
23. ✅ tipo_reparacion
24. ✅ atencion_reparacion
25. ✅ prioridad_atencion
26. ✅ base_metalica
27. ✅ estrategia_ot

---

## 🛠️ Método 1: Generación Manual Rápida

### Pasos:

1. **Abrir el template base:**
   ```
   src/vistas/catalogos/template-catalogo.html
   ```

2. **Copiar el archivo completo**

3. **Guardar con nuevo nombre:**
   ```
   src/vistas/catalogos/[nombre-catalogo].html
   ```

4. **Modificar ÚNICAMENTE el objeto `CATALOG_CONFIG` en la línea ~115:**

   ```javascript
   const CATALOG_CONFIG = {
       name: 'plantas',                    // ← Cambiar aquí
       title: 'Plantas',                   // ← Cambiar aquí
       icon: 'fa-building',                // ← Cambiar aquí
       apiEndpoint: '/api/catalogos/plantas', // ← Cambiar aquí
       primaryKey: 'codigo',
       description: 'Gestión de plantas de producción', // ← Cambiar aquí
       fields: [
           // ← Definir campos según el catálogo
       ],
       tableColumns: ['codigo', 'nombre', 'activo'] // ← Cambiar aquí
   };
   ```

5. **Copiar la configuración desde `catalogs-config.js`:**
   - Abrir `src/vistas/catalogos/catalogs-config.js`
   - Buscar el objeto del catálogo deseado
   - Copiar toda la configuración `fields` y `tableColumns`
   - Pegar en el nuevo archivo HTML

6. **Guardar y probar**

---

## 🔧 Método 2: Script PowerShell Automático

Crea un archivo `generate-catalogs.ps1`:

```powershell
# Generador automático de vistas de catálogos

$templatePath = "src/vistas/catalogos/template-catalogo.html"
$configPath = "src/vistas/catalogos/catalogs-config.js"
$outputDir = "src/vistas/catalogos/"

# Leer el template
$template = Get-Content $templatePath -Raw

# Lista de catálogos a generar
$catalogs = @(
    'plantas', 'areas', 'subareas', 'categorias', 'clasificaciones',
    'unidades-medida', 'monedas', 'fabricantes', 'criticidad', 'posiciones', 'clientes',
    'tipo-equipo', 'tipo-componente', 'status-equipo', 'tipo-estrategia', 'status-estrategia',
    'ot-status', 'recursos-status', 'taller-status', 'tipo-garantia', 'garantias',
    'tipo-reparacion', 'atencion-reparacion', 'prioridad-atencion', 'estrategia-ot', 'base-metalica'
)

foreach ($catalog in $catalogs) {
    $filename = "$outputDir$catalog.html"
    
    # Copiar template
    Copy-Item $templatePath $filename
    
    Write-Host "✅ Creada vista para: $catalog"
}

Write-Host "`n🎉 Generación completa. Total: $($catalogs.Count) vistas creadas"
Write-Host "⚠️  IMPORTANTE: Debes editar cada archivo para personalizar el CATALOG_CONFIG"
```

**Ejecutar:**
```powershell
cd "C:\Users\Cesar\Desktop\Proyecto Monasterio\ERP-HPyK"
.\generate-catalogs.ps1
```

---

## 📝 Método 3: Script Node.js Inteligente

Crea `generate-catalogs.js`:

```javascript
const fs = require('fs');
const path = require('path');

// Importar configuraciones
const { catalogsConfig } = require('./src/vistas/catalogos/catalogs-config.js');

// Leer template
const templatePath = path.join(__dirname, 'src/vistas/catalogos/template-catalogo.html');
let template = fs.readFileSync(templatePath, 'utf8');

// Generar cada catálogo
Object.keys(catalogsConfig).forEach(catalogKey => {
    const config = catalogsConfig[catalogKey];
    
    // Reemplazar la configuración en el template
    const configString = `const CATALOG_CONFIG = ${JSON.stringify({
        name: config.name,
        title: config.title,
        icon: config.icon,
        apiEndpoint: \`/api/catalogos/\${config.name}\`,
        primaryKey: 'codigo',
        description: config.description,
        fields: config.fields,
        tableColumns: config.tableColumns
    }, null, 12)}`;
    
    const newHTML = template.replace(
        /const CATALOG_CONFIG = {[^}]+};/s,
        configString
    );
    
    // Guardar archivo
    const outputPath = path.join(__dirname, `src/vistas/catalogos/${config.name}.html`);
    fs.writeFileSync(outputPath, newHTML);
    
    console.log(`✅ Generada vista: ${config.name}.html`);
});

console.log(`\n🎉 Total generado: ${Object.keys(catalogsConfig).length} vistas`);
```

**Ejecutar:**
```bash
cd "C:\Users\Cesar\Desktop\Proyecto Monasterio\ERP-HPyK"
node generate-catalogs.js
```

---

## 🎨 Personalización de Colores por Categoría

### Maestros Globales (gray)
```javascript
color: 'gray',
navbarClass: 'from-gray-700 to-gray-900',
buttonClass: 'bg-gray-700 hover:bg-gray-800'
```

### Mantenimiento (green)
```javascript
color: 'green',
navbarClass: 'from-green-600 to-green-800',
buttonClass: 'bg-green-600 hover:bg-green-700'
```

### OT (orange)
```javascript
color: 'orange',
navbarClass: 'from-orange-600 to-orange-800',
buttonClass: 'bg-orange-600 hover:bg-orange-700'
```

---

## 📐 Estructura de Campos Comunes

### Campos Básicos (todos los catálogos simples)
```javascript
fields: [
    { name: 'codigo', label: 'Código', type: 'text', required: true, readonly: false },
    { name: 'nombre', label: 'Nombre', type: 'text', required: true },
    { name: 'descripcion', label: 'Descripción', type: 'textarea', required: false },
    { name: 'activo', label: 'Activo', type: 'checkbox', required: false, default: true }
]
```

### Campos con Relaciones (catálogos jerárquicos)
```javascript
fields: [
    { name: 'codigo', label: 'Código', type: 'text', required: true, readonly: false },
    { name: 'nombre', label: 'Nombre', type: 'text', required: true },
    { name: 'planta_codigo', label: 'Planta', type: 'text', required: false }, // ← FK
    { name: 'activo', label: 'Activo', type: 'checkbox', required: false, default: true }
]
```

### Campos con Datos Numéricos
```javascript
fields: [
    { name: 'codigo', label: 'Código', type: 'text', required: true, readonly: false },
    { name: 'nombre', label: 'Nombre', type: 'text', required: true },
    { name: 'nivel', label: 'Nivel', type: 'number', required: false }, // ← Número
    { name: 'activo', label: 'Activo', type: 'checkbox', required: false, default: true }
]
```

---

## ✅ Checklist de Verificación

Después de generar cada vista, verificar:

- [ ] El título de la página es correcto
- [ ] El endpoint API es correcto (`/api/catalogos/[nombre]`)
- [ ] Los campos del formulario coinciden con el modelo
- [ ] Las columnas de la tabla muestran datos relevantes
- [ ] El Primary Key es `codigo`
- [ ] Los botones Editar/Eliminar funcionan
- [ ] La búsqueda filtra correctamente
- [ ] El modal se abre y cierra
- [ ] Los datos se cargan desde el API
- [ ] CRUD completo funciona (Create, Read, Update, Delete)

---

## 🚀 Testing Rápido

Para probar una vista generada:

1. **Levantar el servidor:**
   ```bash
   cd ERP-HPyK
   npm run dev
   ```

2. **Abrir en navegador:**
   ```
   http://localhost:3000/catalogos/plantas.html
   ```

3. **Probar operaciones:**
   - ✅ Click en "Nuevo Registro" → Abre modal
   - ✅ Llenar formulario → Click "Guardar" → Registro creado
   - ✅ Click en "Editar" → Carga datos → Modificar → Guardar
   - ✅ Click en "Eliminar" → Confirmar → Registro eliminado
   - ✅ Buscar en campo de búsqueda → Filtra tabla

---

## 🔗 Integración con Navegación

### Actualizar dropdowns en `index.html`:

```html
<!-- Dropdown Maestros -->
<div class="relative dropdown">
    <button onclick="toggleDropdown(event, this)">
        <i class="fas fa-database mr-1"></i> Maestros
    </button>
    <div class="dropdown-menu">
        <a href="/catalogos/plantas.html">Plantas</a>
        <a href="/catalogos/areas.html">Áreas</a>
        <a href="/catalogos/subareas.html">Subáreas</a>
        <!-- ...resto de catálogos -->
    </div>
</div>
```

---

## 📦 Resumen de Archivos Generados

Después de ejecutar el generador, tendrás:

```
src/vistas/catalogos/
├── template-catalogo.html          ← Template base (NO borrar)
├── catalogs-config.js              ← Configuraciones (NO borrar)
├── plantas.html                    ← Vista generada
├── areas.html                      ← Vista generada
├── subareas.html                   ← Vista generada
├── categorias.html                 ← Vista generada
├── clasificaciones.html            ← Vista generada
├── unidades-medida.html            ← Vista generada
├── monedas.html                    ← Vista generada
├── fabricantes.html                ← Vista generada
├── criticidad.html                 ← Vista generada
├── posiciones.html                 ← Vista generada
├── clientes.html                   ← Vista generada
├── tipo-equipo.html                ← Vista generada
├── tipo-componente.html            ← Vista generada
├── status-equipo.html              ← Vista generada
├── tipo-estrategia.html            ← Vista generada
├── status-estrategia.html          ← Vista generada
├── ot-status.html                  ← Vista generada
├── recursos-status.html            ← Vista generada
├── taller-status.html              ← Vista generada
├── tipo-garantia.html              ← Vista generada
├── garantias.html                  ← Vista generada
├── tipo-reparacion.html            ← Vista generada
├── atencion-reparacion.html        ← Vista generada
├── prioridad-atencion.html         ← Vista generada
├── estrategia-ot.html              ← Vista generada
└── base-metalica.html              ← Vista generada

Total: 27 vistas + 2 archivos base = 29 archivos
```

---

## 🎯 Siguiente Paso

Una vez generadas todas las vistas de catálogos:

1. **Actualizar navegación** en `index.html` con links a todos los catálogos
2. **Probar cada catálogo** individualmente
3. **Verificar integración** con el API
4. **Ajustar estilos** si es necesario
5. **Documentar** campos específicos de cada catálogo

---

## 💡 Tips y Mejores Prácticas

1. **No editar el template directamente** → Siempre copiar y modificar
2. **Usar mismo patrón de nombres** → kebab-case para archivos HTML
3. **Mantener consistencia** en colores por categoría
4. **Probar en navegador** antes de seguir con el siguiente
5. **Documentar campos especiales** que requieran validaciones

---

## 🐛 Troubleshooting

### Problema: "Error 404 al cargar datos"
**Solución:** Verificar que el endpoint API sea correcto (`/api/catalogos/[nombre]`)

### Problema: "Modal no se abre"
**Solución:** Verificar que el JavaScript esté cargado y no haya errores en consola

### Problema: "No se pueden editar registros"
**Solución:** Verificar que `primaryKey: 'codigo'` esté configurado correctamente

### Problema: "Campos no se llenan en edición"
**Solución:** Verificar que los nombres de campos coincidan exactamente con el modelo

---

## 📞 Contacto

**Autor:** Sistema ERP Monasterio  
**Fecha:** Febrero 2026  
**Versión:** 1.0.0

---

**✅ Con esta guía puedes generar las 27 vistas de catálogos en menos de 30 minutos**
