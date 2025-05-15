// src/pages/Home.tsx
import Calendario from '../../components/Calendar';
import { Container } from '../../components/Container';
import Header from '../../components/Header';
import ProjetoCard from '../../components/ProjetoCard';
import type { Projeto } from '../../types/projeto';
import { useProjetosFiltrados } from '../hooks/useProjetosFiltrados';
import styles from './styles.module.css';

export default function Home() {
  const { projetos, carregando } = useProjetosFiltrados({ status: undefined });

  const projetosFiltrados = projetos.filter(
    p => p.status === 'em progresso' || p.status === 'nao iniciado',
  );

  return (
    <Container>
      <Header />
      <div className={styles.listaDeItens}>
        <h2>Pendentes</h2>

        {carregando ? (
          <p>Carregando projetos...</p>
        ) : projetosFiltrados.length > 0 ? (
          <div className={styles.grid}>
            {projetosFiltrados.map(projeto => (
              <ProjetoCard key={projeto.id} projeto={projeto} />
            ))}
          </div>
        ) : (
          <p>Nenhum projeto em andamento no momento.</p>
        )}
      </div>
      <Calendario
        projetos={
          projetosFiltrados.filter(p => p.prazo !== undefined) as Projeto[]
        }
      />
    </Container>
  );
}
