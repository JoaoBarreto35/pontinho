import styles from './styles.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Pontinho a Pontinho 🧶</p>
    </footer>
  );
}
