import { render, screen } from './test-utils';
import { describe, it, expect, vi } from 'vitest';
import Dashboard from '../pages/Dashboard';
import { AuthContext } from '../contexts/AuthContext';
import React from 'react';

// Mock do Supabase mantendo a estrutura que o Dashboard espera
vi.mock('../services/supabaseClient', () => ({
  supabase: {
    from: () => ({
      select: () => ({
        eq: () => ({
          order: () => Promise.resolve({ data: [], error: null })
        })
      })
    })
  }
}));

describe('Dashboard Component', () => {
  const customRender = () => {
    return render(
      <AuthContext.Provider value={{ user: { id: '123' } }}>
        <Dashboard />
      </AuthContext.Provider>
    );
  };

  it('deve carregar e exibir o painel do organizador', async () => {
    customRender();
    
    // O findByText aguarda a resolução do estado de "carregando"
    const title = await screen.findByText(/Painel do Organizador/i);
    expect(title).toBeInTheDocument;
  });

  it('deve exibir o botão de criar novo evento', async () => {
    customRender();
    
    const btn = await screen.findByRole('link', { name: /criar novo evento/i });
    expect(btn).toBeInTheDocument;
  });

  it('deve exibir cards de estatísticas zerados quando não houver eventos', async () => {
    customRender();
    
    // Busca estatísticas específicas que apareceram no seu log anterior
    const stats = await screen.findAllByText(/0/);
    expect(stats.length).toBeGreaterThan(0);
  });
});