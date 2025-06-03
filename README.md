# 📝 To-Do App (React + Node + Express + MongoDB + Docker)

Aplicación web tipo **To-Do list** que permite a usuarios autenticados gestionar sus tareas personales. El proyecto se basa en una arquitectura completa MERN, separando la base de datos de autenticación y la de tareas, todo orquestado mediante Docker para facilitar su despliegue.

---

## 🚀 Tecnologías utilizadas

- **Frontend**: React (Create React App)
- **Backend**: Node.js + Express
- **Base de datos**:
  - MongoDB (2 instancias): `authDB` y `crudDB`
- **Contenedores**:
  - Docker + Docker Compose

---

## 📁 Estructura del proyecto

- **backend/**: Contiene la lógica del servidor Express, modelos de Mongoose, rutas para autenticación y tareas.
- **frontend/**: Aplicación React creada con `create-react-app`, incluyendo componentes y archivos principales.
- **docker-compose.yml**: Configuración de Docker Compose para levantar los servicios necesarios.
- **.gitignore**: Archivos y carpetas ignorados por Git.
- **README.md**: Documentación del proyecto.

---

## ✅ Funcionalidades

- Registro e inicio de sesión de usuarios
- Persistencia de usuarios en `authDB`
- CRUD completo de tareas por usuario autenticado
- Manejo de sesiones y autenticación (JWT)
- Frontend limpio y funcional

---

## 🧪 Instrucciones de ejecución

1. **Clonar el repositorio**  
   ```bash
   git clone https://github.com/wolsybl/DobleDB
   cd DobleDB

2. **Levantar los servicios con Docker**
   ```bash
   docker-compose up --build

3. **Acceder a la aplicación**

    Frontend: http://localhost:3000

    Backend: http://localhost:5000
