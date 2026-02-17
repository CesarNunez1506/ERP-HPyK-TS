import sequelize from '../config/database';

/**
 * Ejecutar migraciones manuales necesarias
 */
export async function runMigrations() {
  console.log('⚙️ Ejecutando migraciones...');
  
  try {
    // Agregar columnas ubicacion y caja a la tabla material
    await sequelize.query(`
      ALTER TABLE material 
      ADD COLUMN IF NOT EXISTS ubicacion VARCHAR(10);
    `);
    
    await sequelize.query(`
      ALTER TABLE material 
      ADD COLUMN IF NOT EXISTS caja VARCHAR(20);
    `);
    
    console.log('✓ Migraciones ejecutadas correctamente');
  } catch (error: any) {
    console.warn('⚠️ Advertencia en migraciones:', error.message);
    // No lanzar error, las columnas podrían ya existir
  }
}
