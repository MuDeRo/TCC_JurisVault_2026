
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [tema, setTema] = useState(() => {
    const temaSalvo = localStorage.getItem('jurisvault-tema');

    return temaSalvo === 'escuro' ? 'escuro' : 'claro';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-tema', tema);
    localStorage.setItem('jurisvault-tema', tema);
  }, [tema]);

  function alternarTema() {
    setTema((temaAtual) =>
      temaAtual === 'claro' ? 'escuro' : 'claro'
    );
  }

  return (
    <ThemeContext.Provider value={{ tema, alternarTema }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTema() {
  const contexto = useContext(ThemeContext);

  if (!contexto) {
    throw new Error(
      'useTema precisa ser usado dentro de ThemeProvider.'
    );
  }

  return contexto;
}
