const User = require('../models/User');
const Debt = require('../models/debt');
const { pool } = require('../config/database');

describe('Modelo Debt', () => {
    let userId;

    beforeAll(async () => {
        // Limpia la tabla users y crea un usuario de prueba
        await pool.query('DELETE FROM users');
        const user = await User.create('test2@example.com', 'password123');
        userId = user.id;
        // Limpia la tabla debts
        await pool.query('DELETE FROM debts');
    });

    afterAll(async () => {
        await pool.end(); // Cierra la conexión después de las pruebas
    });

    it('debe crear una deuda con monto positivo', async () => {
        const amount = 120;
        const description = 'Deuda de test';
        const debt = await Debt.create(userId, amount, description);
        expect(parseFloat(debt.amount)).toBe(amount);
        expect(debt.description).toBe(description);
        expect(debt.paid).toBe(false);
    });

    it('debe fallar al crear deuda con monto negativo', async () => {
        await expect(Debt.create(userId, -50, 'Deuda inválida')).rejects.toThrow('El monto no puede ser negativo o cero');
    });
});