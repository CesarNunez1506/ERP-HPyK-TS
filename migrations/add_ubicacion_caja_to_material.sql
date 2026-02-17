-- Agregar columnas ubicacion y caja a la tabla material
-- Ejecutar este script en la base de datos PostgreSQL

-- Agregar columna ubicacion
ALTER TABLE material 
ADD COLUMN IF NOT EXISTS ubicacion VARCHAR(10);

-- Agregar columna caja
ALTER TABLE material 
ADD COLUMN IF NOT EXISTS caja VARCHAR(20);

-- Agregar comentarios
COMMENT ON COLUMN material.ubicacion IS 'Ubicación física en almacén (ej: A6, B6)';
COMMENT ON COLUMN material.caja IS 'Número o identificador de caja (ej: CAJA 3)';

-- Verificar estructura
SELECT column_name, data_type, character_maximum_length, is_nullable
FROM information_schema.columns
WHERE table_name = 'material'
AND column_name IN ('ubicacion', 'caja');
