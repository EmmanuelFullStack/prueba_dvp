import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await authService.register(email, password);
            localStorage.setItem('token', res.data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Error en el registro');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-purple-turquoise p-4">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center text-primary">Registro</h2>
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="mb-4 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-secondary"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    className="mb-4 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-secondary"
                    required
                />
                <button type="submit" className="bg-primary hover:bg-secondary text-white p-2 rounded w-full transition duration-300">Registrarse</button>
                <p className="text-center mt-4">
                    ¿Ya tienes cuenta? <Link to="/login" className="text-secondary hover:underline">Iniciar Sesión</Link>
                </p>
            </form>
        </div>
    );
}

export default Register;