# 📤 Instrucciones para Subir a GitHub

## Pasos para Subir el Proyecto a GitHub

### 1. Crear un Repositorio en GitHub

1. Ve a [GitHub](https://github.com) e inicia sesión
2. Haz clic en el botón "+" en la esquina superior derecha
3. Selecciona "New repository"
4. Configura el repositorio:
   - **Nombre**: `microservicios-docker-compose` (o el que prefieras)
   - **Descripción**: "Arquitectura de microservicios con Docker Compose - Frontend React, Backend Node.js/Express, PostgreSQL"
   - **Visibilidad**: Público o Privado (según prefieras)
   - **NO** marques "Initialize this repository with a README" (ya tenemos uno)
5. Haz clic en "Create repository"

### 2. Conectar el Repositorio Local con GitHub

Una vez creado el repositorio, GitHub te mostrará comandos. Ejecuta estos comandos en tu terminal:

```bash
# Agregar el repositorio remoto (reemplaza TU_USUARIO con tu usuario de GitHub)
git remote add origin https://github.com/TU_USUARIO/microservicios-docker-compose.git

# Cambiar el nombre de la rama principal a 'main' (si es necesario)
git branch -M main

# Subir el código
git push -u origin main
```

### 3. Verificar que se Subió Correctamente

1. Ve a tu repositorio en GitHub
2. Verifica que todos los archivos estén presentes
3. El README.md debería mostrarse automáticamente en la página principal

### 4. Actualizar el README.md

Una vez que tengas la URL de tu repositorio, actualiza la sección "URL del Repositorio GitHub" en el archivo `README.md` con la URL real.

## Comandos Útiles de Git

```bash
# Ver el estado de los archivos
git status

# Ver los commits realizados
git log

# Ver los remotos configurados
git remote -v

# Si necesitas hacer cambios después de subir
git add .
git commit -m "Descripción de los cambios"
git push
```

## Nota sobre Credenciales

Si GitHub te pide autenticación:
- Puedes usar un **Personal Access Token** en lugar de tu contraseña
- O configurar **SSH keys** para una conexión más segura

Para crear un Personal Access Token:
1. Ve a GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Genera un nuevo token con permisos de repositorio
3. Úsalo como contraseña cuando Git te lo pida

