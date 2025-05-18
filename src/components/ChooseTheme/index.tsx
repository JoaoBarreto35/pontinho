import { useTheme } from '../../hooks/useTheme';
import styles from './styles.module.css';

export default function ChooseTheme() {
  const { theme, alternarTema } = useTheme();
  const isDark = theme === 'dark';

  return (
    <label className={styles.switch}>
      <input type='checkbox' onChange={alternarTema} checked={isDark} />
      <span className={styles.slider}></span>
    </label>
  );
}
