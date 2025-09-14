import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <header className="bg-gradient-purple-turquoise text-white p-4 shadow-md">
            <div className="container mx-auto flex flex-wrap items-center justify-between">
                <Link to="/" className="text-2xl font-bold flex items-center space-x-2">
                    <span>Double V Partners NYX</span>
                </Link>
                <nav className="flex space-x-4 mt-2 md:mt-0">
                    <Link to="/" className="hover:underline">Inicio</Link>
                    <Link to="/debts" className="hover:underline">Deudas</Link>
                    <Link to="/debt/new" className="hover:underline">Nueva Deuda</Link>
                </nav>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300 mt-2 md:mt-0"
                >
                    Cerrar Sesión
                </button>
            </div>
        </header>
    );
}

export default Header;