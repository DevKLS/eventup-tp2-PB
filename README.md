# EventUp - Sistema de Gerenciamento de Eventos

Projeto desenvolvido para o Projeto de Bloco. Sistema focado em gestão de eventos com autenticação, segurança de dados e interface responsiva (Mobile-First).

## Tecnologias
- **Frontend:** React 19, Vite, React Router DOM
- **Backend/DB:** Supabase (Auth + RLS)
- **Testes:** Vitest, React Testing Library

## Como rodar o projeto
1. Clone o repositório.
2. Instale as dependências: `npm install`
3. Inicie o ambiente de desenvolvimento: `npm run dev`

## Testes
Para executar a suíte de testes unitários:
`npm test`

## Segurança
O projeto utiliza **Row Level Security (RLS)** no Supabase, garantindo que usuários possam editar ou excluir apenas os eventos criados por eles mesmos (`organizador_id`).