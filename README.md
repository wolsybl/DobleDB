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

- **Frontend**: app React construida con `create-react-app`
- **Backend**:
  - `index.js`: servidor principal Express
  - `db.js`: conexión a las bases de datos `authDB` y `crudDB`
- **Docker**:
  - Contenedor para el backend
  - Contenedor para el frontend (opcionalmente con Nginx)
  - Contenedor para `auth-db`
  - Contenedor para `crud-db`
  - `docker-compose.yml` con la configuración completa

---

## ✅ Funcionalidades

- Registro e inicio de sesión de usuarios
- Persistencia segura en `authDB`
- CRUD completo de tareas por usuario autenticado
- Manejo de sesiones y autenticación (JWT)
- Frontend limpio y funcional

---

## 🧪 Instrucciones de ejecución

1. **Clonar el repositorio**  
   ```bash
   git clone https://github.com/wolsybl/DobleDB
   cd DobleDB
