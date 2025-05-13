import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';
import { Logo } from '../Logo';
import { BookIcon, HistoryIcon, Home, Plus } from 'lucide-react';

export default function Header() {
  return (
    <header className={styles.header}>
      <Logo />
      <h1 className={styles.title}>Pontinho a Pontinho</h1>
      <nav className={styles.menu}>
        <a>
          <NavLink
            to='/'
            className={styles.menuLink}
            aria-label='ir para Home'
            title='Home'
          >
            <Home />
          </NavLink>
        </a>
        <a>
          <NavLink
            to='/novo'
            className={styles.menuLink}
            aria-label='Adicionar Projeto'
            title='Adicionar'
          >
            <Plus />
          </NavLink>
        </a>
        <a>
          <NavLink
            to='/novo'
            className={styles.menuLink}
            aria-label='Listar Projetos'
            title='Projetos'
          >
            <BookIcon />
          </NavLink>
        </a>
        <a>
          <NavLink
            to='/historico'
            className={styles.menuLink}
            aria-label='ir para Histórico'
            title='Histórico'
          >
            <HistoryIcon />
          </NavLink>
        </a>
      </nav>
    </header>
  );
}
