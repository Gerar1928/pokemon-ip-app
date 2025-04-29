const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const port = 3000;

let serverIP = 'Obteniendo IP...';

// Obtener IP pública al inicio
async function fetchServerIP() {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    serverIP = response.data.ip;
    console.log(`IP pública detectada: ${serverIP}`);
  } catch (error) {
    console.error('Error al obtener la IP pública:', error.message);
  }
}

// Llamar a la función al inicio
fetchServerIP();

// Servir archivos estáticos
app.use(express.static('public'));

// Endpoint que devuelve la IP del servidor
app.get('/api/ip', (req, res) => {
  res.json({ ip: serverIP });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
