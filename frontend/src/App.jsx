import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importação das páginas
import Home from './pages/PaginaInicial/Home';
import LoginAdvogados from './pages/LoginAdvogados/LoginAdvogados';
import CadastroAdvogados from './pages/CadastroAdvogados/CadastroAdvogados';
import Administradores from './pages/Administradores/Administradores';
import PainelAdministrativo from './pages/PainelAdministrativo/PainelAdministrativo';
import CadastroProcesso from './pages/Processos/CadastroProcesso';

export default function App() {
  return (
    <Routes>
      {/* Rota Principal */}
      <Route path="/" element={<Home />} />

      {/* Autenticação e Cadastro */}
      <Route path="/login-advogado" element={<LoginAdvogados />} />
      <Route path="/cadastrar-advogado" element={<CadastroAdvogados />} />
      <Route path="/login-admin" element={<Administradores />} />

      {/* Painel do Sistema (Dashboard) */}
      <Route path="/painel" element={<PainelAdministrativo />} />
      <Route path="/painel-admin" element={<PainelAdministrativo />} />

      {/* Módulos do Sistema */}
      <Route path="/cadastrar-processo" element={<CadastroProcesso />} />

      {/* Rota Fallback (Redireciona URLs desconhecidas para a Home) */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}