import type { Projeto } from '../types/projeto';
import type { StatusProjeto } from '../types/status';

type FiltroProjetoOpcoes = {
  status?: StatusProjeto; // 'nao-iniciado' | 'em-progresso' | 'finalizado'
  busca?: string;
  limite?: number;
};

export function filtrarProjetos(
  projetos: Projeto[],
  { status, busca, limite }: FiltroProjetoOpcoes = {},
): Projeto[] {
  let resultado = [...projetos];

  if (status) {
    resultado = resultado.filter(p => p.status === status);
  }

  if (busca) {
    const texto = busca.toLowerCase();
    resultado = resultado.filter(
      p =>
        p.nome.toLowerCase().includes(texto) ||
        p.descricao.toLowerCase().includes(texto),
    );
  }

  if (limite && limite > 0) {
    resultado = resultado.slice(0, limite);
  }

  return resultado;
}
