import { useEffect, useState } from 'react';
import type { Projeto } from '../../types/projeto';
import { filtrarProjetos } from '../../utils/filtrarProjetos';

type Filtros = {
  busca?: string;
  status?: Projeto['status'];
  limite?: number;
};

export function useProjetosFiltrados({ busca, status, limite }: Filtros = {}) {
  const [todosProjetos, setTodosProjetos] = useState<Projeto[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const dados = localStorage.getItem('projetos');
    if (dados) {
      setTodosProjetos(JSON.parse(dados));
    }
    setCarregando(false);
  }, []);

  const projetos = filtrarProjetos(todosProjetos, { busca, status, limite });

  return { projetos, carregando };
}
