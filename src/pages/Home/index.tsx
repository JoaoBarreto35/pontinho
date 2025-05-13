// src/pages/Home.tsx
import { Link } from 'react-router-dom';
import { Container } from '../../components/Container';
import Header from '../../components/Header';

export default function Home() {
  // Exemplo de dados de projetos (poderia vir do localStorage, API, etc.)
  const projetos = [
    { id: 1, nome: 'Blusa de Verão', status: 'Em andamento', pontos: 45 },
    { id: 2, nome: 'Cachecol Liso', status: 'Finalizado', pontos: 30 },
  ];

  return (
    <Container>
      <Header />
      <div>
        <h1>Bem-vindo ao Pontinho a Pontinho 🧶</h1>

        <div>
          <h2>Projetos em andamento</h2>
          <ul>
            {projetos.map(projeto => (
              <li key={projeto.id}>
                <Link to={`/projeto/${projeto.id}`}>
                  <h3>{projeto.nome}</h3>
                  <p>Status: {projeto.status}</p>
                  <p>Pontos: {projeto.pontos}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
}
