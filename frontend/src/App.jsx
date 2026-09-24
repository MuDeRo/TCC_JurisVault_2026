import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layout Global
import Layout from './components/layoutPagina/layout';

// Páginas Públicas (SEM menu lateral)
import LoginAdvogados from './pages/LoginAdvogados/LoginAdvogados';
import CadastroAdvogados from './pages/CadastroAdvogados/CadastroAdvogados';
import CampoPaginaAdm from './pages/PaginaInicial/CampoPaginaAdm';
import Administradores from './pages/Administradores/Administradores';

// Páginas Internas do Advogado (COM menu lateral)
import PainelAdministrativo from './pages/PainelAdministrativo/PainelAdministrativo';
import Processos from './pages/Processos/Processos';
import CadastroProcesso from './pages/Processos/CadastroProcesso';
import Clientes from './pages/Processos/Clientes';
import Documentos from './pages/Processos/Documentos';
import Prazos from './pages/Processos/Prazos';

export default function App() {
  return (
    <Routes>
      {/* 1. TELAS PÚBLICAS */}
      <Route path="/" element={<LoginAdvogados />} />
      <Route path="/login" element={<LoginAdvogados />} />
      <Route path="/login-admin" element={<CampoPaginaAdm />} />
      <Route path="/cadastro" element={<CadastroAdvogados />} />
      <Route path="/administradores" element={<Administradores />} />

      {/* 2. ÁREA LOGADA DO ADVOGADO */}
      <Route element={<Layout />}>
        <Route path="/painel" element={<PainelAdministrativo />} />
        <Route path="/processos" element={<Processos />} />
        <Route path="/processos/novo" element={<CadastroProcesso />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/documentos" element={<Documentos />} />
        <Route path="/prazos" element={<Prazos />} />
      </Route>

      {/* Redirecionamento padrão */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}