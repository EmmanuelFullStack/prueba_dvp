# DVP Management Application

## Descripción
Esta aplicación web, desarrollada como parte de la prueba técnica para Double V Partners, es una herramienta de gestión de deudas que permite a los usuarios registrarse, iniciar sesión, crear, editar, eliminar y marcar deudas como pagadas. Incluye funcionalidades avanzadas como resúmenes financieros, exportación de deudas en formatos JSON y CSV, y un diseño moderno y responsive. La aplicación está dividida en un backend (Node.js con Express) y un frontend (React), con una base de datos PostgreSQL para almacenar los datos.

## Características
- **Autenticación**: Registro e inicio de sesión con JWT.
- **Gestión de Deudas**: Crear, editar, eliminar y marcar deudas como pagadas.
- **Resumen Financiero**: Vista de total pagado y saldo pendiente.
- **Exportación**: Descarga de deudas en JSON y CSV.
- **Diseño Responsive**: Interfaz adaptable a móviles, tablets y desktops.
- **Seguridad**: Middleware de autenticación y manejo de errores.

## Tecnologías Utilizadas
- **Backend**: Node.js, Express, PostgreSQL, pg, bcrypt, dotenv, winston.
- **Frontend**: React, React Router, Axios, Tailwind CSS.
- **Herramientas**: npm, Git.


## Instalación

### Requisitos Previos
- Node.js (versión 20.x o superir recomendada)
- npm (viene con Node.js)
- PostgreSQL (versión 12 o superior)

### Pasos de Instalación

1. **Clonar el Repositorio**
   
   git clone https://github.com/EmmanuelFullStack/prueba_dvp.git
   cd managment-app

   Abrir pgAdmin y conectar con su servidor y ejecutar las siguientes sentencias:
   CREATE DATABASE debt_management_test;

\connect debt_management;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE debts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL CHECK (amount > 0),
    description TEXT NOT NULL,
    paid BOOLEAN DEFAULT FALSE
);

# Instalación de dependencias
cd backend
npm install
configurar archivo .env de acuerdo a su servidor: 
DB_USER=
DB_HOST=
DB_NAME= debt_management
DB_PASSWORD=
DB_PORT=

cd ../frontend/managment-ui
npm install

# Iniciar aplicación
cd backend
npm start

cd ../frontend/managment-ui
npm start

# Ejecución de pruebas unitarias - backend
cd backend
npm test

# Uso

Registro: Visita /register para crear una cuenta.
Inicio de Sesión: Usa /login para autenticarte.
Gestión de Deudas: Navega a /debts para ver, editar o eliminar deudas, y usa /debt/new para crear nuevas.
Resumen: La página principal (/) muestra el resumen financiero.
Exportación: Exporta deudas en JSON o CSV desde / o /debts con el botón "Exportar Deudas".
Cerrar Sesión: Haz clic en "Cerrar Sesión" en el header de las páginas protegidas.