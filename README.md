# Compara DOC

Aplicação para comparação detalhada de documentos `.docx`, destacando diferenças em nível de parágrafos e palavras.

## Visão Geral

O **Comparador de Documentos** é uma ferramenta web que permite comparar duas versões de documentos Word (DOCX), identificando visualmente as diferenças entre eles com alto grau de precisão. Ideal para revisão de contratos, acompanhamento de alterações em documentos jurídicos ou comparação de versões de relatórios.

## Funcionalidades

- **Destaque de diferenças:** Identificação visual de adições, remoções e alterações
- **Múltiplos modos de visualização:**
  - **Lado a lado:** Comparação paralela (diferenças alinhadas)
  - **Empilhado:** Diferenças exibidas verticalmente
  - **Unificado:** Alterações mescladas em linha única
- **Estatísticas detalhadas:** Métricas de similaridade, contagem de mudanças
- **Diferenciação em dois níveis:**
  - **Linhas:** Destaque de parágrafos alterados
  - **Palavras:** Destaque preciso de termos modificados

## Como Utilizar

1. **Clone o repositório:**

   ```sh
   git clone https://github.com/cesardmn/comparadoc.git
   cd comparadoc
   ```

2. **Instale as dependências:**

   ```sh
   npm install
   ```

3. **Execute o ambiente de desenvolvimento:**

   ```sh
   npm run dev
   ```

4. **Acesse a aplicação:**
   [http://localhost:3000](http://localhost:3000)

## Scripts

- `npm run dev` — Inicia o ambiente de desenvolvimento
- `npm run build` — Gera a build de produção
- `npm run preview` — Visualiza a build localmente
- `npm run lint` — Executa análise estática do código
- `npm run format` — Formata o código com Prettier

## Estrutura do Projeto

- [`src/components/`](src/components/) — Componentes da interface (Diff, Uploader, Compara)
- [`src/store/`](src/store/) — Gerenciamento de estado (Zustand)
- [`src/utils/`](src/utils/) — Parse de .docx (mammoth.js)
- [`src/assets/`](src/assets/) — Imagens e recursos estáticos
- [`public/`](public/) — Arquivos públicos

## Tecnologias

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://zustand-demo.pmnd.rs/) — Gerenciamento de estado
- [Lucide Icons](https://lucide.dev/) — Ícones
- [Mammoth.js](https://github.com/mwilliamson/mammoth.js) — Conversão DOCX para texto
- [Diff](https://github.com/kpdecker/jsdiff) — Algoritmo de comparação de texto
- [ESLint](https://eslint.org/) — Análise de código
- [Prettier](https://prettier.io/) — Formatação

## Licença

MIT © 2025 Cesar Dimi

---

uma ferramenta [autoflux](https://autoflux.app.br/)