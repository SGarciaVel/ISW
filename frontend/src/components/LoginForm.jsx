import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../services/auth.service';
import '../styles/LoginForm.css';

function LoginForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data).then(() => {
      navigate('/');
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
      <label className="form-label">Email</label>
      <input
        name="email"
        type="email"
        {...register('email', { required: true })}
        className="form-input"
      />
      {errors.email && <span className="error-message">Este campo es obligatorio</span>}

      <label className="form-label">Password</label>
      <input
        type="password"
        name="password"
        {...register('password', { required: true })}
        className="form-input"
      />
      {errors.password && <span className="error-message">Este campo es obligatorio</span>}

      <button type="submit" className="submit-button">Login</button>
    </form>
  );
}

export default LoginForm;