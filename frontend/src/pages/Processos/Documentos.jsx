import React, { useRef } from 'react';
import './Documentos.css';

export default function Documentos() {
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      console.log('Ficheiros selecionados para upload:', files);
      alert(`${files.length} ficheiro(s) selecionado(s). Pronto para conectar com o backend!`);
    }
  };

  return (
    <div className="docs-container">
      {/* Header */}
      <div className="docs-header">
        <h1>Gestão de Documentos e Arquivos</h1>
        <p>Anexe, gira e organize as petições, contratos e documentos dos seus clientes.</p>
      </div>

      {/* Área de Upload */}
      <div className="upload-dropzone" onClick={() => fileInputRef.current?.click()}>
        <div className="upload-icon">📁</div>
        <h3 className="upload-title">Clique para carregar ou arraste os seus ficheiros aqui</h3>
        <p className="upload-subtitle">Suporta arquivos PDF, DOCX, PNG, JPG (até 25MB)</p>
        <button type="button" className="btn-select-file">
          Selecionar Ficheiro
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          style={{ display: 'none' }}
          multiple
        />
      </div>
    </div>
  );
}