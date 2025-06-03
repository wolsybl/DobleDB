# 🏗️ Arquitectura del Proyecto: To-Do App

Este documento describe la arquitectura de la aplicación **To-Do App**, construida con el stack MERN (MongoDB, Express, React, Node.js) y Dockerizada para facilitar el despliegue y la escalabilidad.

---

## 📌 Tipo de arquitectura

**Arquitectura cliente-servidor desacoplada**, basada en microservicios monolíticos desplegados en contenedores.

---

## 🧱 Componentes principales

### 1. **Frontend (React)**

* Aplicación de página única (SPA)
* Crea interfaces interactivas y maneja rutas del lado del cliente
* Se comunica con el backend a través de llamadas HTTP (fetch/Axios)
* Empaquetada en su propio contenedor Docker

### 2. **Backend (Node.js + Express)**

* API RESTful que maneja:

  * Registro e inicio de sesión
  * Validación de tokens
  * Operaciones CRUD sobre tareas
* Usa controladores y modelos Mongoose para separar lógica

### 3. **Bases de datos MongoDB**

* **authDB**: almacena usuarios, contraseñas encriptadas, y tokens
* **crudDB**: almacena las tareas (to-dos) vinculadas a cada usuario
* Ambas corren como contenedores separados

### 4. **Docker y Docker Compose**

* Orquestación de servicios:

  * Contenedor del frontend
  * Contenedor del backend
  * Contenedor para `authDB`
  * Contenedor para `crudDB`
* Facilita la ejecución local o el despliegue en la nube

---

## 🔄 Flujo de datos

```
[Usuario] ⇄ [Frontend React] ⇄ [API Express]
                               ⇅
          [authDB (usuarios)] / [crudDB (tareas)]
```

---

## 🛡️ Seguridad y buenas prácticas

* Autenticación basada en **JWT** (tokens firmados)
* Encriptación de contraseñas con **bcrypt**
* Protección de rutas privadas
* CORS configurado para restringir orígenes permitidos

---

## 📦 Ventajas de esta arquitectura

* **Modularidad**: permite modificar componentes sin afectar el resto
* **Escalabilidad**: servicios pueden escalarse individualmente
* **Despliegue simplificado**: Docker unifica y simplifica la ejecución
* **Separación lógica de datos**: una base para usuarios, otra para tareas

