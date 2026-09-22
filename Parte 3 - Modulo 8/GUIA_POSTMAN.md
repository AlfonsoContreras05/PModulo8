# Guía de evidencias Postman — M8
1. POST `/usuarios` con `{"nombre":"Alfonso M8","email":"alfonso.m8@example.com","password":"Curso2026"}` → 201.
2. POST `/auth/login` con email/password anteriores → 200 y copiar `data.token`.
3. PUT `/usuarios/:id` sin token → 401.
4. PUT `/usuarios/:id` con Authorization > Bearer Token → 200.
5. POST `/upload` con Bearer Token; Body > form-data; key `archivo` tipo File; PNG/JPG/PDF <5 MB → 201.
6. Upload con extensión inválida o >5 MB → 400/413.
7. Capturar URL, método, request y respuesta de cada prueba.
