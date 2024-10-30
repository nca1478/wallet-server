# Wallet App Server v1.0

## Descripción

Aplicación con servicio soap y servicio rest que simula una billetera virtual. El sistema debe poder registrar un cliente, cargar dinero a la billetera, hacer una compra con un código de confirmación y consultar el saldo de la billetera.

## Características

- Endpoints para gestionar Usuarios.
- Endpoints para gestionar Clientes.
- Endpoints para gestionar Ordenes.
- Endpoints para gestionar Billeteras.
- Sesiones generadas con JSON Web Tokens.
- Modelos y Base de Datos en Postgres.
- ORM de Base de Datos: Typeorm.
- Envío de Notificaciones por Email a través de Nodemailer.

## Propósito del Proyecto

- Prueba técnica al cargo de Desarrollador Backend en Nodejs.

## Tech Stack

- Javascript.
- Typescript.
- NodeJS.
- ExpressJS.
- Postgres.
- Typeorm.
- Soap.

## Requerimientos

- Nodejs v20.12.0.
- PostgreSQL 16.
- Postman v11.
- Soap 1.1.5

## Instalación

## Configuración de Variables de entorno

- Renombrar .env.template a .env.
- Agregar las credenciales al .env.

## Crear base de datos

- Crear base de datos vacía en cualquier administrador de db.
- Colocar el nombre que se especifica en el .env (DB_NAME).

## Instalar Dependencias

- Ejecutar el comando: `npm install`

## Ejecutar Aplicación

- Ejecutar el comando: `npm run dev`

## Pruebas de Endpoints con Postman

- Importar endpoints y variables de entorno de la carpeta postman.

## Archivo de entrada

> src/index.ts
