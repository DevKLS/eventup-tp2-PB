import React from 'react';
import { render, screen } from './test-utils'; // Import único e correto
import { describe, it, expect, vi } from 'vitest';
import Dashboard from '../pages/Dashboard';

// Simulação do serviço Supabase
vi.mock('../services/supabaseClient', () => ({
  supabase: {
    from: () => ({
      select: () => ({
        eq: () => ({
          order: () => Promise.resolve({ data: [], error: null })
        })
      })
    }),
    auth: {
      getSession: () => Promise.resolve({ data: { session: { user: { id: '123' } } }, error: null }),
      onAuthStateChange: () => ({
        data: { subscription: { unsubscribe: vi.fn() } }
      })
    }
  }
}));

describe('Dashboard Component', () => {
  // Definimos um usuário mockado para o contexto
  const providerProps = {
    user: { id: '123', email: 'admin@eventup.com' }
  };

  it('deve carregar e exibir o painel do organizador', async () => {
    render(<Dashboard />, { providerProps });

    const title = await screen.findByText(/Painel do Organizador/i);
    expect(title).toBeInTheDocument(); 
  });

  it('deve exibir o botão de criar novo evento', async () => {
    render(<Dashboard />, { providerProps });

    const btn = await screen.findByRole('link', {
      name: /criar novo evento/i
    });

    expect(btn).toBeInTheDocument();
  });

  it('deve exibir cards de estatísticas zerados quando não houver eventos', async () => {
    render(<Dashboard />, { providerProps });

    // findAllByText retorna uma promise, await é obrigatório
    const stats = await screen.findAllByText(/0/);

    expect(stats.length).toBeGreaterThan(0);
  });
});