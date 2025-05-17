import { getProjetos, salvarProjeto } from '../services/projetosStorage';

const TEMPO_PREFIX = 'tempo_';
const FLAG_MIGRACAO = 'temposMigrados';

export function migrarTemposEApagarOrfaos() {
  const jaMigrado = localStorage.getItem(FLAG_MIGRACAO);
  if (jaMigrado) return; // evita rodar de novo

  const projetos = getProjetos();
  let alterado = false;

  // Etapa 1: transferir os tempos para dentro dos projetos
  const projetosAtualizados = projetos.map(projeto => {
    const tempoKey = `${TEMPO_PREFIX}${projeto.id}`;
    const tempoSalvo = localStorage.getItem(tempoKey);

    if (tempoSalvo) {
      const tempoGasto = Number(tempoSalvo);
      if (!isNaN(tempoGasto)) {
        alterado = true;
        return {
          ...projeto,
          tempoGasto, // adiciona o campo
        };
      }
    }

    return projeto;
  });

  // Etapa 2: salvar projetos atualizados (caso tenha mudança)
  if (alterado) {
    projetosAtualizados.forEach(salvarProjeto);
  }

  // Etapa 3: limpar os tempos órfãos
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith(TEMPO_PREFIX)) {
      localStorage.removeItem(key);
    }
  });

  // Marcar como migrado
  localStorage.setItem(FLAG_MIGRACAO, 'true');
}
