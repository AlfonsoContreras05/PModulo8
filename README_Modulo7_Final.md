# Proyecto Integrador JS - Módulo 7

Backend desarrollado con **Node.js, Express, PostgreSQL y Sequelize** para demostrar acceso a datos, CRUD, consultas filtradas, ORM, relaciones y transacciones.

## Tecnologías
- Node.js + Express
- PostgreSQL
- Sequelize
- dotenv
- nodemon

## Estructura
- `config/`: conexión a base de datos.
- `models/`: modelos Sequelize y asociaciones.
- `routes/`: definición de endpoints.
- `controllers/`: manejo de solicitudes y respuestas.
- `services/`: lógica de acceso a datos.
- `middlewares/`: manejo transversal y errores.

## Configuración
1. Instalar dependencias con `npm install`.
2. Crear `.env` a partir de `.env.example`.
3. Configurar las credenciales de PostgreSQL.
4. Iniciar el proyecto con el script definido en `package.json` (por ejemplo, `npm run dev`).

> El archivo `.env` contiene datos sensibles y no debe subirse al repositorio.

## Endpoints verificados
| Método | Ruta | Función |
|---|---|---|
| GET | `/usuarios` | Lista usuarios |
| GET | `/usuarios?nombre=Juan` | Filtra por nombre |
| POST | `/usuarios` | Crea usuario |
| GET | `/usuarios/:id` | Usuario + pedidos |
| PUT | `/usuarios/:id` | Actualiza campos permitidos |
| DELETE | `/usuarios/:id` | Elimina usuario |
| GET | `/usuarios/sql` | Consulta mediante SQL manual |
| POST | `/usuarios/transaccion` | Crea usuario + pedido en una transacción |
| POST | `/usuarios/transaccion?error=true` | Fuerza error para demostrar rollback |

## Formato de respuesta
Las respuestas siguen una estructura consistente:

```json
{
  "status": "success",
  "message": "Mensaje descriptivo",
  "data": {}
}
```

## Seguridad de datos
Las respuestas de usuarios excluyen `password`. La conexión utiliza variables de entorno.

## ORM y SQL manual
El proyecto utiliza Sequelize para el CRUD y las relaciones. Además incluye una consulta SQL manual con `sequelize.query` para comparar ambos enfoques.

## Relación
Un usuario puede tener muchos pedidos. La consulta de detalle utiliza `include` para recuperar la relación.

## Transacciones
La demostración transaccional crea un usuario y un pedido como una sola unidad. Si se fuerza un error antes de crear el pedido, la operación se revierte y el usuario tampoco queda persistido.

## Evidencias
Las capturas de Postman de la entrega deben demostrar GET, POST, PUT, DELETE, filtro, relación, SQL manual, transacción exitosa y rollback.
