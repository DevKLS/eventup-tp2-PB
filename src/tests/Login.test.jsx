import React from 'react';
import { render, screen } from './test-utils';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Login from '../pages/Login';
import { supabase } from '../services/supabaseClient';

vi.mock('../services/supabaseClient', () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn(),
    },
  },
}));

describe('Login Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve exibir alerta ao falhar o login', async () => {
    const alertMock = vi
      .spyOn(window, 'alert')
      .mockImplementation(() => {});

    supabase.auth.signInWithPassword.mockResolvedValue({
      data: null,
      error: {
        message: 'Credenciais inválidas',
      },
    });

    const user = userEvent.setup();

    render(<Login />);

    await user.type(
      screen.getByPlaceholderText(/e-mail/i),
      'teste@teste.com'
    );

    await user.type(
      screen.getByPlaceholderText(/senha/i),
      'errada'
    );

    await user.click(
      screen.getByRole('button', {
        name: /entrar com e-mail/i,
      })
    );

    expect(alertMock).toHaveBeenCalledWith(
      'Erro ao entrar: Credenciais inválidas'
    );
  });
});