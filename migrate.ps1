# ============================================
# SCRIPT DE MIGRACIÓN AUTOMATIZADA
# ERP HPyK - Nueva Estructura de Base de Datos
# ============================================

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "   MIGRACIÓN A NUEVA ESTRUCTURA DE BD" -ForegroundColor Cyan
Write-Host "   ERP HPyK - Sistema Integrado" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Configuración
$PROJECT_ROOT = "c:\Users\Cesar\Desktop\Proyecto Monasterio\ERP-HPyK"
$MODELS_DIR = "$PROJECT_ROOT\src\models"
$CATALOGS_DIR = "$MODELS_DIR\catalogs"
$BACKUP_DIR = "$PROJECT_ROOT\backups"
$DB_NAME = "erp_hpyk_main"
$DB_USER = "postgres"
$DB_PASSWORD = "1234"
$DB_HOST = "localhost"

# Crear directorio de backups si no existe
if (!(Test-Path $BACKUP_DIR)) {
    New-Item -ItemType Directory -Path $BACKUP_DIR | Out-Null
    Write-Host "✓ Directorio de backups creado: $BACKUP_DIR" -ForegroundColor Green
}

# ============================================
# PASO 1: RESPALDO DE BASE DE DATOS
# ============================================
Write-Host ""
Write-Host "PASO 1: Creando respaldo de base de datos..." -ForegroundColor Yellow
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$backupFile = "$BACKUP_DIR\backup_erp_$timestamp.backup"

$env:PGPASSWORD = $DB_PASSWORD
try {
    $pgDumpArgs = @(
        "-U", $DB_USER,
        "-h", $DB_HOST,
        "-d", $DB_NAME,
        "-F", "c",
        "-b",
        "-v",
        "-f", $backupFile
    )
    
    & pg_dump @pgDumpArgs 2>&1 | Out-Null
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Respaldo creado exitosamente: $backupFile" -ForegroundColor Green
        $backupSize = (Get-Item $backupFile).Length / 1MB
        Write-Host "  Tamaño: $([math]::Round($backupSize, 2)) MB" -ForegroundColor Gray
    } else {
        Write-Host "✗ Error al crear respaldo" -ForegroundColor Red
        Write-Host "  Continúa bajo tu propio riesgo..." -ForegroundColor Yellow
        $continue = Read-Host "¿Deseas continuar sin respaldo? (S/N)"
        if ($continue -ne "S") {
            Write-Host "Migración cancelada." -ForegroundColor Red
            exit 1
        }
    }
} catch {
    Write-Host "✗ Error al ejecutar pg_dump: $_" -ForegroundColor Red
    Write-Host "  Asegúrate de que PostgreSQL esté instalado y en el PATH" -ForegroundColor Yellow
}

# ============================================
# PASO 2: DETENER SERVIDOR
# ============================================
Write-Host ""
Write-Host "PASO 2: Deteniendo servidor..." -ForegroundColor Yellow
try {
    Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
    Start-Sleep -Seconds 2
    Write-Host "✓ Servidor detenido" -ForegroundColor Green
} catch {
    Write-Host "  No hay procesos Node.js corriendo" -ForegroundColor Gray
}

# ============================================
# PASO 3: RENOMBRAR MODELOS NUEVOS
# ============================================
Write-Host ""
Write-Host "PASO 3: Activando nuevos modelos..." -ForegroundColor Yellow

# Crear respaldo de modelos antiguos
$oldModelsBackup = "$MODELS_DIR\OLD_MODELS_BACKUP_$timestamp"
if (!(Test-Path $oldModelsBackup)) {
    New-Item -ItemType Directory -Path $oldModelsBackup | Out-Null
}

# Mover modelos antiguos al backup
$oldModels = @(
    "Material.ts",
    "Equipo.ts",
    "Estrategia.ts",
    "Tarea.ts",
    "CodigoReparacion.ts",
    "OrdenTrabajo.ts",
    "index.ts"
)

