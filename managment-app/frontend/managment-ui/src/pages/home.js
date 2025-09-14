import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { debtService } from '../services/api';

function Home() {
    const [summary, setSummary] = useState({ totalPagadas: 0, saldoPendiente: 0 });
    const [error, setError] = useState('');
    const [exportFormat, setExportFormat] = useState('json');

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const res = await debtService.getSummary();
                setSummary(res.data);
            } catch (err) {
                setError(err.response?.data?.error || 'Error cargando resumen');
            }
        };
        fetchSummary();
    }, []);

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
            <h1 className="text-3xl font-bold mb-6 text-primary">Dashboard de Deudas</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <p className="text-lg font-semibold">Total Pagadas:</p>
                    <p className="text-2xl text-secondary">${summary.totalPagadas}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <p className="text-lg font-semibold">Saldo Pendiente:</p>
                    <p className="text-2xl text-secondary">${summary.saldoPendiente}</p>
                </div>
            </div>
            <div className="flex flex-wrap items-center space-x-2 mb-4">
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
            <Link to="/debts" className="bg-primary hover:bg-secondary text-white p-2 rounded inline-block transition duration-300">Ver Deudas</Link>
        </div>
    );
}

export default Home;