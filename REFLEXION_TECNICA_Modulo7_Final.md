# Reflexión técnica - Módulo 7

## ¿Por qué se utilizó Sequelize?
Sequelize permite representar las tablas mediante modelos JavaScript y simplifica operaciones CRUD, relaciones y transacciones. El proyecto también incluye SQL manual para comparar ambos enfoques.

## ¿Cómo se protegen los datos sensibles?
Las credenciales de conexión se almacenan en variables de entorno mediante `.env`. Además, las respuestas de usuarios excluyen el campo `password`.

## ¿Por qué se actualizan solo ciertos campos?
La actualización utiliza una lista permitida (`nombre`, `email`, `activo`). Esto evita que una petición modifique campos que no deberían cambiarse directamente, como `id`, `password` o las fechas administradas por el sistema.

## ¿Qué validaciones se aplicaron?
Se comprueba la presencia de `nombre`, `email` y `password` al crear usuarios. Para actualización y eliminación se valida que el ID corresponda a un usuario existente. Los errores se procesan mediante el flujo de manejo de errores de Express.

## ¿Qué ventaja tiene el ORM frente a SQL manual?
El ORM reduce código repetitivo y facilita trabajar con modelos y relaciones. SQL manual entrega control directo sobre la consulta. La implementación de ambos permite observar sus diferencias.

## Relaciones
Se implementó una relación de un usuario a muchos pedidos. Sequelize permite obtener el usuario y sus pedidos mediante `include`.

## Transacciones y rollback
La operación transaccional crea un usuario y un pedido. Si ocurre un error entre ambas operaciones, Sequelize revierte la transacción completa. La prueba con `?error=true` demuestra que no queda persistido un usuario incompleto.

## Conclusión
El módulo permitió evolucionar el backend hacia persistencia real con PostgreSQL, manteniendo una arquitectura modular mediante rutas, controladores, servicios y modelos. El CRUD, las relaciones y las transacciones dejan una base preparada para la etapa posterior de API REST y autenticación.
