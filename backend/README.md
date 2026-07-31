# Sistema de Gestión de Incidentes - Backend

Backend desarrollado con **Node.js**, **Express** y **PostgreSQL** para el Sistema de Gestión de Incidentes (Help Desk). La aplicación expone una API REST que permite gestionar incidentes mediante operaciones CRUD.

---

# Tecnologías utilizadas

- Node.js
- Express.js
- PostgreSQL
- pg
- dotenv
- cors
- Nodemon

---

# Estructura del proyecto

```
backend/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── ticket.controller.js
│   │
│   ├── routes/
│   │   └── ticket.routes.js
│   │
│   └── app.js
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

# Instalación

## 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
```

Ingresar al proyecto

```bash
cd backend
```

---

## 2. Instalar dependencias

```bash
npm install
```

---

## 3. Configurar las variables de entorno

Crear un archivo `.env` en la raíz del proyecto.

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=help_desk
DB_USER=postgres
DB_PASSWORD=TU_CONTRASEÑA
```

---

## 4. Crear la base de datos

```sql
CREATE DATABASE help_desk;
```

---

## 5. Crear la tabla

```sql
CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    categoria VARCHAR(20) NOT NULL,
    prioridad VARCHAR(10) NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'Abierto',

    CONSTRAINT chk_categoria
        CHECK (categoria IN ('Red', 'Hardware', 'Software')),

    CONSTRAINT chk_prioridad
        CHECK (prioridad IN ('Alta', 'Media', 'Baja')),

    CONSTRAINT chk_estado
        CHECK (estado IN ('Abierto', 'En Progreso', 'Cerrado'))
);
```

---

# Ejecutar el proyecto

Modo desarrollo

```bash
npm run dev
```

Modo producción

```bash
npm start
```

Servidor

```
http://localhost:3000
```

---

# Endpoints disponibles

## Obtener todos los tickets

```
GET /tickets
```

---

## Obtener un ticket por ID

```
GET /tickets/:id
```

---

## Registrar un ticket

```
POST /tickets
```

Ejemplo

```json
{
    "titulo": "Error de red",
    "descripcion": "No existe conexión a Internet.",
    "categoria": "Red",
    "prioridad": "Alta",
    "estado": "Abierto"
}
```

---

## Actualizar un ticket

```
PUT /tickets/:id
```

Ejemplo

```json
{
    "titulo": "Error de red",
    "descripcion": "Se reemplazó el cable de red.",
    "categoria": "Red",
    "prioridad": "Media",
    "estado": "En Progreso"
}
```

---

## Eliminar un ticket

```
DELETE /tickets/:id
```

---

# Respuestas HTTP

| Código | Descripción |
|---------|-------------|
| 200 | Solicitud realizada correctamente |
| 201 | Registro creado correctamente |
| 400 | Datos inválidos |
| 404 | Ticket no encontrado |
| 500 | Error interno del servidor |

---

# Pruebas

La API fue probada utilizando **Postman**, verificando el correcto funcionamiento de las operaciones:

- Obtener todos los tickets.
- Obtener un ticket por ID.
- Registrar un nuevo ticket.
- Actualizar un ticket existente.
- Eliminar un ticket.

---

# Autor

Desarrollado por **Damian Jesus** para la asignatura **Desarrollo de Sistemas Informáticos** de la Universidad Técnica de Manabí.

---

# Licencia

Proyecto desarrollado con fines académicos.