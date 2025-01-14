# Elimina la db
rm -rf src/db/template.db

# Sincroniza la migración con la db
bun drizzle-kit migrate

# Envia los cambios del schema directo a la db
# bun drizzle-kit push