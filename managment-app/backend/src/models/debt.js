const { pool } = require('../config/database');
const cache = require('../config/cache');

class Debt {
    static async create(userId, amount, description) {
        if (amount <= 0) throw new Error('El monto no puede ser negativo o cero');
        const result = await pool.query(
            'INSERT INTO debts (user_id, amount, description, paid) VALUES ($1, $2, $3, false) RETURNING *',
            [userId, amount, description]
        );
        cache.del(`debts_${userId}`);
        return result.rows[0];
    }

    static async getByUserId(userId) {
        const cacheKey = `debts_${userId}`;
        let debts = cache.get(cacheKey);
        if (debts) return debts;

        const result = await pool.query('SELECT * FROM debts WHERE user_id = $1 ORDER BY id DESC', [userId]);
        debts = result.rows;
        console.log("Debts fetched from DB:", debts); // Debugging line

        cache.set(cacheKey, debts);
        return debts;
    }

    static async getById(id, userId) {
        const result = await pool.query('SELECT * FROM debts WHERE id = $1 AND user_id = $2', [id, userId]);
        return result.rows[0];
    }

    static async update(id, userId, amount, description) {
        const debt = await this.getById(id, userId);
        if (!debt) throw new Error('Deuda no encontrada');
        if (debt.paid) throw new Error('Las deudas pagadas no pueden ser modificadas');
        if (amount <= 0) throw new Error('El monto no puede ser negativo o cero');
        const result = await pool.query(
            'UPDATE debts SET amount = $1, description = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
            [amount, description, id, userId]
        );
        cache.del(`debts_${userId}`);
        return result.rows[0];
    }

    static async delete(id, userId) {
        const debt = await this.getById(id, userId);
        if (!debt) throw new Error('Deuda no encontrada');
        if (debt.paid) throw new Error('Las deudas pagadas no pueden ser eliminadas');
        await pool.query('DELETE FROM debts WHERE id = $1 AND user_id = $2', [id, userId]);
        cache.del(`debts_${userId}`);
    }

    static async markAsPaid(id, userId) {
        const debt = await this.getById(id, userId);
        if (!debt) throw new Error('Deuda no encontrada');
        if (debt.paid) throw new Error('La deuda ya está pagada');
        await pool.query('UPDATE debts SET paid = true WHERE id = $1 AND user_id = $2', [id, userId]);
        cache.del(`debts_${userId}`);
    }
}

module.exports = Debt;