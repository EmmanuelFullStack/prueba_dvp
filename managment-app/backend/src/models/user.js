const { pool } = require('../config/database');
const bcrypt = require('bcrypt');

class User {
    static async create(email, password) {
        const hashedPassword = await bcrypt.hash(password, 12); // Salto de 12 para seguridad
        const result = await pool.query(
            'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
            [email, hashedPassword]
        );
        return result.rows[0];
    }

    static async findByEmail(email) {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    }
}

module.exports = User;