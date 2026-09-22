# TP Integrador JavaScript — Módulo 8 ❤️
API RESTful con Node.js, Express, PostgreSQL y Sequelize, ampliada con JWT, bcrypt y carga segura de archivos.

## Ejecutar
1. `npm install`
2. Configurar `.env` usando `.env.example`.
3. `npm run dev`
4. Abrir `http://localhost:3000`.

## Endpoints
- GET `/status`
- GET/POST `/usuarios`
- GET `/usuarios/:id`
- PUT `/usuarios/:id` — requiere JWT
- DELETE `/usuarios/:id` — requiere JWT
- GET `/usuarios/sql`
- POST `/usuarios/transaccion`
- POST `/auth/login`
- POST `/upload` — requiere JWT; form-data `archivo`; máximo 5 MB

## JWT
Login con email/password. En rutas protegidas usar `Authorization: Bearer <token>`. El secreto y expiración se configuran en `.env`.

## Upload
Permite JPG, JPEG, PNG, WEBP y PDF. Los archivos se renombran y almacenan en `uploads/`.

## Arquitectura
`routes` define endpoints, `controllers` procesa HTTP, `services` contiene lógica, `models` representa la BD y `middlewares` concentra JWT, upload, logs y errores.

## Respuestas
Se mantiene el formato `{ status, message, data }` y códigos HTTP 200/201/400/401/404/413/500.
