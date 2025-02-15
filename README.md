📌 Componente WeatherApp - Consulta de Clima con OpenWeatherMap
Este componente de React permite a los usuarios ingresar el nombre de una ciudad y obtener información sobre el clima en tiempo real utilizando la API de OpenWeatherMap.

🔹 Importaciones necesarias
jsx
Copiar
Editar
import { useState } from "react";
import axios from "axios";
useState: Hook de React que permite gestionar el estado del componente.
axios: Librería para realizar solicitudes HTTP de manera sencilla y eficiente.
🔹 Definición del Componente
jsx
Copiar
Editar
const WeatherApp = () => {
Se define un componente funcional llamado WeatherApp, que contendrá toda la lógica y la interfaz del buscador de clima.

🔹 Estados del Componente
jsx
Copiar
Editar
const [city, setCity] = useState("");
const [weather, setWeather] = useState(null);
const [error, setError] = useState("");
Se utilizan tres estados para manejar la información en la aplicación:

city: Guarda el nombre de la ciudad ingresada por el usuario.
weather: Almacena los datos del clima recibidos de la API.
error: Permite mostrar mensajes de error en caso de problemas.
🔹 Configuración de la API
jsx
Copiar
Editar
const API_KEY = "TU_API_KEY"; 
const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`;
API_KEY: Aquí se debe colocar la clave de acceso proporcionada por OpenWeatherMap.
API_URL: Se genera dinámicamente la URL de consulta, incluyendo:
q=${city} → Busca la ciudad ingresada.
appid=${API_KEY} → Usa la clave de API.
units=metric → Muestra la temperatura en grados Celsius.
lang=es → Obtiene la descripción del clima en español.
🔹 Función para obtener el clima
jsx
Copiar
Editar
const fetchWeather = async () => {
Se define una función asíncrona para obtener los datos de la API.

1️⃣ Validación del Campo
jsx
Copiar
Editar
if (!city) {
  setError("Por favor ingresa una ciudad.");
  return;
}
Si el usuario no ingresa nada, se muestra un mensaje de error y la función se detiene.

2️⃣ Restablecimiento de Datos
jsx
Copiar
Editar
setError("");
setWeather(null);
Antes de hacer la solicitud, se limpia cualquier error anterior y se borra la información previa del clima.

3️⃣ Llamada a la API y Manejo de Errores
jsx
Copiar
Editar
try {
  const response = await axios.get(API_URL);
  setWeather(response.data);
} catch (err) {
  if (err.response && err.response.status === 404) {
    setError("Ciudad no encontrada. Intenta otra.");
  } else {
    setError("Error al obtener datos. Verifica tu conexión.");
  }
}
Se usa axios.get(API_URL) para obtener los datos.
Si la solicitud es exitosa, los datos del clima se guardan en setWeather(response.data).
Si ocurre un error:
Error 404 → La ciudad no existe, se muestra un mensaje.
Otro error → Puede ser una falla en la conexión o en la API.
🔹 Estructura del Componente (Interfaz)
jsx
Copiar
Editar
return (
  <div className="flex flex-col items-center p-6 bg-gray-900 text-white rounded-lg shadow-lg">
Se usa Tailwind CSS para dar estilo al contenedor principal con una apariencia moderna y profesional.

📍 Entrada de texto para la ciudad
jsx
Copiar
Editar
<input
  type="text"
  placeholder="Ingresa una ciudad"
  className="p-2 rounded-md text-black"
  value={city}
  onChange={(e) => setCity(e.target.value)}
/>
Un campo input donde el usuario puede escribir la ciudad.
Usa onChange para actualizar el estado city en tiempo real.
📍 Botón para obtener el clima
jsx
Copiar
Editar
<button
  className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-md text-white"
  onClick={fetchWeather}
>
  Obtener Clima
</button>
Al hacer clic, se ejecuta fetchWeather para obtener los datos.
Tiene un efecto hover para mejorar la experiencia de usuario.
📍 Mensaje de error (si aplica)
jsx
Copiar
Editar
{error && <p className="text-red-500 mt-2">{error}</p>}
Si error contiene algún mensaje, se muestra en pantalla con un estilo en rojo.

📍 Información del clima (si aplica)
jsx
Copiar
Editar
{weather && (
  <div className="mt-4 p-4 bg-gray-800 rounded-lg">
    <h2 className="text-xl font-bold">{weather.name}</h2>
    <p>🌡️ {weather.main.temp}°C</p>
    <p>🌤️ {weather.weather[0].description}</p>
  </div>
)}
Si weather tiene datos, se muestra:

Nombre de la ciudad.
Temperatura actual con un icono.
Descripción del clima en español.
🔹 Exportación del Componente
jsx
Copiar
Editar
export default WeatherApp;
Permite que WeatherApp pueda ser utilizado en otros archivos de la aplicación.

🎯 Resumen
✅ Usa React con useState para gestionar la ciudad, los datos del clima y los errores.
✅ Hace peticiones a OpenWeatherMap con axios de manera asíncrona.
✅ Maneja errores como ciudad inexistente o problemas de conexión.
✅ Usa Tailwind CSS para un diseño limpio y responsive.
