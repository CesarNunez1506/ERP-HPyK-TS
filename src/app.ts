import express, { Application, Request, Response, NextFunction } from 'express';
import path from 'path';
import sequelize from './config/database';
import { setupAssociations } from './models';

// Importar controladores
import { 
  getAllPlantas, 
  getPlantaById, 
  createPlanta, 
  updatePlanta, 
  deletePlanta 
} from './controllers/catalogo/plantaController';

import { 
  getAllAreas, 
  getAreaById, 
  createArea, 
  updateArea, 
  deleteArea 
} from './controllers/catalogo/areaController';

import { 
  getAllEquipos, 
  getEquipoById, 
  createEquipo, 
  updateEquipo, 
  deleteEquipo 
} from './controllers/maestros/equipoController';

import { 
  getAllOrdenesTrabajo, 
  getOrdenTrabajoById, 
  createOrdenTrabajo, 
  updateOrdenTrabajo, 
  deleteOrdenTrabajo 
} from './controllers/operativos/ordenTrabajoController';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (vistas HTML)
app.use(express.static(path.join(__dirname, 'vistas')));

// ============= RUTAS DE VISTAS HTML =============
// Dashboard
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'vistas', 'index.html'));
});

// Catálogos
app.get('/catalogo/plantas', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'vistas', 'catalogo', 'plantas.html'));
});

app.get('/catalogo/areas', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'vistas', 'catalogo', 'areas.html'));
});

// Maestros
app.get('/maestros/equipos', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'vistas', 'maestros', 'equipos.html'));
});

// Operativos
app.get('/operativos/ordenes-trabajo', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'vistas', 'operativos', 'ordenes-trabajo.html'));
});

// ============= RUTAS DE API =============

// API Catálogos - Plantas
app.get('/api/catalogo/plantas', getAllPlantas);
app.get('/api/catalogo/plantas/:codigo', getPlantaById);
app.post('/api/catalogo/plantas', createPlanta);
app.put('/api/catalogo/plantas/:codigo', updatePlanta);
app.delete('/api/catalogo/plantas/:codigo', deletePlanta);

// API Catálogos - Áreas
app.get('/api/catalogo/areas', getAllAreas);
app.get('/api/catalogo/areas/:codigo', getAreaById);
app.post('/api/catalogo/areas', createArea);
app.put('/api/catalogo/areas/:codigo', updateArea);
app.delete('/api/catalogo/areas/:codigo', deleteArea);

// API Maestros - Equipos
app.get('/api/maestros/equipos', getAllEquipos);
app.get('/api/maestros/equipos/:id', getEquipoById);
app.post('/api/maestros/equipos', createEquipo);
app.put('/api/maestros/equipos/:id', updateEquipo);
app.delete('/api/maestros/equipos/:id', deleteEquipo);

// API Operativos - Órdenes de Trabajo
app.get('/api/operativos/ordenes-trabajo', getAllOrdenesTrabajo);
app.get('/api/operativos/ordenes-trabajo/:id', getOrdenTrabajoById);
app.post('/api/operativos/ordenes-trabajo', createOrdenTrabajo);
app.put('/api/operativos/ordenes-trabajo/:id', updateOrdenTrabajo);
app.delete('/api/operativos/ordenes-trabajo/:id', deleteOrdenTrabajo);

// Manejo de errores
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: err.message
  });
});

// Ruta 404
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Iniciar servidor
const startServer = async () => {
  try {
    // Conectar a la base de datos
    await sequelize.authenticate();
    console.log('✓ Conexión a la base de datos establecida');

    // Configurar asociaciones entre modelos
    setupAssociations();
    console.log('✓ Asociaciones de modelos configuradas');

    // Sincronizar modelos con la base de datos
    await sequelize.sync({ alter: true });
    console.log('✓ Modelos sincronizados con la base de datos');

    // Iniciar servidor Express
    app.listen(PORT, () => {
      console.log(`\n🚀 Servidor corriendo en http://localhost:${PORT}`);
      console.log(`📊 Dashboard disponible en http://localhost:${PORT}`);
      console.log(`📋 API disponible en http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();

export default app;
