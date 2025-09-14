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

    if (!debt) return <p>Cargando...</p>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">Detalle de Deuda</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <p><strong>Descripción:</strong> {debt.description}</p>
            <p><strong>Monto:</strong> ${debt.amount}</p>
            <p><strong>Estado:</strong> {debt.paid ? 'Pagada' : 'Pendiente'}</p>
            {!debt.paid && (
                <>
                    <button onClick={handleMarkPaid} className="bg-blue-500 text-white p-2 mr-2">Marcar como Pagada</button>
                    <button onClick={handleDelete} className="bg-red-500 text-white p-2">Eliminar</button>
                </>
            )}
        </div>
    );
}

export default DebtDetail;