import styles from './styles.module.css';
import logo from '../../../public/images/logo.png';

export function Logo() {
  return <img className={styles.logoImage} src={logo}></img>;
}
