# Lista de Chequeo para la Prueba Técnica

## Requisitos Generales
- [x] El proyecto se ha creado y estructurado de acuerdo con las mejores prácticas.
- [x] El código fuente está disponible en un repositorio público en GitHub o GitLab.

---

## Backend (NestJS + TypeScript)

### 1. Autenticación
- [x] Se ha implementado un sistema de registro para nuevos usuarios.
- [x] Se ha implementado un sistema de inicio de sesión con JWT.
- [x] La autenticación es segura y se manejan correctamente los tokens.

### 2. API REST
- [x] Se han creado los siguientes endpoints:
  - [x] **POST /tasks**: Crea una nueva tarea.
  - [x] **GET /tasks**: Lista todas las tareas del usuario autenticado.
  - [x] **GET /tasks/:id**: Permite ver los detalles de una tarea específica.
  - [x] **PUT /tasks/:id**: Permite editar una tarea.
  - [x] **DELETE /tasks/:id**: Permite eliminar una tarea.
  
### 3. Validación y Seguridad
- [x] Las entradas de datos están validadas (fechas, estados).
- [x] Se asegura que solo el usuario autenticado pueda acceder a sus propias tareas.
- [x] Se manejan correctamente los errores en las solicitudes API.

---

## Frontend (Next.js + TypeScript)

### 1. Interfaz de Usuario
- [x] Se ha creado una interfaz de usuario sencilla y accesible.
- [x] Se pueden realizar las siguientes acciones:
  - [x] Registrarse e iniciar sesión.
  - [x] Crear nuevas tareas.
  - [x] Ver la lista de tareas existentes.
  - [x] Editar y eliminar tareas.
  - [ ] Ver tareas categorizadas por estado ('pendiente', 'en progreso', 'completada').

### 2. Rutas Protegidas
- [x] Las rutas de tareas están protegidas para que solo los usuarios autenticados puedan acceder a ellas.

### 3. Validación en el Frontend
- [ ] Se valida la entrada de datos (fecha y estado) antes de enviarla al backend.

---

## Entregables

### 1. Código Fuente
- [x] El repositorio incluye todo el código fuente del proyecto.
  
### 2. Instrucciones de Configuración
- [x] Existe un archivo README.md con:
  - [x] Instrucciones claras sobre cómo configurar el entorno.
  - [x] Pasos para instalar dependencias.
  - [x] Instrucciones para ejecutar el proyecto.

### 3. Explicación Técnica
- [x] Hay una sección en el README.md que explica las decisiones técnicas tomadas durante el desarrollo.
