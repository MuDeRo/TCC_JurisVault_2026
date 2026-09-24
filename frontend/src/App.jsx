import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Páginas Públicas (Sem barra lateral / Layout próprio)
import CampoPaginaAdm from './pages/PaginaInicial/CampoPaginaAdm';
import LoginAdvogados from './pages/LoginAdvogados/LoginAdvogados';
import CadastroAdvogados from './pages/CadastroAdvogados/CadastroAdvogados';
import Administradores from './pages/Administradores/Administradores';

// Páginas Internas do Sistema (Com barra lateral)
import PainelAdministrativo from './pages/PainelAdministrativo/PainelAdministrativo';
import Processos from './pages/Processos/Processos';
import CadastroProcesso from './pages/Processos/CadastroProcesso';
import Clientes from './pages/Processos/Clientes';
import Documentos from './pages/Processos/Documentos';
import Prazos from './pages/Processos/Prazos';

import Layout from './components/layoutPagina/layout';

export default function App() {
  return (
    <Routes>
      {/* ROTAS PÚBLICAS */}
      <Route path="/" element={<CampoPaginaAdm />} />
      <Route path="/login" element={<LoginAdvogados />} />
      <Route path="/cadastro" element={<CadastroAdvogados />} />
      <Route path="/administrador" element={<Administradores />} />

      {/* ROTAS INTERNAS DO SISTEMA (Acessíveis dentro do Layout) */}
      <Route element={<Layout />}>
        <Route path="/inicio" element={<Processos />} />
        <Route path="/painel-administrativo" element={<PainelAdministrativo />} />
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