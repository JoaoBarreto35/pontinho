import type { Projeto } from '../types/projeto';

export function ordenarProjetosPorAtualizadoEm(projetos: Projeto[]): Projeto[] {
  return projetos.slice().sort((a, b) => {
    const dataA = a.atualizadoEm ? new Date(a.atualizadoEm).getTime() : 0;
    const dataB = b.atualizadoEm ? new Date(b.atualizadoEm).getTime() : 0;
    return dataB - dataA; // do mais novo para o mais antigo
  });
}
