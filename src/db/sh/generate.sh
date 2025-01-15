# Elimina la carpeta de migraciones
rm -rf src/db/migrations

# Genera una nueva migración
bun drizzle-kit generate
