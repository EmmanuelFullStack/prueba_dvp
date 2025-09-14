const User = require('../models/User');
const bcrypt = require('bcrypt');
const { pool } = require('../config/database');

describe('Modelo User', () => {
    beforeAll(async () => {
        await pool.query('DELETE FROM users WHERE email = $1', ['test@example.com']);
    });

    it('debe crear un usuario con password encriptado', async () => {
        const user = await User.create('test@example.com', 'password123');
        expect(user.email).toBe('test@example.com');
        expect(await bcrypt.compare('password123', (await User.findByEmail('test@example.com')).password)).toBe(true);
    });

    afterAll(async () => {
        await pool.end();
    });
});