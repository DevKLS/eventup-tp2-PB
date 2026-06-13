import React from 'react';
import { render, screen } from './test-utils'; // IMPORTANTE: importar do test-utils
import userEvent from '@testing-library/user-event';
import { it, expect } from 'vitest';
import Login from '../pages/Login';

it('deve exibir erro ao falhar o login', async () => {
  const user = userEvent.setup();
  render(<Login />); // Agora ele já vem com Router e AuthProvider
  const emailInput = screen.getByPlaceholderText(/e-mail/i);
  const passwordInput = screen.getByPlaceholderText(/senha/i);
  
  await user.type(emailInput, 'teste@teste.com');
  await user.type(passwordInput, 'errada');
  
  const loginButton = screen.getByRole('button', { name: /entrar com e-mail/i });
  await user.click(loginButton);

  const errorMessage = await screen.findByText(/credenciais inválidas/i, {}, { timeout: 3000 });
  expect(errorMessage).toBeInTheDocument();
});