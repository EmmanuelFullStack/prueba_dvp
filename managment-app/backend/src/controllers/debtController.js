const Debt = require('../models/debt');
const logger = require('../config/logger');

exports.create = async (req, res) => {
    try {
        const { amount, description } = req.body;
        const debt = await Debt.create(req.user.id, amount, description);
        logger.info(`Deuda creada para usuario ${req.user.id}`);
        res.status(201).json(debt);
    } catch (error) {
        logger.error(`Error creando deuda: ${error.message}`);
        res.status(400).json({ error: error.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        const debts = await Debt.getByUserId(req.user.id);
        res.json(debts);
    } catch (error) {
        logger.error(`Error listando deudas: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const debt = await Debt.getById(req.params.id, req.user.id);
        if (!debt) return res.status(404).json({ error: 'Deuda no encontrada' });
        res.json(debt);
    } catch (error) {
        logger.error(`Error obteniendo deuda: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { amount, description } = req.body;
        const debt = await Debt.update(req.params.id, req.user.id, amount, description);
        logger.info(`Deuda actualizada: ${req.params.id}`);
        res.json(debt);
    } catch (error) {
        logger.error(`Error actualizando deuda: ${error.message}`);
        res.status(400).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        await Debt.delete(req.params.id, req.user.id);
        logger.info(`Deuda eliminada: ${req.params.id}`);
        res.status(204).send();
    } catch (error) {
        logger.error(`Error eliminando deuda: ${error.message}`);
        res.status(400).json({ error: error.message });
    }
};

exports.markAsPaid = async (req, res) => {
    try {
        await Debt.markAsPaid(req.params.id, req.user.id);
        logger.info(`Deuda marcada como pagada: ${req.params.id}`);
        res.status(200).json({ message: 'Deuda pagada' });
    } catch (error) {
        logger.error(`Error marcando deuda como pagada: ${error.message}`);
        res.status(400).json({ error: error.message });
    }
};

exports.exportDebts = async (req, res) => {
    try {
        const debts = await Debt.getByUserId(req.user.id);
        const format = req.query.format || 'json'; // Default a JSON si no se especifica

        if (format === 'csv') {
            const csv = [
                'id,description,amount,paid',
                ...debts.map(debt => `${debt.id},${debt.description},${debt.amount},${debt.paid}`),
            ].join('\n');
            res.setHeader('Content-Disposition', 'attachment; filename=deudas.csv');
            res.set('Content-Type', 'text/csv');
            res.send(csv);
        } else {
            res.setHeader('Content-Disposition', 'attachment; filename=deudas.json');
            res.set('Content-Type', 'application/json');
            res.send(JSON.stringify(debts, null, 2));
        }
    } catch (error) {
        logger.error(`Error exportando deudas: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

exports.getSummary = async (req, res) => {
    try {
        const debts = await Debt.getByUserId(req.user.id);
        const totalPagadas = debts.filter(d => d.paid).reduce((sum, d) => sum + parseFloat(d.amount), 0);
        const saldoPendiente = debts.filter(d => !d.paid).reduce((sum, d) => sum + parseFloat(d.amount), 0);
        res.json({ totalPagadas, saldoPendiente });
    } catch (error) {
        logger.error(`Error en resumen de deudas: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};