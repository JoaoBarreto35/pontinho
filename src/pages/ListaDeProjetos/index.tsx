import { useState } from 'react';
import styles from './styles.module.css';
import { Container } from '../../components/Container';
import Header from '../../components/Header';
import ProjetoCard from '../../components/ProjetoCard';
import { useProjetosFiltrados } from '../../hooks/useProjetosFiltrados';
import type { StatusProjeto } from '../../types/status';
import { statusValidos } from '../../types/status';

export default function Projetos() {
  const [busca, setBusca] = useState('');
  const [status, setStatus] = useState<StatusProjeto | ''>('');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 4;

  const { projetos, carregando } = useProjetosFiltrados({
    busca,
    status: status || undefined,
  });

  function handleChangeStatus(e: React.ChangeEvent<HTMLSelectElement>) {
    const valor = e.target.value;
    if (statusValidos.includes(valor as StatusProjeto)) {
      setStatus(valor as StatusProjeto);
    } else {
      setStatus('');
    }
    setPaginaAtual(1); // Voltar para a página 1 ao mudar o filtro
  }

  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const indiceFinal = indiceInicial + itensPorPagina;
  const projetosPaginados = projetos.slice(indiceInicial, indiceFinal);

  function proximaPagina() {
    if (indiceFinal < projetos.length) {
      setPaginaAtual(prev => prev + 1);
    }
  }

  function paginaAnterior() {
    if (paginaAtual > 1) {
      setPaginaAtual(prev => prev - 1);
    }
  }

  return (
    <Container>
      <Header />
      <div className={styles.topo}>
        <h2>Meus Projetos</h2>
        <input
          type='text'
          placeholder='Buscar por nome ou descrição...'
          value={busca}
          onChange={e => setBusca(e.target.value)}
          className={styles.campoBusca}
        />
        <select
          value={status}
          onChange={handleChangeStatus}
          className='defaultInputSelect'
        >
          <option value=''>Todos os status</option>
          <option value='nao iniciado'>Não iniciado</option>
          <option value='em progresso'>Em progresso</option>
          <option value='finalizado'>Finalizado</option>
        </select>
      </div>

      {carregando ? (
        <p>Carregando...</p>
      ) : projetos.length === 0 ? (
        <p>Nenhum projeto encontrado.</p>
      ) : (
        <>
          <div className={styles.grid}>
            {projetosPaginados.map(projeto => (
              <ProjetoCard key={projeto.id} projeto={projeto} />
            ))}
          </div>

          <div className={styles.paginacao}>
            <button onClick={paginaAnterior} disabled={paginaAtual === 1}>
              Anterior
            </button>
            <span>Página {paginaAtual}</span>
            <button
              onClick={proximaPagina}
              disabled={indiceFinal >= projetos.length}
            >
              Próxima
            </button>
          </div>
        </>
      )}
    </Container>
  );
}
