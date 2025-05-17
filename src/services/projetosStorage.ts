import type { Projeto } from '../types/projeto';

export function getProjetos(): Projeto[] {
  return JSON.parse(localStorage.getItem('projetos') || '[]');
}

export function salvarProjeto(projeto: Projeto) {
  const projetos = getProjetos();
  const projetoAtualizado = {
    ...projeto,
    atualizadoEm: new Date().toISOString(),
  }; //to atualizando aqui o atualizado em
  const index = projetos.findIndex(p => p.id === projetoAtualizado.id);

  if (index >= 0) {
    projetos[index] = projetoAtualizado;
  } else {
    projetos.push(projetoAtualizado);
  }

  localStorage.setItem('projetos', JSON.stringify(projetos));
}

export function excluirProjeto(id: string): void {
  const projetos = getProjetos().filter(p => p.id !== id);
  localStorage.setItem('projetos', JSON.stringify(projetos));
}
