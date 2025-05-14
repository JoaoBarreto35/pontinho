import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';

type Projeto = {
  id: string;
  nome: string;
  prazo?: string;
};

type CalendarioProps = {
  projetos: Projeto[];
};

export default function Calendario({ projetos }: CalendarioProps) {
  const [mesAtual, setMesAtual] = useState(new Date().getMonth());
  const [anoAtual, setAnoAtual] = useState(new Date().getFullYear());
  const [projetosSelecionados, setProjetosSelecionados] = useState<Projeto[]>(
    [],
  );

  const primeiroDia = new Date(anoAtual, mesAtual, 1).getDay();
  const diasNoMes = new Date(anoAtual, mesAtual + 1, 0).getDate();

  // Filtrar projetos que têm prazo dentro do mês atual
  const prazos = projetos
    .filter(p => p.prazo)
    .map(p => {
      const [ano, mes, dia] = p.prazo!.split('-').map(Number);
      return ano === anoAtual && mes - 1 === mesAtual ? dia : null;
    })
    .filter(dia => dia !== null);

  const avancarMes = () => {
    setMesAtual(prev => (prev === 11 ? 0 : prev + 1));
    if (mesAtual === 11) setAnoAtual(prev => prev + 1);
  };

  const voltarMes = () => {
    setMesAtual(prev => (prev === 0 ? 11 : prev - 1));
    if (mesAtual === 0) setAnoAtual(prev => prev - 1);
  };

  return (
    <div className={styles.calendario}>
      <div className={styles.header}>
        <ArrowLeftCircle onClick={voltarMes} className={styles.controlMonth} />
        <h3>
          {new Date(anoAtual, mesAtual).toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          })}
        </h3>
        <ArrowRightCircle
          onClick={avancarMes}
          className={styles.controlMonth}
        />
      </div>

      <div className={styles.grid}>
        {Array.from({ length: primeiroDia }).map((_, i) => (
          <div key={i} className={styles.vazio}></div>
        ))}

        {Array.from({ length: diasNoMes }).map((_, i) => {
          const dia = i + 1;
          const projetosDoDia = projetos.filter(p => {
            if (!p.prazo) return false;
            const [ano, mes, diaPrazo] = p.prazo.split('-').map(Number);
            return ano === anoAtual && mes - 1 === mesAtual && diaPrazo === dia;
          });

          return (
            <div
              key={dia}
              className={prazos.includes(dia) ? styles.prazo : styles.dia}
              onClick={() =>
                projetosDoDia.length > 0 &&
                setProjetosSelecionados(projetosDoDia)
              }
            >
              {dia}
            </div>
          );
        })}
      </div>

      {projetosSelecionados.length > 0 && (
        <div className={styles.modal}>
          <h3>Projetos do Dia</h3>
          <ul>
            {projetosSelecionados.map(projeto => (
              <li key={projeto.id}>
                <Link to={`/projeto/${projeto.id}`}>
                  <strong>{projeto.nome}</strong>
                </Link>
              </li>
            ))}
          </ul>
          <button onClick={() => setProjetosSelecionados([])}>Fechar</button>
        </div>
      )}
    </div>
  );
}
