import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { UploadCloud, FileText, Trash2, Download, Paperclip } from 'lucide-react';
import './Documentos.css';

export default function Documentos() {
  const fileInputRef = useRef(null);

  // Estados de seleção
  const [casos, setCasos] = useState([]);
  const [etapas, setEtapas] = useState([]);
  const [idCasoSelecionado, setIdCasoSelecionado] = useState('');
  const [idEtapaSelecionada, setIdEtapaSelecionada] = useState('');
  const [descricao, setDescricao] = useState('');

  // Estados dos documentos
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // 1. Busca todos os Casos ao carregar a tela
  useEffect(() => {
    async function carregarCasos() {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8080/casos', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCasos(Array.isArray(res.data) ? res.data : (res.data.data || []));
      } catch (error) {
        console.error('Erro ao carregar casos:', error);
      }
    }
    carregarCasos();
  }, []);

  // 2. Busca as Etapas do Caso selecionado
  useEffect(() => {
    if (!idCasoSelecionado) {
      setEtapas([]);
      setIdEtapaSelecionada('');
      setDocumentos([]);
      return;
    }

    async function carregarEtapas() {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:8080/etapas/caso/${idCasoSelecionado}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEtapas(Array.isArray(res.data) ? res.data : (res.data.data || []));
      } catch (error) {
        console.error('Erro ao carregar etapas:', error);
      }
    }
    carregarEtapas();
  }, [idCasoSelecionado]);

  // 3. Busca os arquivos vinculados à Etapa selecionada
  // 3. Busca os arquivos vinculados à Etapa selecionada
  const carregarDocumentosEtapa = async (idEtapa) => {
    if (!idEtapa) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      // Busca vínculos e lista de arquivos
      const [resVinculos, resArquivos] = await Promise.all([
        axios.get('http://localhost:8080/etapasArquivos', { headers }),
        axios.get('http://localhost:8080/arquivos', { headers })
      ]);

      // Trata tanto respostas diretas em array quanto respostas encapsuladas em .data
      const vinculos = Array.isArray(resVinculos.data) 
        ? resVinculos.data 
        : (resVinculos.data?.data || []);

      const todosArquivos = Array.isArray(resArquivos.data) 
        ? resArquivos.data 
        : (resArquivos.data?.data || []);

      console.log('Vínculos:', vinculos);
      console.log('Todos os Arquivos:', todosArquivos);

      // Filtra vínculos aceitando 'id_etapa' ou 'id_etapa_fk'
      const vinculosDaEtapa = vinculos.filter(
        v => String(v.id_etapa ?? v.id_etapa_fk) === String(idEtapa)
      );

      // Mapeia os arquivos correspondentes aceitando 'id_arquivo' ou 'id_arquivo_fk'
      const arquivosFiltrados = vinculosDaEtapa.map(vinc => {
        const idArq = vinc.id_arquivo ?? vinc.id_arquivo_fk;
        const arq = todosArquivos.find(a => Number(a.id) === Number(idArq));

        return {
          idVinculo: vinc.id,
          idArquivo: arq?.id || idArq,
          vinculo_arquivo: arq?.vinculo_arquivo || '',
          descricao_arquivo: arq?.descricao_arquivo || 'Sem descrição'
        };
      });

      setDocumentos(arquivosFiltrados);
    } catch (error) {
      console.error('Erro ao carregar documentos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEtapaChange = (e) => {
    const id = e.target.value;
    setIdEtapaSelecionada(id);
    if (id) {
      carregarDocumentosEtapa(id);
    } else {
      setDocumentos([]);
    }
  };

  // 4. Fluxo de Upload em 2 passos (POST /arquivos -> POST /etapas-arquivos)
  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!idEtapaSelecionada) {
      alert('Selecione uma Etapa antes de enviar o arquivo!');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setUploading(true);
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      // PASSO 1: Envia o arquivo para a tabela 'arquivos'
      const formData = new FormData();
      formData.append('arquivos', file); // Nome do campo esperado pelo uploadFiles
      formData.append('descricao_arquivo', descricao || file.name);

      const resArquivo = await axios.post('http://localhost:8080/arquivos', formData, {
        headers: { ...headers, 'Content-Type': 'multipart/form-data' }
      });


      // Obtém o ID a partir de resArquivo.data.data.insertId
      const idNovoArquivo =
        resArquivo.data?.data?.insertId ||
        resArquivo.data?.id ||
        resArquivo.data?.insertId;

      if (!idNovoArquivo) {
        throw new Error('Não foi possível obter o ID do arquivo retornado pelo servidor.');
      }

      // PASSO 2: Cria o vínculo na tabela 'etapas_arquivos'
      await axios.post('http://localhost:8080/etapasArquivos', {
        id_etapa_fk: Number(idEtapaSelecionada),
        id_arquivo_fk: Number(idNovoArquivo)
      }, { headers });

      alert('Arquivo anexado com sucesso à etapa!');
      setDescricao('');
      await carregarDocumentosEtapa(idEtapaSelecionada);

    } catch (error) {
      console.error('Erro no fluxo de upload:', error);
      alert('Erro ao realizar o upload do documento.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // 5. Exclusão do vínculo / arquivo
  const handleDeletar = async (doc) => {
    if (!window.confirm('Deseja realmente remover este arquivo da etapa?')) return;

    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      // Remove da tabela 'etapas_arquivos'
      if (doc.idVinculo) {
        await axios.delete(`http://localhost:8080/etapasArquivos/${doc.idVinculo}`, { headers });
      }

      // Remove do cadastro de 'arquivos'
      if (doc.idArquivo) {
        await axios.delete(`http://localhost:8080/arquivos/${doc.idArquivo}`, { headers });
      }

      await carregarDocumentosEtapa(idEtapaSelecionada);
    } catch (error) {
      console.error('Erro ao deletar arquivo:', error);
      alert('Erro ao excluir o arquivo.');
    }
  };

  return (
    <div className="docs-container">
      <div className="docs-header">
        <h1>Gestão de Documentos e Arquivos</h1>
        <p>Anexe e vincule arquivos às etapas dos processos do seu sistema.</p>
      </div>

      {/* Seletores de Caso e Etapa */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '220px' }}>
          <label style={{ fontWeight: '600', marginBottom: '5px', display: 'block' }}>1. Selecione o Caso:</label>
          <select
            value={idCasoSelecionado}
            onChange={(e) => setIdCasoSelecionado(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          >
            <option value="">-- Escolha um Caso --</option>
            {casos.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome_caso || c.titulo || `Caso #${c.id}`}
              </option>
            ))}
          </select>
        </div>

        <div style={{ flex: 1, minWidth: '220px' }}>
          <label style={{ fontWeight: '600', marginBottom: '5px', display: 'block' }}>2. Selecione a Etapa:</label>
          <select
            value={idEtapaSelecionada}
            onChange={handleEtapaChange}
            disabled={!idCasoSelecionado}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          >
            <option value="">-- Escolha uma Etapa --</option>
            {etapas.map((e) => (
              <option key={e.id} value={e.id}>
                {e.etapa || `Etapa #${e.id}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Descrição opcional */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: '600', marginBottom: '5px', display: 'block' }}>
          Descrição do Documento:
        </label>
        <input
          type="text"
          placeholder="Ex: Petição Inicial assinada, RG do cliente..."
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          disabled={!idEtapaSelecionada}
          style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
        />
      </div>

      {/* Dropzone de Upload */}
      <div
        className="upload-dropzone"
        onClick={() => idEtapaSelecionada && fileInputRef.current?.click()}
        style={{
          opacity: idEtapaSelecionada ? 1 : 0.6,
          cursor: idEtapaSelecionada ? 'pointer' : 'not-allowed'
        }}
      >
        <div className="upload-icon">
          <UploadCloud size={48} color="#2563eb" />
        </div>
        <h3 className="upload-title">
          {idEtapaSelecionada
            ? 'Clique aqui para escolher e carregar o arquivo'
            : 'Selecione um Caso e uma Etapa para habilitar o upload'}
        </h3>
        <p className="upload-subtitle">Suporta arquivos PDF, DOCX, PNG, JPG (até 25MB)</p>

        <button
          type="button"
          className="btn-select-file"
          disabled={!idEtapaSelecionada || uploading}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <Paperclip size={18} />
          {uploading ? 'Enviando...' : 'Selecionar Arquivo'}
        </button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          style={{ display: 'none' }}
          disabled={!idEtapaSelecionada || uploading}
        />
      </div>

      {/* Lista de Arquivos da Etapa */}
      {idEtapaSelecionada && (
        <div className="processos-card" style={{ marginTop: '25px' }}>
          <h2>Arquivos Anexados a esta Etapa</h2>

          {loading ? (
            <p style={{ textAlign: 'center', padding: '20px' }}>Carregando documentos...</p>
          ) : documentos.length > 0 ? (
            <table className="processos-table" style={{ width: '100%', marginTop: '15px' }}>
              <thead>
                <tr>
                  <th>Arquivo (Vínculo)</th>
                  <th>Descrição</th>
                  <th style={{ textAlign: 'center' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {documentos.map((doc) => (
                  <tr key={doc.idVinculo}>
                    <td style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500' }}>
                      <FileText size={18} color="#2563eb" />
                      {doc.descricao_arquivo}
                    </td>
                    <td style={{ fontSize: '0.85em', color: '#64748b' }}>{doc.vinculo_arquivo}</td>
                    <td style={{ textAlign: 'center' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                        <a
                          href={`http://localhost:8080/arquivos/${doc.vinculo_arquivo}`}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-novo-caso"
                          style={{
                            backgroundColor: '#0284c7',
                            textDecoration: 'none',
                            padding: '6px 12px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Download size={16} /> Baixar
                        </a>
                        <button
                          onClick={() => handleDeletar(doc)}
                          className="btn-novo-caso"
                          style={{
                            backgroundColor: '#ef4444',
                            padding: '6px 12px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Trash2 size={16} /> Apagar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>
              Nenhum arquivo anexado a esta etapa ainda.
            </p>
          )}
        </div>
      )}
    </div>
  );
}