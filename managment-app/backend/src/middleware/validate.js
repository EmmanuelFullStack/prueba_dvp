module.exports.validateDebt = (req, res, next) => {
    const { amount, description } = req.body;
    if (typeof amount !== 'number' || amount <= 0) return res.status(400).json({ error: 'El monto debe ser positivo' });
    if (!description || typeof description !== 'string' || description.trim() === '') return res.status(400).json({ error: 'Descripción requerida' });
    next();
};