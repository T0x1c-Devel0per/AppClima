# WeatherApp - Consulta de Clima con OpenWeatherMap

## Descripción
WeatherApp es un componente de React que permite a los usuarios ingresar el nombre de una ciudad y obtener información sobre el clima en tiempo real utilizando la API de OpenWeatherMap.

## Tecnologías Utilizadas
- React 19
- Axios para las solicitudes HTTP
- Tailwind CSS para los estilos

## Instalación y Configuración
### 1. Clonar el Repositorio
```sh
git clone https://github.com/tu-usuario/weather-app.git
cd weather-app
```

### 2. Instalar Dependencias
```sh
npm install
```

### 3. Configurar API Key
Obtener una clave API de OpenWeatherMap y reemplazar `TU_API_KEY` en el archivo `WeatherApp.jsx`:
```js
const API_KEY = "TU_API_KEY";
```

### 4. Ejecutar la Aplicación
```sh
npm run dev
```

## Estructura del Componente

### 📌 Estados del Componente
- `city`: Guarda el nombre de la ciudad ingresada por el usuario.
- `weather`: Almacena los datos del clima recibidos de la API.
- `error`: Permite mostrar mensajes de error en caso de problemas.

### 🔹 Funcionalidad Principal
- Validación: Verifica que el usuario ingrese una ciudad.
- Llamada a la API con `axios.get(API_URL)`.
- Manejo de errores: Responde a errores 404 (ciudad no encontrada) y fallos de conexión.
- Actualización del estado para mostrar los datos del clima.

## UI - Interfaz de Usuario

### 🌍 Entrada de Texto
```jsx
<input type="text" placeholder="Ingresa una ciudad" className="p-2 rounded-md text-black" value={city} onChange={(e) => setCity(e.target.value)} />
```

### 🔘 Botón de Búsqueda
```jsx
<button className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-md text-white" onClick={fetchWeather}>Obtener Clima</button>
```

### ⚠️ Mensaje de Error
```jsx
{error && <p className="text-red-500 mt-2">{error}</p>}
```

### 🌦️ Información del Clima
```jsx
{weather && (
  <div className="mt-4 p-4 bg-gray-800 rounded-lg">
    <h2 className="text-xl font-bold">{weather.name}</h2>
    <p>🌡️ {weather.main.temp}°C</p>
    <p>☀️ {weather.weather[0].description}</p>
  </div>
)}
```

## Estilos
Se usa **Tailwind CSS** para un diseño moderno, minimalista y responsive.

## Licencia
Este proyecto está bajo la licencia MIT.

---
✅ **Desarrollado con React y Tailwind CSS**

