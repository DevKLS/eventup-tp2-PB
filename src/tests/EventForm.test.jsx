import React from 'react';
import { render, screen } from './test-utils'; // Import único e correto
import userEvent from '@testing-library/user-event'; // Adicionado import necessário
import { describe, it, expect } from 'vitest';
import EventForm from '../components/EventForm';

describe('EventForm', () => {
  it('deve submeter o formulário corretamente', async () => {
    // Configura o userEvent para simular interações do usuário
    const user = userEvent.setup();
    
    // Dados de mock para passar na validação de administrador do componente
    const providerProps = {
      user: { id: '123', email: 'admin@eventup.com' }
    };

    render(<EventForm />, { providerProps });

    // Preenchimento dos campos utilizando os labels (acessibilidade)
    await user.type(screen.getByLabelText(/título do evento/i), 'Workshop de Testes');
    await user.type(screen.getByLabelText(/descrição do evento/i), 'Descrição válida');
    await user.selectOptions(screen.getByLabelText(/categoria/i), 'Workshop');
    await user.type(screen.getByLabelText(/data de realização/i), '2026-12-31');
    await user.type(screen.getByLabelText(/cep/i), '12345-678');
    await user.type(screen.getByLabelText(/localização completa/i), 'Rua Exemplo, 123');

    // Submissão do formulário
    await user.click(screen.getByRole('button', { name: /salvar evento/i }));

    // Verificação de que o estado de "Salvando..." foi disparado
    const mensagem = await screen.findByText(/salvando/i);
    expect(mensagem).toBeInTheDocument();
  });
});