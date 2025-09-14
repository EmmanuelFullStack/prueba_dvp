require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('./config/logger');
const errorHandler = require('./middleware/errorHandler');
const { connectDB } = require('./config/database');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Conectar a la base de datos
connectDB()
    .then(() => {
        logger.info('Conexión a PostgreSQL establecida');
    })
    .catch(err => {
        logger.error('Error al conectar a la base de datos:', err);
        process.exit(1);
    });


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Servidor iniciado en puerto ${PORT}`);
});