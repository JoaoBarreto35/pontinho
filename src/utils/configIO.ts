import { showMessage } from '../adapters/showMessage';

// Exporta a chave 'projetos' do localStorage
export function exportarProjetos() {
  const projetos = localStorage.getItem('projetos');

  if (!projetos) {
    showMessage.warn('Nenhum projeto encontrado para exportar.');
    return;
  }

  const blob = new Blob([projetos], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'projetos.json';
  link.click();

  URL.revokeObjectURL(url);
}

// Importa e sobrescreve a chave 'projetos' no localStorage
export function importarProjetos(callback?: () => void) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';

  input.onchange = () => {
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
      try {
        const texto = e.target?.result as string;
        const json = JSON.parse(texto);

        // Opcional: validar se tem a estrutura esperada
        if (!Array.isArray(json)) {
          showMessage.warn(
            'Formato inválido: o JSON deve conter uma lista de projetos.',
          );
          return;
        }

        localStorage.setItem('projetos', JSON.stringify(json));
        callback?.();
        showMessage.success('Projetos importados com sucesso!');
      } catch (err) {
        showMessage.error('Erro ao importar o arquivo.');
        console.error(err);
      }
    };

    reader.readAsText(file);
  };

  input.click();
}
