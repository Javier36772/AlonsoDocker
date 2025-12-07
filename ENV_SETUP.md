# 📝 Configuración de Variables de Entorno

## Archivo .env

El proyecto utiliza un archivo `.env` para configurar las variables de entorno. Este archivo **NO** debe subirse a Git (está en `.gitignore`).

## Crear el archivo .env

1. Copia el archivo de ejemplo:
   ```bash
   cp .env.example .env
   ```

2. O crea manualmente el archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
# ============================================
# Variables de Entorno - Microservicios
# ============================================

# ============================================
# Base de Datos PostgreSQL
# ============================================
POSTGRES_USER=javier_user
POSTGRES_PASSWORD=javier_password_2024
POSTGRES_DB=javier_database
POSTGRES_PORT=5432

# ============================================
# Backend API - Node.js/Express
# ============================================
# Host de la base de datos (nombre del servicio en Docker)
DB_HOST=javier-postgres-db
DB_PORT=5432
DB_USER=javier_user
DB_PASSWORD=javier_password_2024
DB_NAME=javier_database
BACKEND_PORT=5000

# ============================================
# Frontend React
# ============================================
# URL del backend API (nombre del servicio en Docker)
REACT_APP_API_URL=http://alonso-backend-api:5000
FRONTEND_PORT=3000
```

## Variables Explicadas

### Base de Datos PostgreSQL

- **POSTGRES_USER**: Usuario de la base de datos
- **POSTGRES_PASSWORD**: Contraseña del usuario
- **POSTGRES_DB**: Nombre de la base de datos
- **POSTGRES_PORT**: Puerto expuesto de PostgreSQL (por defecto 5432)

### Backend API

- **DB_HOST**: Nombre del servicio de PostgreSQL en Docker (`javier-postgres-db`)
- **DB_PORT**: Puerto interno de PostgreSQL (5432)
- **DB_USER**: Usuario para conectar a la base de datos
- **DB_PASSWORD**: Contraseña para conectar a la base de datos
- **DB_NAME**: Nombre de la base de datos
- **BACKEND_PORT**: Puerto expuesto del backend (por defecto 5000)

### Frontend React

- **REACT_APP_API_URL**: URL del backend API. En Docker usa el nombre del servicio: `http://alonso-backend-api:5000`
- **FRONTEND_PORT**: Puerto expuesto del frontend (por defecto 3000)

## Valores por Defecto

El `docker-compose.yml` tiene valores por defecto para todas las variables, por lo que el proyecto funcionará incluso sin el archivo `.env`. Sin embargo, es recomendable crear el archivo para tener control sobre la configuración.

## Seguridad

⚠️ **IMPORTANTE**: 
- El archivo `.env` contiene credenciales sensibles
- **NUNCA** subas el archivo `.env` a Git
- El archivo `.env.example` es solo una plantilla sin valores reales
- Cambia las contraseñas en producción

## Uso

Una vez creado el archivo `.env`, simplemente ejecuta:

```bash
docker-compose up --build
```

Docker Compose leerá automáticamente las variables del archivo `.env`.

