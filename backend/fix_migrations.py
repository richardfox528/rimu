import sqlite3
import datetime

# Conectar a la base de datos
conn = sqlite3.connect("db.sqlite3")
cursor = conn.cursor()

# Verificar si las migraciones ya existen
cursor.execute("SELECT app, name FROM django_migrations WHERE app = 'voxlyne'")
existing_migrations = cursor.fetchall()
existing_migrations = [(app, name) for app, name in existing_migrations]

# Migraciones a insertar
migrations_to_insert = [
    ("voxlyne", "0001_initial"),
    ("voxlyne", "0002_remove_employmenthistory_employee_user_and_more"),
    ("voxlyne", "0003_delete_user"),
]

# Insertar solo las migraciones que no existen
for app, name in migrations_to_insert:
    if (app, name) not in existing_migrations:
        now = datetime.datetime.now().isoformat()
        cursor.execute(
            "INSERT INTO django_migrations (app, name, applied) VALUES (?, ?, ?)",
            (app, name, now),
        )
        print(f"Migración {app}.{name} marcada como aplicada")

# Guardar cambios
conn.commit()
conn.close()

print("Proceso completado")
