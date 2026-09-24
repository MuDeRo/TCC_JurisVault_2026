import React from 'react';

export default function CampoLogin({ label, tipo, valor, aoMudar }) {
  return (
    <div className="campo-login-grupo">
      <label className="campo-login-label">{label}</label>
      <input
        type={tipo}
        value={valor}
        onChange={aoMudar}
        className="campo-login-input"
        placeholder={tipo === 'email' ? 'advogado@jurisvault.com.br' : '••••••••'}
        required
      />
    </div>
  );
}