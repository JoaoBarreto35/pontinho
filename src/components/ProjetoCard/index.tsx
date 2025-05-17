import styles from './styles.module.css';
import type { Projeto } from '../../types/projeto';
// import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

type ProjetoCardProps = {
  projeto: Projeto;
};

function getStatusLabel(status: Projeto['status']) {
  switch (status) {
    case 'em progresso':
      return 'Em progresso';
    case 'finalizado':
      return 'Finalizado';
    default:
      return 'Não iniciado';
  }
}

export default function ProjetoCard({ projeto }: ProjetoCardProps) {
  return (
    <NavLink to={`/projeto/${projeto.id}`}>
      <div className={styles.card}>
        {projeto.imagemBase64 && (
          <img
            src={projeto.imagemBase64}
            alt={projeto.nome}
            className={styles.cardImage}
          />
        )}
        <h3>{projeto.nome}</h3>
        <p className={styles.carreiras}>Carreiras: {projeto.carreiras}</p>

        <p className={styles.prazo}>
          <span className={styles.prazo}>
            Prazo:{' '}
            {projeto.prazo
              ? new Date(projeto.prazo + 'T00:00:00').toLocaleDateString()
              : 'Sem prazo definido'}
          </span>
        </p>

        <p className={styles.status}>
          <span>{getStatusLabel(projeto.status)}</span>
        </p>
      </div>
    </NavLink>
  );
}
