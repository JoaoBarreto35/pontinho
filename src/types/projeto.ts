export interface Projeto {
  id: string;
  nome: string;
  descricao: string;
  carreiras: number;
  receita?: string;
  imagemBase64?: string | null;
  criadoEm: string;
  prazo?: string;
  status?: 'nao iniciado' | 'em progresso' | 'finalizado';
  tempoGasto?: number; // Tempo em segundos
}
