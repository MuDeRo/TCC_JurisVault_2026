import React, { useState, useRef } from 'react';
import api from '../../services/api.js';
import './Documentos.css';

function Documentos() {
  const [arquivo, setArquivo] = useState(null);
  const [descricao, setDescricao] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState({ texto: '', tipo: '' });
  const fileInputRef = useRef(null);

  const processFile = (file) => {
    setArquivo(file);
    if (!descricao) {
      setDescricao(file.name);
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) processFile(selectedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) processFile(droppedFile);
  };

  const handleUpload = async (e) => {
    if (e) e.preventDefault();
    if (!arquivo) {
      setMensagem({ texto: 'Selecione um documento primeiro.', tipo: 'erro' });
      return;
    }

    setCarregando(true);
    setMensagem({ texto: '', tipo: '' });

    const formData = new FormData();
    formData.append('arquivo', arquivo);
    formData.append('descricao_arquivo', descricao);

    try {
      await api.post('/arquivos', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMensagem({ texto: 'Documento enviado com sucesso!', tipo: 'sucesso' });
      setArquivo(null);
      setDescricao('');
    } catch (error) {
      console.error('Erro no upload:', error);
      setMensagem({
        texto: error.response?.data?.message || 'Erro ao enviar o documento.',
        tipo: 'erro',
      });
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="card-painel-dash documentos-container">
      <div className="documentos-header">
        <div>
          <h2 className="titulo-secao">Documentos</h2>
          <p className="subtitulo-secao">Organize os documentos dos processos.</p>
        </div>
        <button
          type="button"
          className="btn-enviar-doc"
          onClick={handleUpload}
          disabled={carregando || !arquivo}
        >
          {carregando ? 'Enviando...' : '↑ Enviar documento'}
        </button>
      </div>

      <form onSubmit={handleUpload} className="form-upload-doc">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          style={{ display: 'none' }}
        />

        <div
          className={`dropzone-box ${isDragging ? 'drag-active' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="dropzone-icon">📄</div>
          {arquivo ? (
            <div className="arquivo-selecionado">
              <p className="nome-arquivo">
                <strong>Arquivo selecionado:</strong> {arquivo.name}
              </p>
              <span className="tamanho-arquivo">
                ({(arquivo.size / 1024 / 1024).toFixed(2)} MB)
              </span>
            </div>
          ) : (
            <>
              <p className="dropzone-titulo">Arraste ou selecione um documento</p>
              <p className="dropzone-formatos">PDF, DOC, DOCX, JPG ou PNG</p>
            </>
          )}
        </div>

        {arquivo && (
          <div className="grupo-input total-width input-descricao-doc">
            <label htmlFor="descricao_arquivo">Descrição do Arquivo (Max 150 chars)</label>
            <input
              type="text"
              id="descricao_arquivo"
              maxLength="150"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Ex: Procuração assinada do Requerente"
              required
            />
          </div>
        )}

        {mensagem.texto && (
          <div className={`mensagem-alerta ${mensagem.tipo}`}>
            {mensagem.texto}
          </div>
        )}
      </form>
    </div>
  );
}

export default Documentos;