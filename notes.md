# Fullstack E-Commerce: Ruby on Rails 7, Hotwire, Tailwind, Stripe, PostgreSQL

https://www.youtube.com/watch?v=hURUMwdCWuI&t=261s&ab_channel=ConnerJensen

Main Features:

- Auth
- Admin Product Management System
- Admin dashboard w/Chart.js graph
- User storefront
- Local storage based Cart
- User Checkout w/Stripe

Github: https://github.com/connerj70/ecomm

---

email: admin@example.com
password: password

---

To avoid issues with `./bin/dev`, simply execute `rails tailwindcss:build` before starting your Rails server. This ensures that the Tailwind CSS styles will be properly applied when your server is running.

---

Solucione el problema de que no se veian las imagenes en miniatura en el index actualizando ubuntu e instalando libvips

---

Después de hacer cambios importantes en la configuración de Tailwind o actualizar gemas relacionadas con assets, puede ser útil ejecutar estos comandos.
Forzar la recompilación de assets:
- Ejecuta `rails assets:clobber` para limpiar los assets precompilados.
- Luego ejecuta `rails assets:precompile` para recompilar todos los assets.

---

npm Chart.js https://www.npmjs.com/package/chart.js?activeTab=readme

bin/importmap pin chart.js

stimulus rails https://stimulus.hotwired.dev/handbook/origin

---
- En ancho 640, 768, 1240 se ve perfecto pero en pantalla completa queda mucho margen vacio a la derecha y a la izquierda
---


- Llegue al minuto 00:31:50 trabajando en categorias
- Llegue al minuto 01:09:25 trabajando en productos
- Llegue al minuto 01:26:02 trabajando en orders
- Llegue al minuto 01:48:31
- 2024-09-15 20:00hs Llegue al minuto 02:15:23 / 05:14:50 trabajando en dashboard
- 2024-09-16 22:01hs Llegue al minuto 02:35:14 / 05:14:50 trabajando en Home & Admin Home
- 2024-09-17 18:53hs Llegue al minuto 03:05:27 / 05:14:50 category show page OK
- 2024-09-18 20:23hs Llegue al minuto 03:22:17 / 05:14:50 'working on products controller & show'
- 2024-09-18 20:23hs Llegue al minuto 04:03:46 / 05:14:50 'stripe OK'

---

# Stripe Test Data

Use this information to fill out the Stripe checkout form for testing purposes:

## Card Information
- Card Number: 4242 4242 4242 4242
  (This is a Stripe test card number that will always succeed)
- Expiration Date: Any future date (e.g., 12/25)
- CVC: Any 3 digits (e.g., 123)

## Personal Information
- Name: John Doe
- Email: johndoe@example.com

## Billing Address
- Address: 123 Test Street
- City: Testville
- State/Province: Test State
- ZIP/Postal Code: 12345
- Country: United States

## Phone
- Phone Number: (555) 555-5555

Remember, for testing in Stripe's test mode:
- Any future date can be used for the expiration date
- Any 3-digit number can be used for the CVC
- Any valid-format postal code can be used (e.g., 12345 for US)


