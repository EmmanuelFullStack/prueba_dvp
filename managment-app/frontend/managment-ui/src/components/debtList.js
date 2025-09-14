import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { debtService } from '../services/api';

function DebtList() {
    const [debts, setDebts] = useState([]);
    const [filter, setFilter] = useState('all');
    const [error, setError] = useState('');
    const [exportFormat, setExportFormat] = useState('json');

    useEffect(() => {
        const fetchDebts = async () => {
            try {
                const res = await debtService.getAll();
                setDebts(res.data);
            } catch (err) {
                setError(err.response?.data?.error || 'Error cargando deudas');
            }
        };
        fetchDebts();
    }, []);

    const filteredDebts = debts.filter((d) => {
        if (filter === 'pending') return !d.paid;
        if (filter === 'paid') return d.paid;
        return true;
    });

    const handleExport = async () => {
        try {
            const res = await debtService.exportDebts(exportFormat);
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const a = document.createElement('a');
            a.href = url;
            a.download = `deudas.${exportFormat}`;
            a.click();
        } catch (err) {
            setError(err.response?.data?.error || 'Error exportando deudas');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">Mis Deudas</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <select
                onChange={(e) => setFilter(e.target.value)}
                className="mb-4 p-2 border rounded"
            >
                <option value="all">Todas</option>
                <option value="pending">Pendientes</option>
                <option value="paid">Pagadas</option>
            </select>
            <ul className="list-disc pl-5">
                {filteredDebts.map((debt) => (
                    <li key={debt.id} className="py-2 flex justify-between">
                        <Link to={`/debt/${debt.id}`}>{debt.description} - ${debt.amount} {debt.paid ? '(Pagada)' : '(Pendiente)'}</Link>
                        {!debt.paid && <Link to={`/debt/${debt.id}/edit`} className="text-blue-500 ml-4">Editar</Link>}
                    </li>
                ))}
            </ul>
            <div className="mt-4">
                <select
                    value={exportFormat}
                    onChange={(e) => setExportFormat(e.target.value)}
                    className="mb-4 p-2 border rounded mr-2"
                >
                    <option value="json">JSON</option>
                    <option value="csv">CSV</option>
                </select>
                <button onClick={handleExport} className="bg-green-500 text-white p-2 inline-block">Exportar Deudas</button>
            </div>
            <Link to="/debt/new" className="bg-blue-500 text-white p-2 mt-4 inline-block">Nueva Deuda</Link>
        </div>
    );
}

export default DebtList;