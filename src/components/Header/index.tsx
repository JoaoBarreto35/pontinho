import { NavLink } from 'react-router-dom';
import { Home, Plus, BookIcon, Settings } from 'lucide-react';
import styles from './styles.module.css';
import { Logo } from '../Logo';

export default function Header() {
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

        <NavLink
          to='/configuracoes'
          className={styles.menuLink}
          aria-label='Projetos'
          title='Projetos'
        >
          <Settings />
        </NavLink>
      </nav>
    </header>
  );
}
