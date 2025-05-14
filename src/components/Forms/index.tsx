import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import type { Projeto } from '../../types/projeto.ts';
import defaultImage from '../../../public/images/defaultImage.jpg';
import { TrashIcon } from 'lucide-react';
import { statusValidos, type StatusProjeto } from '../../types/status.ts';

type ProjetoCardProps = {
  projeto?: Projeto; // Deixa opcional para suportar criação
};

export default function DefaultForms({ projeto }: ProjetoCardProps) {
  const navigate = useNavigate();

  // Definição dos estados iniciais baseados em `projeto` ou valores padrão
  const [nome, setNome] = useState(projeto?.nome ?? '');
  const [descricao, setDescricao] = useState(projeto?.descricao ?? '');
  const [carreiras, setCarreiras] = useState(projeto?.carreiras ?? 0);
  const [receita, setReceita] = useState(projeto?.receita ?? '');
  const [prazo, setPrazo] = useState(projeto?.prazo ?? '');
  const [status, setStatus] = useState<StatusProjeto>(
    projeto?.status ?? 'nao iniciado',
  );
  const [imagem, setImagem] = useState<string | null>(
    projeto?.imagemBase64 ?? null,
  );

  function handleImagemUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImagem(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  function handleSalvarProjeto(e: React.FormEvent) {
    e.preventDefault();

    const projetosSalvos: Projeto[] = JSON.parse(
      localStorage.getItem('projetos') || '[]',
    );

    if (projeto) {
      // Atualiza o projeto existente
      const projetosAtualizados = projetosSalvos.map(p =>
        p.id === projeto.id
          ? {
              ...p,
              nome,
              descricao,
              carreiras,
              receita,
              prazo,
              imagemBase64: imagem ?? defaultImage,
              status,
            }
          : p,
      );
      localStorage.setItem('projetos', JSON.stringify(projetosAtualizados));
    } else {
      // Cria um novo projeto
      const novoProjeto: Projeto = {
        id: Date.now().toString(),
        nome,
        descricao,
        carreiras,
        receita,
        imagemBase64: imagem || defaultImage,
        criadoEm: new Date().toISOString(),
        prazo,
        status,
      };
      projetosSalvos.push(novoProjeto);
      localStorage.setItem('projetos', JSON.stringify(projetosSalvos));
    }
    navigate('/');
  }
  function handleExcluirProjeto() {
    if (!projeto) return;

    const confirmacao = window.confirm(
      'Tem certeza que deseja excluir este projeto?',
    );

    if (confirmacao) {
      const projetosSalvos: Projeto[] = JSON.parse(
        localStorage.getItem('projetos') || '[]',
      );
      const projetosAtualizados = projetosSalvos.filter(
        p => p.id !== projeto.id,
      );

      localStorage.setItem('projetos', JSON.stringify(projetosAtualizados));
      navigate('/'); // Volta para a tela inicial
    }
  }

  return (
    <div className={styles.formulario}>
      <form onSubmit={handleSalvarProjeto}>
        <label>
          Nome:
          <input
            type='text'
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
          />
        </label>

        <label>
          Descrição:
          <textarea
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
          />
        </label>

        <label>
          Receita:
          <textarea
            value={receita}
            onChange={e => setReceita(e.target.value)}
          />
        </label>

        <label>
          Carreiras:
          <input
            type='number'
            value={carreiras}
            onChange={e => setCarreiras(Number(e.target.value))}
            min={0}
          />
        </label>
        <label>
          Status:
          <select
            value={status}
            onChange={e => setStatus(e.target.value as StatusProjeto)}
            className='defaultInputSelect'
          >
            {statusValidos.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
        <label>
          Prazo:
          <input
            type='date'
            value={prazo}
            onChange={e => setPrazo(e.target.value)}
          />
        </label>

        <label>
          Imagem:
          <input type='file' accept='image/*' onChange={handleImagemUpload} />
        </label>

        {imagem && (
          <div className={styles.previewWrapper}>
            <img
              src={imagem}
              alt='Pré-visualização'
              className={styles.preview}
            />
            <button
              type='button'
              onClick={() => setImagem(null)}
              className={styles.botaoRemover}
            >
              Remover Imagem
            </button>
          </div>
        )}

        <div className={styles.botoes}>
          <button type='submit' className='defaultButton'>
            {projeto ? 'Salvar Alterações' : 'Criar Projeto'}
          </button>
        </div>

        {projeto && (
          <TrashIcon
            onClick={handleExcluirProjeto}
            className={styles.excluirProjeto}
            aria-label='Excluir Projeto'
          />
        )}
      </form>
    </div>
  );
}
