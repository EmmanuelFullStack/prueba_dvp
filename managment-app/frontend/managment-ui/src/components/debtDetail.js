import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { debtService } from '../services/api';

function DebtDetail() {
    const [debt, setDebt] = useState(null);
    const [error, setError] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDebt = async () => {
            try {
                const res = await debtService.getById(id);
                setDebt(res.data);
            } catch (err) {
                setError(err.response?.data?.error || 'Error cargando deuda');
            }
        };
        fetchDebt();
    }, [id]);

    const handleMarkPaid = async () => {
        try {
            await debtService.markAsPaid(id);
            navigate('/debts');
        } catch (err) {
            setError(err.response?.data?.error || 'Error marcando como pagada');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('¿Seguro que quieres eliminar?')) {
            try {
                await debtService.delete(id);
                navigate('/debts');
            } catch (err) {
                setError(err.response?.data?.error || 'Error eliminando deuda');
            }
        }
    };

    if (!debt) return <p className="text-center text-gray-500">Cargando...</p>;

    return (
        <div className="container mx-auto p-4 md:p-8">
            <h2 className="text-2xl font-bold mb-6 text-primary">Detalle de Deuda</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
                <p className="mb-2"><strong>Descripción:</strong> {debt.description}</p>
                <p className="mb-2"><strong>Monto:</strong> ${debt.amount}</p>
                <p className="mb-4"><strong>Estado:</strong> {debt.paid ? 'Pagada' : 'Pendiente'}</p>
                {!debt.paid && (
                    <div className="flex space-x-2">
                        <button onClick={handleMarkPaid} className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition duration-300 flex-1">Marcar como Pagada</button>
                        <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded transition duration-300 flex-1">Eliminar</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DebtDetail;