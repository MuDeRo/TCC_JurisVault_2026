import { useState, useEffect } from 'react';

export default function usePainelGeral() {
  const [processos, setProcessos] = useState([]);
  const [prazos, setPrazos] = useState([]);
  const [arquivos, setArquivos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const carregarDados = setTimeout(() => {
      try {
        setProcessos([
          { id: 1, titulo: 'Proc. 1002341-89.2026 — Ação Trabalhista' },
          { id: 2, titulo: 'Proc. 5001290-11.2025 — Revisional Fiscal' },
          { id: 3, titulo: 'Proc. 0081239-44.2026 — Inventário Cível' },
        ]);

        setPrazos([
          { id: 1, descricao: 'Contestação — Vencimento: 22/09' },
          { id: 2, descricao: 'Réplica — Vencimento: 25/09' },
        ]);

        setArquivos([
          { id: 1, nome: 'Petição_Inicial_Final.pdf' },
          { id: 2, nome: 'Procuracao_Assinada.pdf' },
        ]);

        setCarregando(false);
      } catch {
        setErro('Ocorreu um erro ao carregar as informações do painel.');
        setCarregando(false);
      }
    }, 500);

    return () => clearTimeout(carregarDados);
  }, []);

  return { processos, prazos, arquivos, carregando, erro };
}