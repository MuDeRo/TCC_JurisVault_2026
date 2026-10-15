import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout
import Layout from './components/layoutPagina/layout.jsx';

// Páginas
import Home from './pages/PaginaInicial/Home.jsx';
import LoginAdvogados from './pages/LoginAdvogados/LoginAdvogados.jsx';
import Processos from './pages/Processos/Processos.jsx';
import Documentos from './pages/Processos/Documentos.jsx';
import Prazos from './pages/Processos/Prazos.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginAdvogados />} />

        {/* Rotas com Layout */}
        <Route path="/painel" element={<Layout><Processos /></Layout>} />
        <Route path="/processos" element={<Layout><Processos /></Layout>} />
        <Route path="/documentos" element={<Layout><Documentos /></Layout>} />
        <Route path="/prazos" element={<Layout><Prazos /></Layout>} />
      </Routes>
    </Router>
  );
}