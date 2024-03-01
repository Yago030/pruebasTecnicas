# appgoal

Una pequeña app de prueba para usar la api brindada para la prueba tecnica
## Descripción

Este proyecto es una aplicación de prueba donde los usuarios pueden iniciar sesión. Si las credenciales son proporcionadas, se les permite acceder a los datos de los sistemas.
En caso que ingrese mal la ruta se lo reedirige a /systems o /login dependiendo de su autenticacion de logueo
tambien se pueden ver todos los sitemas y divisas operadas y desplegar el valor de estos (trend)
Es importante tener en cuenta que al acceder a la API, el objetivo "amount" era indispensable para ver el valor de la divisa actual. Sin embargo, no era posible obtenerlo, lo que resulto en el uso de la variable "trend" para poder usar de ejemplo.
## Configuración
para poder instalar todas las utilidades y bibliotecas utiles
npm install axios@^1.6.7 next@14.1.0 react@^18 react-dom@^18 react-router-dom@^6.22.2


## Uso de la API

Debido a la falta de CORS en la API que utilizamos, necesitamos usar un servidor proxy para realizar solicitudes desde el navegador. Utilizamos [http://cors-anywhere.herokuapp.com/corsdemo](http://cors-anywhere.herokuapp.com/corsdemo) como servidor proxy.
Debes correr el servidor en local antes de usarlo.

## Contribuciones

Sque info de chat gpt y varios foros mas