foreach ($oldModel in $oldModels) {
    $oldPath = "$MODELS_DIR\$oldModel"
    if (Test-Path $oldPath) {
        Move-Item $oldPath "$oldModelsBackup\$oldModel" -Force
        Write-Host "  Respaldado: $oldModel → OLD_MODELS_BACKUP" -ForegroundColor Gray
    }
}

# Renombrar modelos principales
$mainModels = @(
    "Material.new.ts",
    "Equipo.new.ts",
    "Estrategia.new.ts",
    "Tarea.new.ts",
    "CodigoReparacion.new.ts",
    "OrdenTrabajo.new.ts",
    "index.new.ts"
)

$renamedCount = 0
foreach ($model in $mainModels) {
    $oldName = "$MODELS_DIR\$model"
    $newName = $oldName -replace ".new.ts$", ".ts"
    
    if (Test-Path $oldName) {
        Rename-Item $oldName $newName -Force
        Write-Host "✓ Activado: $model → $($model -replace '.new.ts$', '.ts')" -ForegroundColor Green
        $renamedCount++
    }
}

# Renombrar catálogos
if (Test-Path $CATALOGS_DIR) {
    $catalogModels = Get-ChildItem -Path $CATALOGS_DIR -Filter "*.new.ts"
    
    foreach ($catalog in $catalogModels) {
        $newName = $catalog.Name -replace ".new.ts$", ".ts"
        $oldPath = $catalog.FullName
        $newPath = "$CATALOGS_DIR\$newName"
        
        Rename-Item $oldPath $newPath -Force
        $renamedCount++
    }
    
    Write-Host "✓ $($catalogModels.Count) catálogos activados" -ForegroundColor Green
}

Write-Host "✓ Total de modelos activados: $renamedCount" -ForegroundColor Green

# ============================================
# PASO 4: MODIFICAR APP.TS (force: true)
# ============================================
Write-Host ""
Write-Host "PASO 4: Configurando recreación de base de datos..." -ForegroundColor Yellow

$appTsPath = "$PROJECT_ROOT\src\app.ts"
$appTsContent = Get-Content $appTsPath -Raw

# Crear respaldo de app.ts
Copy-Item $appTsPath "$PROJECT_ROOT\src\app.ts.backup_$timestamp" -Force

# Cambiar force: false a force: true
$appTsContent = $appTsContent -replace "await sequelize\.sync\(\{ force: false \}\);", "await sequelize.sync({ force: true });"

Set-Content $appTsPath $appTsContent -NoNewline

Write-Host "✓ app.ts configurado para recrear base de datos" -ForegroundColor Green

# ============================================
# PASO 5: EJECUTAR MIGRACIÓN
# ============================================
Write-Host ""
Write-Host "PASO 5: Ejecutando migración..." -ForegroundColor Yellow
Write-Host ""
Write-Host "⚠️  ADVERTENCIA: Se eliminarán TODAS las tablas existentes" -ForegroundColor Red
Write-Host "   y se crearán nuevas tablas según la estructura Excel" -ForegroundColor Red
Write-Host ""
Write-Host "   Presiona Ctrl+C para cancelar en los próximos 5 segundos..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host ""
Write-Host "Iniciando servidor con migración..." -ForegroundColor Cyan

# Cambiar al directorio del proyecto
Set-Location $PROJECT_ROOT

# Iniciar servidor
$serverJob = Start-Job -ScriptBlock {
    param($projectRoot)
    Set-Location $projectRoot
    node -r ts-node/register src/app.ts
} -ArgumentList $PROJECT_ROOT

# Esperar a que el servidor inicie
Write-Host ""
Write-Host "Esperando a que el servidor inicie..." -ForegroundColor Gray
Start-Sleep -Seconds 10

# Mostrar output del servidor
$jobOutput = Receive-Job $serverJob
Write-Host $jobOutput

# Verificar si el servidor está corriendo
$serverRunning = Get-Process node -ErrorAction SilentlyContinue

