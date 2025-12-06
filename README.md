# 🚀 Arquitectura de Microservicios con Docker Compose

Desarrollado por: Javier 

Este proyecto implementa una arquitectura de microservicios utilizando Docker Compose, integrando un frontend web (React), una API REST (Node.js/Express) y una base de datos PostgreSQL con persistencia de datos.

## 📋 Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Arquitectura del Sistema](#arquitectura-del-sistema)
- [Servicios Incluidos](#servicios-incluidos)
- [Requisitos Previos](#requisitos-previos)
- [Instalación y Uso](#instalación-y-uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Endpoints de la API](#endpoints-de-la-api)
- [Comunicación entre Servicios](#comunicación-entre-servicios)
- [Persistencia de Datos](#persistencia-de-datos)
- [Pruebas](#pruebas)
- [Diagramas](#diagramas)

## 📖 Descripción General

Este proyecto demuestra el funcionamiento de una arquitectura de microservicios donde:

- **Frontend**: Aplicación React que consume datos de una API REST
- **Backend**: API REST desarrollada en Node.js/Express que realiza operaciones CRUD
- **Base de Datos**: PostgreSQL con persistencia mediante volúmenes Docker

Todos los servicios están containerizados y se comunican a través de una red interna de Docker.

## 🏗️ Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                    Docker Compose Network                    │
│              (javier_microservices_network)                  │
│                                                              │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────┐ │
│  │   Frontend   │──────│   Backend    │──────│   DB     │ │
│  │   React      │ HTTP │   Express    │ SQL  │PostgreSQL│ │
│  │   :3000      │      │   :5000      │      │  :5432   │ │
│  │              │      │              │      │          │ │
│  │javier-       │      │alonso-       │      │javier-   │ │
│  │frontend-app  │      │backend-api   │      │postgres- │ │
│  │              │      │              │      │db        │ │
│  └──────────────┘      └──────────────┘      └──────────┘ │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Volumen: javier_postgres_data                 │  │
│  │         (Persistencia de datos)                       │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 Servicios Incluidos

### 1. Frontend (React)
- **Contenedor**: `javier-frontend-app`
- **Puerto**: 3000
- **Tecnología**: React 18
- **Características**:
  - Interfaz de usuario moderna y responsive
  - Consume datos desde la API REST
  - Muestra el nombre del desarrollador (Javier Alonso)
  - Operaciones CRUD completas

### 2. Backend API (Node.js/Express)
- **Contenedor**: `alonso-backend-api`
- **Puerto**: 5000
- **Tecnología**: Node.js 18, Express, PostgreSQL
- **Características**:
  - API REST con operaciones CRUD
  - Endpoint especial `/api/alonso` que retorna el nombre completo
  - Conexión a PostgreSQL mediante variables de entorno
  - Health check endpoint

### 3. Base de Datos (PostgreSQL)
- **Contenedor**: `javier-postgres-db`
- **Puerto**: 5432
- **Base de Datos**: `javier_database`
- **Usuario**: `javier_user`
- **Características**:
  - Persistencia mediante volumen Docker
  - Health checks para verificar disponibilidad
  - Configuración segura con credenciales

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- [Docker](https://www.docker.com/get-started) (versión 20.10 o superior)
- [Docker Compose](https://docs.docker.com/compose/install/) (versión 2.0 o superior)

Verifica la instalación:

```bash
docker --version
docker-compose --version
```

## 🚀 Instalación y Uso

### 1. Clonar el Repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd Alonso
```

### 2. Levantar los Servicios

Desde la raíz del proyecto, ejecuta:

```bash
docker-compose up --build
```

Este comando:
- Construye las imágenes Docker para frontend y backend
- Crea la red interna `javier_microservices_network`
- Crea el volumen `javier_postgres_data` para persistencia
- Inicia los tres servicios en el orden correcto (dependencias)

### 3. Acceder a la Aplicación

Una vez que todos los contenedores estén corriendo:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **PostgreSQL**: localhost:5432

### 4. Detener los Servicios

Para detener todos los servicios:

```bash
docker-compose down
```

Para detener y eliminar volúmenes (⚠️ esto eliminará los datos):

```bash
docker-compose down -v
```

## 📁 Estructura del Proyecto

```
Alonso/
│
├── docker-compose.yml          # Configuración de servicios Docker
├── .gitignore                  # Archivos ignorados por Git
├── README.md                   # Este archivo
│
├── frontend/                   # Aplicación React
│   ├── Dockerfile             # Imagen Docker del frontend
│   ├── package.json           # Dependencias del frontend
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js             # Componente principal
│       ├── App.css            # Estilos
│       ├── index.js           # Punto de entrada
│       └── index.css
│
└── backend/                    # API REST
    ├── Dockerfile             # Imagen Docker del backend
    ├── package.json           # Dependencias del backend
    └── server.js              # Servidor Express
```

## 🔌 Endpoints de la API

### Endpoint Especial
- **GET** `/api/alonso` - Retorna el nombre completo del desarrollador

### CRUD de Usuarios
- **GET** `/api/usuarios` - Obtener todos los usuarios
- **GET** `/api/usuarios/:id` - Obtener un usuario por ID
- **POST** `/api/usuarios` - Crear un nuevo usuario
  ```json
  {
    "nombre": "Juan Pérez",
    "email": "juan@example.com"
  }
  ```
- **PUT** `/api/usuarios/:id` - Actualizar un usuario
- **DELETE** `/api/usuarios/:id` - Eliminar un usuario

### Health Check
- **GET** `/api/health` - Verificar estado de la API y conexión a la base de datos

## 🔄 Comunicación entre Servicios

### Red Interna

Todos los servicios están conectados a la red `javier_microservices_network`, lo que permite la comunicación mediante nombres de contenedores:

- Frontend → Backend: `http://alonso-backend-api:5000`
- Backend → Base de Datos: `javier-postgres-db:5432`

### Flujo de Datos

1. **Usuario interactúa con Frontend** (puerto 3000)
2. **Frontend hace petición HTTP** al Backend (puerto 5000)
3. **Backend procesa la petición** y consulta/escribe en PostgreSQL
4. **PostgreSQL retorna datos** al Backend
5. **Backend responde con JSON** al Frontend
6. **Frontend actualiza la UI** con los datos recibidos

### Variables de Entorno

El backend utiliza las siguientes variables de entorno (definidas en `docker-compose.yml`):

```yaml
DB_HOST: javier-postgres-db
DB_PORT: 5432
DB_USER: javier_user
DB_PASSWORD: javier_password_2024
DB_NAME: javier_database
PORT: 5000
```

## 💾 Persistencia de Datos

Los datos de PostgreSQL se almacenan en un volumen Docker explícito llamado `javier_postgres_data`. Esto garantiza que:

- Los datos persisten aunque se detengan los contenedores
- Los datos se mantienen al reiniciar el sistema
- Los datos se pueden respaldar fácilmente

### Verificar Persistencia

1. Crear algunos usuarios desde el frontend
2. Detener los contenedores: `docker-compose down`
3. Volver a levantar: `docker-compose up`
4. Verificar que los usuarios siguen existiendo

## ✅ Pruebas

### Prueba 1: Verificar que todos los servicios están corriendo

```bash
docker-compose ps
```

Deberías ver 3 servicios con estado "Up".

### Prueba 2: Verificar comunicación Frontend → Backend

1. Abre http://localhost:3000
2. Deberías ver la interfaz con el nombre "Javier Alonso"
3. Intenta crear un usuario

### Prueba 3: Verificar endpoint especial

```bash
curl http://localhost:5000/api/alonso
```

Respuesta esperada:
```json
{
  "nombreCompleto": "Javier Alonso",
  "mensaje": "Endpoint creado por Javier Alonso",
  "timestamp": "2024-..."
}
```

### Prueba 4: Verificar persistencia

1. Crea varios usuarios
2. Detén los contenedores: `docker-compose down`
3. Vuelve a levantarlos: `docker-compose up`
4. Verifica que los usuarios siguen existiendo

### Prueba 5: Verificar health check

```bash
curl http://localhost:5000/api/health
```

## 📊 Diagramas

### Diagrama de Flujo de Datos

```
Usuario
  │
  ▼
Frontend (React :3000)
  │ HTTP Request
  ▼
Backend API (Express :5000)
  │ SQL Query
  ▼
PostgreSQL (:5432)
  │ SQL Response
  ▼
Backend API
  │ JSON Response
  ▼
Frontend
  │ Render UI
  ▼
Usuario
```

### Diagrama de Dependencias

```
javier-postgres-db (Base de datos)
  │
  │ depends_on (healthcheck)
  ▼
alonso-backend-api (Backend)
  │
  │ depends_on
  ▼
javier-frontend-app (Frontend)
```

## 🐛 Solución de Problemas

### Los contenedores no inician

```bash
# Ver logs de todos los servicios
docker-compose logs

# Ver logs de un servicio específico
docker-compose logs alonso-backend-api
```

### Error de conexión a la base de datos

Verifica que el contenedor de PostgreSQL esté saludable:

```bash
docker-compose ps
```

El servicio `javier-postgres-db` debe mostrar "healthy" en el estado.

### El frontend no puede conectar con el backend

Verifica que la variable de entorno `REACT_APP_API_URL` esté configurada correctamente. En desarrollo local, usa `http://localhost:5000`.

## 📝 Notas Técnicas

- **Justificación de imágenes base**: Se utiliza `node:18-alpine` porque es una imagen oficial optimizada que proporciona Node.js 18 en un entorno minimalista, reduciendo el tamaño de la imagen.
- **Volúmenes explícitos**: Se define el volumen `javier_postgres_data` explícitamente en `docker-compose.yml` para garantizar persistencia y facilitar el respaldo.
- **Health checks**: PostgreSQL incluye health checks para asegurar que el backend solo inicie cuando la base de datos esté lista.

## 👤 Autor

**Javier Alonso**

- Desarrollo completo de la arquitectura de microservicios
- Frontend: React
- Backend: Node.js/Express
- Base de Datos: PostgreSQL

## 📄 Licencia

Este proyecto es parte de un ejercicio académico/práctico.

---

## 🔗 URL del Repositorio GitHub

**Repositorio**: [https://github.com/Javier36772/AlonsoDocker.git](https://github.com/Javier36772/AlonsoDocker.git)

