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
        <div className="container mx-auto p-4">
            <h1 className="text-3xl mb-4">Dashboard de Deudas</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <p><strong>Total Pagadas:</strong> ${summary.totalPagadas}</p>
            <p><strong>Saldo Pendiente:</strong> ${summary.saldoPendiente}</p>
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
            <Link to="/debts" className="bg-blue-500 text-white p-2 mt-4 inline-block">Ver Deudas</Link>
        </div>
    );
}

export default Home;