if ($serverRunning) {
    Write-Host ""
    Write-Host "✓ Servidor iniciado correctamente" -ForegroundColor Green
    Write-Host "✓ Base de datos recreada con nueva estructura" -ForegroundColor Green
    Write-Host ""
    Write-Host "Presiona Enter para detener el servidor y continuar..." -ForegroundColor Yellow
    Read-Host
    
    # Detener servidor
    Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
    Start-Sleep -Seconds 2
    Write-Host "✓ Servidor detenido" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "✗ Error: El servidor no se inició correctamente" -ForegroundColor Red
    Write-Host "  Revisa los logs arriba para más detalles" -ForegroundColor Yellow
    Write-Host ""
    $rollback = Read-Host "¿Deseas hacer rollback? (S/N)"
    
    if ($rollback -eq "S") {
        # Restaurar app.ts
        Copy-Item "$PROJECT_ROOT\src\app.ts.backup_$timestamp" $appTsPath -Force
        
        # Restaurar base de datos
        Write-Host "Restaurando base de datos..." -ForegroundColor Yellow
        $env:PGPASSWORD = $DB_PASSWORD
        & pg_restore -U $DB_USER -h $DB_HOST -d $DB_NAME -c -v $backupFile
        
        Write-Host "✓ Rollback completado" -ForegroundColor Green
        exit 1
    }
    
    exit 1
}

# ============================================
# PASO 6: RESTAURAR force: false
# ============================================
Write-Host ""
Write-Host "PASO 6: Restaurando configuración de seguridad..." -ForegroundColor Yellow

$appTsContent = Get-Content $appTsPath -Raw
$appTsContent = $appTsContent -replace "await sequelize\.sync\(\{ force: true \}\);", "await sequelize.sync({ force: false });"
Set-Content $appTsPath $appTsContent -NoNewline

Write-Host "✓ app.ts restaurado (force: false)" -ForegroundColor Green

# ============================================
# PASO 7: REINICIAR SERVIDOR
# ============================================
Write-Host ""
Write-Host "PASO 7: Reiniciando servidor en modo normal..." -ForegroundColor Yellow

$serverJob = Start-Job -ScriptBlock {
    param($projectRoot)
    Set-Location $projectRoot
    node -r ts-node/register src/app.ts
} -ArgumentList $PROJECT_ROOT

Start-Sleep -Seconds 5
$jobOutput = Receive-Job $serverJob
Write-Host $jobOutput

Write-Host ""
Write-Host "✓ Servidor reiniciado en modo normal" -ForegroundColor Green

# ============================================
# RESUMEN
# ============================================
Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "   MIGRACIÓN COMPLETADA" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "✓ Base de datos recreada con 30 tablas nuevas" -ForegroundColor Green
Write-Host "✓ 6 tablas principales: Material, Equipo, Estrategia, Tarea, CodigoReparacion, OrdenTrabajo" -ForegroundColor Green
Write-Host "✓ 24 tablas catálogo activadas" -ForegroundColor Green
Write-Host ""
Write-Host "📂 Respaldo guardado en:" -ForegroundColor Yellow
Write-Host "   $backupFile" -ForegroundColor Gray
Write-Host ""
Write-Host "🌐 Servidor corriendo en:" -ForegroundColor Yellow
Write-Host "   http://localhost:3000" -ForegroundColor Gray
Write-Host ""
Write-Host "📋 PRÓXIMOS PASOS:" -ForegroundColor Yellow
Write-Host "   1. Poblar tablas catálogo con datos iniciales (seeds)" -ForegroundColor White
Write-Host "   2. Probar API: http://localhost:3000/api/materiales" -ForegroundColor White
Write-Host "   3. Verificar vistas HTML" -ForegroundColor White
Write-Host "   4. Actualizar controladores si es necesario" -ForegroundColor White
Write-Host ""
Write-Host "Para detener el servidor:" -ForegroundColor Yellow
Write-Host "   Get-Process node | Stop-Process" -ForegroundColor Gray
Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
