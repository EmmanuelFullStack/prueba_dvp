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
        <div className="container mx-auto p-4 md:p-8">
            <h2 className="text-2xl font-bold mb-6 text-primary">Mis Deudas</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="flex flex-wrap items-center space-x-2 mb-4">
                <select
                    onChange={(e) => setFilter(e.target.value)}
                    className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                >
                    <option value="all">Todas</option>
                    <option value="pending">Pendientes</option>
                    <option value="paid">Pagadas</option>
                </select>
                <select
                    value={exportFormat}
                    onChange={(e) => setExportFormat(e.target.value)}
                    className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                >
                    <option value="json">JSON</option>
                    <option value="csv">CSV</option>
                </select>
                <button onClick={handleExport} className="bg-green-500 hover:bg-green-600 text-white p-2 rounded transition duration-300">Exportar Deudas</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDebts.map((debt) => (
                    <div key={debt.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">
                        <Link to={`/debt/${debt.id}`} className="text-lg font-semibold hover:text-secondary">
                            {debt.description}
                        </Link>
                        <p className="text-gray-600">${debt.amount} {debt.paid ? '(Pagada)' : '(Pendiente)'}</p>
                        {!debt.paid && (
                            <Link to={`/debt/${debt.id}/edit`} className="text-blue-500 hover:underline mt-2">Editar</Link>
                        )}
                    </div>
                ))}
            </div>
            <Link to="/debt/new" className="bg-primary hover:bg-secondary text-white p-2 rounded inline-block mt-6 transition duration-300">Nueva Deuda</Link>
        </div>
    );
}

export default DebtList;