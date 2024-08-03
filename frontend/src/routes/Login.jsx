import React from 'react';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // Asegúrate de que esta ruta sea correcta
import logo from '../assets/logo_universidad_negro.png'; // Importar la imagen

function Login() {
  const navigate = useNavigate();

  if (localStorage.getItem('user')) {
    return (
      <div className="login-page">
        <div className="login-message">
          <h2 className="login-header">Ya estás logeado!</h2>
          <button onClick={() => navigate('/')} className="navigate-button">Ir a home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-content">
        <div className="login-container">
          <img src={logo} alt="Logo" className="login-logo" /> {/* Usar la imagen importada */}
          <h2 className="login-header">Inicia sesión</h2>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login;
