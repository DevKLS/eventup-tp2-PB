*Relatório de Testes - EventUp*

## 1. Testes Unitários (Automatizados)
Validam a lógica interna dos componentes e a integridade dos dados antes da persistência. Os testes foram executados utilizando o Vitest e React Testing Library.

Autenticação: Validação do fluxo de login, incluindo tratamento de erros de credenciais (Login.test.jsx).

Entrada de Dados: Verificação da correta criação do objeto de evento, presença de campos obrigatórios, categorias e localização (EventForm.test.jsx).

Interface: Validação da renderização da estrutura de navegação e integridade dos links (Header.test.jsx, Perfil.test.jsx, Dashboard.test.jsx).

## 2. Cenários de Segurança (RLS & RBAC)
Validam a proteção dos dados no nível do banco de dados (Supabase), garantindo que as regras de negócio sejam invioláveis via interface.

Teste: Tentativa de deleção de um evento pertencente a outro usuário via requisição direta.

Resultado Esperado: A API deve retornar erro 403 Forbidden, bloqueado pela política de Row Level Security (RLS).

Status: Validado.

## 3. Testes Funcionais (Recursos Nativos)
Validam a experiência do usuário em ambiente mobile, focando em funcionalidades de hardware.

Teste: Abertura e integração com a câmera e galeria do dispositivo móvel.

Resultado Esperado: Permissão concedida pelo SO, com processamento da imagem em formato Base64 compatível com os requisitos de upload do Supabase.

Status: Validado.

## 4. Evidência de Testes Automatizados (Vitest)
Executamos a suíte de testes unitários abrangendo os principais componentes do sistema. A execução foi realizada com sucesso em todos os arquivos de teste.

*Dashboard, EventForm, Header, Login e Perfil*

**Resultado da Execução:**

  Test Files  5 passed (5)
       Tests  11 passed (11)
    Duration  2.83s