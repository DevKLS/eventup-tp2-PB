*Relatório de Testes - EventUp*

## 1. Testes Unitários (Automatizados)
Validam a lógica interna dos componentes e a integridade dos dados antes da persistência.

Autenticação: Validação de formato de e-mail e comprimento mínimo de senha (Login.test.jsx).

Entrada de Dados: Verificação da criação do objeto de evento, presença de categorias e localização (EventForm.test.jsx).

Interface: Validação da estrutura de navegação e conteúdo dos links (Navbar.test.jsx, Perfil.test.jsx).

## 2. Cenários de Segurança (RLS & RBAC)
Validam a proteção dos dados no nível do banco (Supabase).

Teste: Tentar deletar um evento de outro usuário via requisição direta.

Resultado esperado: A requisição DELETE retorna erro 403 Forbidden (bloqueado pela política RLS).

Status: Validado.

## 3. Testes Funcionais (Recursos Nativos)
Validam a experiência em ambiente mobile.

Teste: Abertura da câmera e galeria em dispositivo móvel.

Resultado esperado: Permissão concedida e imagem processada em Base64, respeitando o formato aceito pelo Supabase.

Status: Validado.

## 4. Evidência de Testes Automatizados (Vitest)
Executamos a suíte de testes unitários para validar a lógica de negócio dos componentes `Login`, `EventForm`, `Navbar` e `Perfil`.

**Resultado da Execução:**
```text
  Test Files  4 passed (4)
       Tests  11 passed (11)
    Duration  2.83s