const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const logger = require('../config/logger');

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) throw new Error('Email y password requeridos');
        const existingUser = await User.findByEmail(email);
        if (existingUser) throw new Error('Usuario ya existe');
        const user = await User.create(email, password);
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        logger.info(`Usuario registrado: ${email}`);
        res.status(201).json({ token, user: { id: user.id, email: user.email } });
    } catch (error) {
        logger.error(`Error en registro: ${error.message}`);
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Credenciales inválidas');
        }
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        logger.info(`Login exitoso: ${email}`);
        res.json({ token, user: { id: user.id, email: user.email } });
    } catch (error) {
        logger.error(`Error en login: ${error.message}`);
        res.status(401).json({ error: error.message });
    }
};