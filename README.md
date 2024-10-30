# Todo App

Este proyecto consiste en una aplicación de gestión de tareas dividida en dos partes: **todo-back** y **todo-front**. 

- **Todo-Back**: Implementado en **NestJS** utilizando **TypeORM** y **MySQL**.
- **Todo-Front**: Implementado en **Next.js**.

El proyecto utiliza **Docker** y **Docker Compose** para simplificar la configuración y la ejecución de los entornos.

## Requisitos Previos

- [Docker](https://docs.docker.com/get-docker/) y [Docker Compose](https://docs.docker.com/compose/install/) instalados en tu máquina.

## Configuración del Entorno

1. **Clona el Repositorio**

   ```bash
   git clone https://github.com/OzkrOssa/todo-app
   cd todo-app
   ```

3. **Estructura del Proyecto**

   Asegúrate de que la estructura de tu proyecto esté organizada como sigue:

   ```
   ├───todo-back
│   └───src
│       ├───adapter
│       │   ├───controller
│       │   └───repository
│       └───core
│           ├───domain
│           ├───port
│           └───service
└───todo-front
    ├───public
    └───src
        └───app
            ├───componentes
            ├───fonts
            ├───hooks
            ├───login
            ├───register
            ├───services
            └───todos

   ```

## Pasos para Instalar Dependencias

1. **Navega a la Carpeta del Backend**

   ```bash
   cd todo-back
   ```

2. **Instala las Dependencias**

   Asegúrate de estar en la carpeta del backend y ejecuta:

   ```bash
   npm install
   ```

3. **Navega a la Carpeta del Frontend**

   ```bash
   cd ../todo-front
   ```

4. **Instala las Dependencias del Frontend**

   ```bash
   npm install
   ```

## Instrucciones para Ejecutar el Proyecto

1. **Inicia los Contenedores con Docker Compose**

   Desde la raíz del proyecto, ejecuta:

   ```bash
   docker-compose up -d
   ```

   Esto iniciará los contenedores para el backend (`todo-back`), el frontend (`todo-front`) y la base de datos (`db`). 

2. **Accede a la Aplicación**

   - El backend estará disponible en [http://localhost:4000](http://localhost:4000).
   - El frontend estará disponible en [http://localhost:3000](http://localhost:3000).

## Explicación Técnica del Proyecto

### Todo-Back

El backend está construido siguiendo una **arquitectura hexagonal**. La estructura del proyecto incluye:

- **Adapters**: Permiten la comunicación entre el dominio y el mundo exterior (por ejemplo, controladores).
- **Domain**: Contiene la lógica central del negocio.
- **Ports**: Interfaces que definen las operaciones que el dominio puede realizar.
- **Services y Repositorios**: Implementaciones de la lógica de negocio y acceso a datos.

Para la autenticación, capturamos un **token** enviado al usuario al iniciar sesión. Este token se guarda en **localStorage** y se utiliza en cada solicitud posterior. Validamos la existencia del token para proteger las rutas de la aplicación, lo que permite un control de acceso adecuado. También se pueden implementar técnicas adicionales, como **Guards** y **Middlewares**, para mejorar la seguridad.

### Todo-Front

El frontend se construye utilizando **Next.js**, que permite la renderización del lado del servidor y mejora el SEO y la velocidad de carga. El frontend se comunica con el backend a través de las API REST expuestas por el backend.

## Problemas Encontrados

Durante el desarrollo, enfrenté algunos desafíos, incluido el hecho de que estuve un poco enfermo todo el día. Sin embargo, me esforzaré por enviar una prueba lo más completa posible, tambien estuve un tiempo considerable sin usar estas tecnologias ya que estaba enfocado en golang y python entonces tuve que buscar documentacion para realzar algunas cosas que no recordaba. 

Agradezco tu comprensión y paciencia mientras finalizo este proyecto.
