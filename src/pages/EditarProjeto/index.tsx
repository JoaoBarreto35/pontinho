import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Projeto } from '../../types/projeto';
import { Container } from '../../components/Container';
import Header from '../../components/Header';
import styles from './styles.module.css';

import { EditIcon, Minus, Plus } from 'lucide-react';
import DefaultForms from '../../components/Forms';

export default function EditarProjeto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [projeto, setProjeto] = useState<Projeto | null>(null);
  const [mostrarEdicao, setMostrarEdicao] = useState(false);
  const [tempoGasto, setTempoGasto] = useState(0);
  const [rodando, setRodando] = useState(false);

  useEffect(() => {
    const projetosSalvos: Projeto[] = JSON.parse(
      localStorage.getItem('projetos') || '[]',
    );
    const encontrado = projetosSalvos.find(p => p.id === id);
    if (encontrado) {
      setProjeto(encontrado);
      setTempoGasto(
        Number(localStorage.getItem(`tempo_${encontrado.id}`)) || 0,
      );
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  useEffect(() => {
    let intervalo: number | null = null;
    if (rodando && projeto?.id) {
      intervalo = setInterval(() => {
        setTempoGasto(prev => {
          localStorage.setItem(`tempo_${projeto.id}`, String(prev + 1));
          return prev + 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalo) clearInterval(intervalo);
    };
  }, [rodando, projeto?.id]);

  function iniciarTimer() {
    setRodando(true);
  }

  function pausarTimer() {
    setRodando(false);
  }

  function toggleEditarAvancado() {
    setMostrarEdicao(prev => !prev);
  }

  function salvarCarreiras(novaQtd: number) {
    if (!projeto) return;
    const projetosSalvos: Projeto[] = JSON.parse(
      localStorage.getItem('projetos') || '[]',
    );
    const atualizados = projetosSalvos.map(p =>
      p.id === projeto.id ? { ...p, carreiras: novaQtd } : p,
    );
    localStorage.setItem('projetos', JSON.stringify(atualizados));
    setProjeto(prev => (prev ? { ...prev, carreiras: novaQtd } : null));
  }

  function handleAdicionarCarreira() {
    if (projeto) {
      salvarCarreiras(projeto.carreiras + 1);
    }
  }

  function handleRemoverCarreira() {
    if (projeto && projeto.carreiras > 0) {
      salvarCarreiras(projeto.carreiras - 1);
    }
  }

  return (
    <Container>
      <Header />
      {projeto && (
        <div className={styles.wrapper}>
          <h2>{projeto.nome}</h2>

          {/* Contador de carreiras e imagem do projeto */}
          <div className={styles.carreirasContainer}>
            <div className={styles.carreirasBox}>
              <Minus
                onClick={handleRemoverCarreira}
                className={styles.botaoPequeno}
              />
              <div className={styles.carreirasNumero}>{projeto.carreiras}</div>
              <Plus
                onClick={handleAdicionarCarreira}
                className={styles.botaoPequeno}
              />
            </div>

            {projeto.imagemBase64 && (
              <img
                src={projeto.imagemBase64}
                alt='Projeto'
                className={styles.imagemProjeto}
              />
            )}
          </div>

          {/* Timer - Posicionado entre carreiras e receita */}
          <div className={styles.timerBox}>
            <h3>
              Timer: {Math.floor(tempoGasto / 60)} min {tempoGasto % 60} s
            </h3>
            <button onClick={rodando ? pausarTimer : iniciarTimer}>
              {rodando ? 'Pausar' : 'Iniciar'}
            </button>
          </div>

          {/* Receita do projeto */}
          <div className={styles.receitaBox}>
            <h3>Receita</h3>
            <p>{projeto.receita}</p>
          </div>

          <EditIcon onClick={toggleEditarAvancado} />

          {mostrarEdicao && <DefaultForms projeto={projeto} />}
        </div>
      )}
    </Container>
  );
}
