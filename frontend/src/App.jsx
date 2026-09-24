import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import CampoPaginaAdm from './pages/PaginaInicial/CampoPaginaAdm';
import LoginAdvogados from './pages/LoginAdvogados/LoginAdvogados';
import CadastroAdvogados from './pages/CadastroAdvogados/CadastroAdvogados';
import Administradores from './pages/Administradores/Administradores';
import PainelAdministrativo from './pages/PainelAdministrativo/PainelAdministrativo';

import Processos from './pages/Processos/Processos';
import CadastroProcesso from './pages/Processos/CadastroProcesso';
import Clientes from './pages/Processos/Clientes';
import Documentos from './pages/Processos/Documentos';
import Prazos from './pages/Processos/Prazos';

export default function App() {
  return (
    <Routes>
      
      <Route path="/" element={<CampoPaginaAdm />} />
      <Route path="/inicio" element={<CampoPaginaAdm />} />
      <Route path="/cadastro" element={<CadastroAdvogados />} />
      <Route path="/login" element={<LoginAdvogados />} />
      <Route path="/painel-administrativo" element={<PainelAdministrativo />} />
      <Route path="/administrador" element={<Administradores />} />
      <Route path="/processos" element={<Processos />} />
      <Route path="/novo-caso" element={<CadastroProcesso />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/documentos" element={<Documentos />} />
      <Route path="/prazos" element={<Prazos />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}