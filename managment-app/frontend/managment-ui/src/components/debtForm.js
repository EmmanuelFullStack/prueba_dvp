import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { debtService } from '../services/api';

function DebtForm() {
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchDebt = async () => {
                try {
                    const res = await debtService.getById(id);
                    const { amount, description } = res.data;
                    setAmount(amount);
                    setDescription(description);
                } catch (err) {
                    setError(err.response?.data?.error || 'Error cargando deuda');
                }
            };
            fetchDebt();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await debtService.update(id, amount, description);
            } else {
                await debtService.create(amount, description);
            }
            navigate('/debts');
        } catch (err) {
            setError(err.response?.data?.error || 'Error guardando deuda');
        }
    };

    return (
        <div className="container mx-auto p-4 md:p-8">
            <h2 className="text-2xl font-bold mb-6 text-primary">{id ? 'Editar Deuda' : 'Nueva Deuda'}</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                    placeholder="Monto"
                    className="mb-4 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-secondary"
                    required
                    min="1"
                />
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descripción"
                    className="mb-4 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-secondary"
                    required
                />
                <button type="submit" className="bg-green-500 hover:bg-green-600 text-white p-2 rounded w-full transition duration-300">Guardar</button>
            </form>
        </div>
    );
}

export default DebtForm;