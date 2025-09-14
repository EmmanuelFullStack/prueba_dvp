const logger = require('../config/logger');

module.exports = (err, req, res, next) => {
    logger.error(`${err.message} - ${req.method} ${req.url}`);
    res.status(500).json({ error: 'Error interno del servidor' });
};