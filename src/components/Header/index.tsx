import { NavLink } from 'react-router-dom';
import { Sun, Moon, Home, Plus, BookIcon } from 'lucide-react';
import styles from './styles.module.css';
import { Logo } from '../Logo';
import { useTheme } from '../../pages/hooks/useTheme';

export default function Header() {
  const { theme, alternarTema } = useTheme();

  return (
    <header className={styles.header}>
      <Logo />
      <h1 className={styles.title}>Pontinho a Pontinho</h1>
      <nav className={styles.menu}>
        <NavLink
          to='/'
          className={styles.menuLink}
          aria-label='Home'
          title='Home'
        >
          <Home />
        </NavLink>
        <NavLink
          to='/novo'
          className={styles.menuLink}
          aria-label='Adicionar Projeto'
          title='Adicionar'
        >
          <Plus />
        </NavLink>
        <NavLink
          to='/projetos'
          className={styles.menuLink}
          aria-label='Projetos'
          title='Projetos'
        >
          <BookIcon />
        </NavLink>

        {/* Botão para alternar o tema */}
        <button
          onClick={alternarTema}
          className={styles.menuLink}
          aria-label='Alternar Tema'
          title='Alternar Tema'
        >
          {theme === 'light' ? <Moon /> : <Sun />}
        </button>
      </nav>
    </header>
  );
}
