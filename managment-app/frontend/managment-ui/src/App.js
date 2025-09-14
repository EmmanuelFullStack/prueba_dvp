import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Home from './pages/home';
import DebtList from './components/debtList';
import DebtForm from './components/debtForm';
import DebtDetail from './components/debtDetail';
import Header from './components/header';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const PrivateLayout = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute><PrivateLayout><Home /></PrivateLayout></PrivateRoute>} />
        <Route path="/debts" element={<PrivateRoute><PrivateLayout><DebtList /></PrivateLayout></PrivateRoute>} />
        <Route path="/debt/new" element={<PrivateRoute><PrivateLayout><DebtForm /></PrivateLayout></PrivateRoute>} />
        <Route path="/debt/:id" element={<PrivateRoute><PrivateLayout><DebtDetail /></PrivateLayout></PrivateRoute>} />
        <Route path="/debt/:id/edit" element={<PrivateRoute><PrivateLayout><DebtForm /></PrivateLayout></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;