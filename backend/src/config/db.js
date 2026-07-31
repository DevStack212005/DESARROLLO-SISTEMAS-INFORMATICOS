const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.on('connect', () => {
  console.log('Conexión establecida con Supabase');
});

pool.on('error', (error) => {
  console.error('Error en la conexión con PostgreSQL:', error);
});

module.exports = pool;