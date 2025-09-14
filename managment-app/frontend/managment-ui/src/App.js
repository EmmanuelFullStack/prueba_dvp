import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Home from './pages/home';
import DebtList from './components/debtList';
import DebtForm from './components/debtForm';
import DebtDetail from './components/debtDetail';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/debts" element={<PrivateRoute><DebtList /></PrivateRoute>} />
        <Route path="/debt/new" element={<PrivateRoute><DebtForm /></PrivateRoute>} />
        <Route path="/debt/:id" element={<PrivateRoute><DebtDetail /></PrivateRoute>} />
        <Route path="/debt/:id/edit" element={<PrivateRoute><DebtForm /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;