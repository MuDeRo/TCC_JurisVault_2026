import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Página Pública de Entrada (Portal com os 3 cartões)
import CampoPaginaAdm from './pages/PaginaInicial/CampoPaginaAdm';
import LoginAdvogados from './pages/LoginAdvogados/LoginAdvogados';
import CadastroAdvogados from './pages/CadastroAdvogados/CadastroAdvogados';

// Páginas Internas do Sistema
import PainelAdministrativo from './pages/PainelAdministrativo/PainelAdministrativo';
import Administradores from './pages/Administradores/Administradores';
import Processos from './pages/Processos/Processos';
import CadastroProcesso from './pages/Processos/CadastroProcesso';
import Clientes from './pages/Processos/Clientes';
import Documentos from './pages/Processos/Documentos';
import Prazos from './pages/Processos/Prazos';

import Layout from './components/layoutPagina/layout';

export default function App() {
  return (
    <Routes>
      {/* ROTAS PÚBLICAS (Sem barra lateral) */}
      <Route path="/" element={<CampoPaginaAdm />} />
      <Route path="/login" element={<LoginAdvogados />} />
      <Route path="/cadastro" element={<CadastroAdvogados />} />

      {/* ROTAS INTERNAS DO SISTEMA (Com barra lateral) */}
      <Route element={<Layout />}>
        <Route path="/inicio" element={<PainelAdministrativo />} />
        <Route path="/painel-administrativo" element={<PainelAdministrativo />} />
        <Route path="/administrador" element={<Administradores />} />
        <Route path="/processos" element={<Processos />} />
        <Route path="/novo-caso" element={<CadastroProcesso />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/documentos" element={<Documentos />} />
        <Route path="/prazos" element={<Prazos />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}