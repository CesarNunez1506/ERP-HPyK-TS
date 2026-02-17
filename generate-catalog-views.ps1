# ====================================================================
# Generador Automático de Vistas de Catálogos - ERP Monasterio
# ====================================================================
# Este script genera 27 vistas HTML para catálogos usando el template
# y la configuración predefinida
# ====================================================================

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "   Generador de Vistas de Catálogos" -ForegroundColor Cyan
Write-Host "   ERP Monasterio v3.0" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Rutas
$projectRoot = "C:\Users\Cesar\Desktop\Proyecto Monasterio\ERP-HPyK"
$templatePath = Join-Path $projectRoot "src\vistas\catalogos\template-catalogo.html"
$outputDir = Join-Path $projectRoot "src\vistas\catalogos"

# Verificar que existe el template
if (-not (Test-Path $templatePath)) {
    Write-Host "❌ ERROR: No se encontró el template en: $templatePath" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Template encontrado" -ForegroundColor Green
Write-Host "📂 Directorio de salida: $outputDir" -ForegroundColor Gray
Write-Host ""

# Leer el template
$template = Get-Content $templatePath -Raw -Encoding UTF8

# Definición de catálogos a generar
$catalogs = @(
    # Maestros Globales (11)
    @{ name = "plantas"; title = "Plantas"; icon = "fa-building"; color = "gray"; desc = "Gestión de plantas de producción" },
    @{ name = "areas"; title = "Áreas"; icon = "fa-map-marked-alt"; color = "gray"; desc = "Gestión de áreas de trabajo" },
    @{ name = "subareas"; title = "Subáreas"; icon = "fa-layer-group"; color = "gray"; desc = "Gestión de subáreas de trabajo" },
    @{ name = "categorias"; title = "Categorías"; icon = "fa-folder"; color = "gray"; desc = "Gestión de categorías de clasificación" },
    @{ name = "clasificaciones"; title = "Clasificaciones"; icon = "fa-sitemap"; color = "gray"; desc = "Gestión de clasificaciones del sistema" },
    @{ name = "unidades-medida"; title = "Unidades de Medida"; icon = "fa-ruler"; color = "gray"; desc = "Gestión de unidades de medida" },
    @{ name = "monedas"; title = "Monedas"; icon = "fa-dollar-sign"; color = "gray"; desc = "Gestión de monedas y tipos de cambio" },
    @{ name = "fabricantes"; title = "Fabricantes"; icon = "fa-industry"; color = "gray"; desc = "Gestión de fabricantes y proveedores" },
    @{ name = "criticidad"; title = "Criticidad"; icon = "fa-exclamation-circle"; color = "gray"; desc = "Gestión de niveles de criticidad" },
    @{ name = "posiciones"; title = "Posiciones"; icon = "fa-location-dot"; color = "gray"; desc = "Gestión de posiciones de equipos" },
    @{ name = "clientes"; title = "Clientes"; icon = "fa-users"; color = "gray"; desc = "Gestión de clientes" },
    
    # Mantenimiento (6)
    @{ name = "tipo-equipo"; title = "Tipos de Equipo"; icon = "fa-tag"; color = "green"; desc = "Gestión de tipos de equipo" },
    @{ name = "tipo-componente"; title = "Tipos de Componente"; icon = "fa-tag"; color = "green"; desc = "Gestión de tipos de componente" },
    @{ name = "status-equipo"; title = "Status de Equipo"; icon = "fa-traffic-light"; color = "green"; desc = "Gestión de estados de equipos" },
    @{ name = "tipo-estrategia"; title = "Tipos de Estrategia"; icon = "fa-tag"; color = "green"; desc = "Gestión de tipos de estrategia" },
    @{ name = "status-estrategia"; title = "Status de Estrategia"; icon = "fa-traffic-light"; color = "green"; desc = "Gestión de estados de estrategias" },
    @{ name = "estrategia-ot"; title = "Estrategias OT"; icon = "fa-lightbulb"; color = "green"; desc = "Gestión de estrategias para órdenes de trabajo" },
    
    # OT (10)
    @{ name = "ot-status"; title = "Status de OT"; icon = "fa-traffic-light"; color = "orange"; desc = "Gestión de estados de órdenes de trabajo" },
    @{ name = "recursos-status"; title = "Status de Recursos"; icon = "fa-traffic-light"; color = "orange"; desc = "Gestión de estados de recursos" },
    @{ name = "taller-status"; title = "Status de Taller"; icon = "fa-traffic-light"; color = "orange"; desc = "Gestión de estados del taller" },
    @{ name = "tipo-garantia"; title = "Tipos de Garantía"; icon = "fa-shield-alt"; color = "orange"; desc = "Gestión de tipos de garantía" },
    @{ name = "garantias"; title = "Garantías"; icon = "fa-certificate"; color = "orange"; desc = "Gestión de garantías" },
    @{ name = "tipo-reparacion"; title = "Tipos de Reparación"; icon = "fa-wrench"; color = "orange"; desc = "Gestión de tipos de reparación" },
    @{ name = "atencion-reparacion"; title = "Atención a Reparación"; icon = "fa-bell"; color = "orange"; desc = "Gestión de tipos de atención a reparaciones" },
    @{ name = "prioridad-atencion"; title = "Prioridad de Atención"; icon = "fa-flag"; color = "orange"; desc = "Gestión de prioridades de atención" },
    @{ name = "estrategia-ot"; title = "Estrategias OT"; icon = "fa-lightbulb"; color = "orange"; desc = "Gestión de estrategias OT" },
    @{ name = "base-metalica"; title = "Bases Metálicas"; icon = "fa-cube"; color = "orange"; desc = "Gestión de bases metálicas" }
)

# Mapeo de colores a clases CSS
$colorClasses = @{
    gray = @{
        gradient = "from-gray-700 to-gray-900"
        bg = "bg-gray-700"
        hover = "hover:bg-gray-800"
        ring = "focus:ring-gray-500"
    }
    green = @{
        gradient = "from-green-600 to-green-800"
        bg = "bg-green-600"
        hover = "hover:bg-green-700"
        ring = "focus:ring-green-500"
    }
    orange = @{
        gradient = "from-orange-600 to-orange-800"
        bg = "bg-orange-600"
        hover = "hover:bg-orange-700"
        ring = "focus:ring-orange-500"
    }
}

Write-Host "🔄 Iniciando generación de vistas..." -ForegroundColor Yellow
Write-Host ""

$successCount = 0
$failCount = 0

foreach ($catalog in $catalogs) {
    try {
        $colors = $colorClasses[$catalog.color]
        
        # Crear contenido personalizado
        $content = $template -replace "from-gray-700 to-gray-900", $colors.gradient
        $content = $content -replace "bg-gray-700", $colors.bg
        $content = $content -replace "hover:bg-gray-800", $colors.hover
        $content = $content -replace "focus:ring-gray-500", $colors.ring
        $content = $content -replace "Catálogo - ERP Monasterio", "$($catalog.title) - ERP Monasterio"
        
        # Actualizar configuración JavaScript
        $content = $content -replace "name: 'planta'", "name: '$($catalog.name)'"
        $content = $content -replace "title: 'Plantas'", "title: '$($catalog.title)'"
        $content = $content -replace "icon: 'fa-building'", "icon: '$($catalog.icon)'"
        $content = $content -replace "/api/catalogos/plantas", "/api/catalogos/$($catalog.name)"
        $content = $content -replace "description: 'Gestión de plantas de producción'", "description: '$($catalog.desc)'"
        
        # Guardar archivo
        $filename = Join-Path $outputDir "$($catalog.name).html"
        $content | Out-File -FilePath $filename -Encoding UTF8
        
        Write-Host "  ✅ $($catalog.name).html" -ForegroundColor Green -NoNewline
        Write-Host " → $($catalog.title)" -ForegroundColor Gray
        $successCount++
    }
    catch {
        Write-Host "  ❌ Error generando $($catalog.name): $($_.Exception.Message)" -ForegroundColor Red
        $failCount++
    }
}

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "   Resumen de Generación" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "✅ Exitosas:  $successCount" -ForegroundColor Green
Write-Host "❌ Fallidas:  $failCount" -ForegroundColor Red
Write-Host "📊 Total:     $($catalogs.Count)" -ForegroundColor Cyan
Write-Host ""

if ($successCount -eq $catalogs.Count) {
    Write-Host "🎉 ¡Generación completada exitosamente!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📂 Ubicación: $outputDir" -ForegroundColor Gray
    Write-Host ""
    Write-Host "🚀 Próximos pasos:" -ForegroundColor Yellow
    Write-Host "   1. Levantar el servidor: npm run dev" -ForegroundColor Gray
    Write-Host "   2. Probar cada vista en el navegador" -ForegroundColor Gray
    Write-Host "   3. Verificar funcionalidad CRUD" -ForegroundColor Gray
}
else {
    Write-Host "⚠️  Generación completada con errores" -ForegroundColor Yellow
    Write-Host "   Revisa los mensajes de error arriba" -ForegroundColor Gray
}

Write-Host ""
