import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('crocheTheme') || 'light';
  });

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('crocheTheme', theme);
  }, [theme]);

  function alternarTema() {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }

  return { theme, alternarTema };
}
