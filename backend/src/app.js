const express = require('express');
const cors = require('cors');
require('dotenv').config();

const ticketRoutes = require('./routes/ticket.routes');
const pool = require('./config/db');

const app = express();

const origenesPermitidos = [
  'http://localhost:5173',
  'https://desarrollo-sistemas-informaticos-26.vercel.app'
];


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origenesPermitidos.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origen no permitido por CORS: ${origin}`));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
  })
);

app.get('/', (req, res) => {
  res.status(200).json({
    mensaje: 'API Help Desk funcionando correctamente'
  });
});

app.use('/tickets', ticketRoutes);

app.use((req, res) => {
  res.status(404).json({
    mensaje: 'Ruta no encontrada'
  });
});

app.use((error, req, res, next) => {
  console.error(error);

  res.status(500).json({
    mensaje: 'Error interno del servidor'
  });
});

const PORT = process.env.PORT || 3000;

const iniciarServidor = async () => {
  try {
    await pool.query('SELECT NOW()');

    console.log('Conexión con PostgreSQL establecida correctamente');

    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('No se pudo conectar con PostgreSQL:', error.message);
    process.exit(1);
  }
};

iniciarServidor();