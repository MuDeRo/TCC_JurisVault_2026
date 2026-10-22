
import { Sun, Moon } from 'lucide-react';
import { useTema } from "../../context/ThemeContext.jsx";
import './BotaoTema.css';

export default function BotaoTema() {
  const { tema, alternarTema } = useTema();

  return (
    <button
      type="button"
      className="botao-tema"
      onClick={alternarTema}
      aria-label={
        tema === 'claro'
          ? 'Ativar tema escuro'
          : 'Ativar tema claro'
      }
      title={
        tema === 'claro'
          ? 'Ativar tema escuro'
          : 'Ativar tema claro'
      }
    >
      {tema === 'claro' ? (
        <>
          <Moon size={18} />
          <span>Modo escuro</span>
        </>
      ) : (
        <>
          <Sun size={18} />
          <span>Modo claro</span>
        </>
      )}
    </button>
  );
}
