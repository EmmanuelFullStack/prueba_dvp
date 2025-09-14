require('dotenv').config();
const express = require('express');
const logger = require('./config/logger');
const errorHandler = require('./middleware/errorHandler');
const { connectDB } = require('./config/database');
const authRoutes = require('./routes/auth');
const debtRoutes = require('./routes/debts');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(errorHandler);

// Conectar a la base de datos
connectDB()
    .then(() => {
        logger.info('Conexión a PostgreSQL establecida');
    })
    .catch(err => {
        logger.error('Error al conectar a la base de datos:', err);
        process.exit(1);
    });

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/debts', debtRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    logger.info(`Servidor iniciado en puerto ${PORT}`);
});