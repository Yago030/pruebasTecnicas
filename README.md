# appgoal

Una pequeña app de prueba para usar la api brindada para la prueba tecnica
## Descripción

- Este proyecto es una aplicación de prueba donde los usuarios pueden iniciar sesión. Si las credenciales son proporcionadas, se les permite acceder a los datos de los sistemas.

- En caso de ingresar mal la ruta, se lo redirige a /systems o /login dependiendo de su autenticación de inicio de sesión.

- También se pueden ver todos los sistemas y divisas operadas y desplegar el valor de estos (trend).

- Es importante tener en cuenta que al acceder a la API, el objetivo "amount" era indispensable para ver el valor de la divisa actual. Sin embargo, no era posible obtenerlo, lo que resultó en el uso de la variable "trend" para poder utilizarlo como ejemplo.

- Puedes desplegar u ocultar el valor de trend.

- Se puede cerrar sesión desde el propio botón superior.

## Configuración
para poder instalar todas las utilidades y bibliotecas utiles
npm install axios@^1.6.7 next@14.1.0 react@^18 react-dom@^18 react-router-dom@^6.22.2


## Uso de la API

Debido a la falta de CORS en la API que utilizamos, necesitamos usar un servidor proxy para realizar solicitudes desde el navegador. Utilizamos [http://cors-anywhere.herokuapp.com/corsdemo](http://cors-anywhere.herokuapp.com/corsdemo) como servidor proxy.
Debes correr el servidor en local antes de usarlo.

## Contribuciones

Informacion obtenida de chat gpt, foros y videos de youtube para poder llevarlo a cabo, si bien fue llevado en una version anterior de next, no me dio tiempo para la migracion del mismo, desde ya, gracias por la oportunidad brindada.


