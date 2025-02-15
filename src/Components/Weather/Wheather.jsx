import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

// Creamos el componente principal de la aplicación
const WeatherApp = () => {
    // Definimos los estados para manejar la ciudad ingresada, el clima, errores y la carga
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Guardamos la API Key en una variable de entorno para mayor seguridad
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

    // Construimos la URL de la API utilizando la ciudad ingresada
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`;

    // Creamos la función que obtiene los datos del clima
    const fetchWeather = async () => {
        if (!city) {
            // Si no se ingresa una ciudad, mostramos un mensaje de error
            setError("Por favor ingresa una ciudad.");
            return;
        }

        // Reiniciamos los estados antes de realizar la petición
        setError("");
        setWeather(null);
        setLoading(true);

        try {
            // Hacemos la petición a la API
            const response = await axios.get(API_URL);
            setWeather(response.data); // Guardamos los datos obtenidos
        } catch (err) {
            // Manejamos los posibles errores de la API
            if (err.response && err.response.status === 404) {
                setError("Ciudad no encontrada. Intenta otra.");
            } else {
                setError("Error al obtener datos. Verifica tu conexión.");
            }
        } finally {
            // Finalizamos el estado de carga
            setLoading(false);
        }
    };

    return (
        // Definimos el contenedor principal con diseño responsive
        <div className="flex flex-col justify-center items-center h-screen bg-black text-white px-6">
            {/* Creamos un contenedor animado usando framer-motion */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-zinc-900 p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-md md:max-w-lg lg:max-w-2xl text-center border border-gray-700"
            >
                {/* Mostramos el título de la aplicación */}
                <h1 className="text-3xl lg:text-4xl font-semibold text-gray-100 mb-6">
                    ☁️ Clima en tu Ciudad
                </h1>

                {/* Creamos un campo de entrada y un botón de búsqueda */}
                <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-2 bg-gray-800 p-3 rounded-xl">
                    <input
                        type="text"
                        placeholder="Ingresa una ciudad"
                        className="flex-1 bg-transparent text-white placeholder-gray-400 px-4 py-2 outline-none text-lg"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <button
                        className="px-6 py-2 md:py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-300 text-lg"
                        onClick={fetchWeather}
                    >
                        Buscar
                    </button>
                </div>

                {/* Mostramos los mensajes de error si los hay */}
                {error && <p className="text-red-400 mt-4">{error}</p>}

                {/* Mostramos un indicador de carga mientras se obtienen los datos */}
                {loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                        className="mt-6 flex justify-center"
                    >
                        <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    </motion.div>
                )}

                {/* Mostramos la información del clima si la petición fue exitosa */}
                {weather && !loading && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="mt-6 p-6 bg-gray-800 rounded-xl shadow-lg flex flex-col md:flex-row md:items-center md:justify-between"
                    >
                        {/* Mostramos la información del clima en texto */}
                        <div className="text-left">
                            <h2 className="text-3xl font-bold">{weather.name}</h2>
                            <p className="text-2xl mt-2">🌡️ {weather.main.temp}°C</p>
                            <p className="text-xl mt-1">🌤️ {weather.weather[0].description}</p>
                        </div>

                        {/* Mostramos un ícono del clima proporcionado por la API */}
                        <div className="mt-4 md:mt-0">
                            <img
                                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                alt="weather icon"
                                className="w-24 h-24"
                            />
                        </div>
                    </motion.div>
                    
                )}
            </motion.div>
            <p className="mt-4 text-gray-400">Created by Juan Sanchez</p>

        </div>
    );
};

export default WeatherApp;
