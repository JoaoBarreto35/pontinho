import { Container } from '../../components/Container';
import Header from '../../components/Header';
import styles from './styles.module.css';
import ChooseTheme from '../../components/ChooseTheme';
import { exportarProjetos, importarProjetos } from '../../utils/configIO';

export default function Configuração() {
  return (
    <Container>
      <Header />
      <div className={styles.container}>
        <h3>Tema</h3>
        <p>
          Escolha entre o modo claro ou escuro para a interface do aplicativo.
        </p>
        <ChooseTheme />
      </div>

      <div className={styles.container}>
        <h3>Importar</h3>
        <p>
          Importe os dados salvos anteriormente de um arquivo. Isso substituirá
          suas informações atuais pelas que estão no arquivo selecionado.
        </p>
        <button className='defaultButton' onClick={() => importarProjetos()}>
          Importar projetos
        </button>
      </div>

      <div className={styles.container}>
        <h3>Exportar</h3>
        <p>
          Exporte seus dados atuais para um arquivo. Você pode usar esse arquivo
          para backup ou para importar as configurações em outro dispositivo.
        </p>
        <button className='defaultButton' onClick={() => exportarProjetos()}>
          Exportar projetos
        </button>
      </div>
    </Container>
  );
}
