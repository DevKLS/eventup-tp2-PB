import React from 'react'; // <--- ADICIONE ESTA LINHA
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, it, expect } from 'vitest';
import EventForm from '../components/EventForm';

it('deve chamar a função de envio ao clicar no botão', async () => {
  const user = userEvent.setup(); 
  const handleSubmit = vi.fn();
  
  render(<EventForm onSubmit={handleSubmit} />);
  
  await user.type(screen.getByPlaceholderText(/título/i), 'Evento Teste');
  const button = screen.getByRole('button', { name: /salvar/i });
  await user.click(button);
  
  expect(handleSubmit).toHaveBeenCalled();
});