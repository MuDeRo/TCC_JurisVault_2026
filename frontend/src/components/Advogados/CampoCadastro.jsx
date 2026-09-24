import React, { useState } from 'react';

export default function CampoCadastro({ setAdvogadoCadastrado }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (setAdvogadoCadastrado) {
      setAdvogadoCadastrado({ nome, email, senha });
    }
    alert(`Advogado ${nome} cadastrado com sucesso! Utilize o email e senha no login.`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Nome Completo</label>
        <input type="text" required value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Dr. Nome Exemplo" />
      </div>
      <div className="form-group">
        <label>E-mail Profissional</label>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="advogado@email.com" />
      </div>
      <div className="form-group">
        <label>Senha de Acesso</label>
        <input type="password" required value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="••••••••" />
      </div>
      <button type="submit" className="btn-primary">Finalizar Cadastro</button>
    </form>
  );
}