import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CampoFormulario() {
  const navigate = useNavigate();

  const handleLoginDirect = (e) => {
    e.preventDefault();
    
    // Força entrada Mock
    localStorage.setItem('token', 'mock-token-admin');
    localStorage.setItem('user', JSON.stringify({ nome: 'Admin', perfil: 'Admin' }));
    
    navigate('/administradores');
  };

  return (
    <form onSubmit={handleLoginDirect}>
      <input type="email" defaultValue="admin@jurisvault.com" />
      <input type="password" defaultValue="12345" />
      <button type="submit">ENTRAR NO SISTEMA</button>
    </form>
  );
}