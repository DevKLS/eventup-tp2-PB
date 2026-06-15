import React from 'react';
import { render, screen } from './test-utils'; // Render com providers globais
import { describe, it, expect } from 'vitest';
import Perfil from '../pages/Perfil';

describe('Perfil', () => {
  it('deve renderizar os dados do usuário vindo do contexto', async () => {
    // Definimos o usuário mockado para ser injetado via test-utils
    const providerProps = {
      user: { 
        email: 'keila@teste.com',
        user_metadata: { full_name: 'Keila' } 
      }
    };

    // Renderiza usando nosso render customizado e injeta o contexto
    render(<Perfil />, { providerProps });

    // Localiza os campos de entrada (textbox)
    const inputs = screen.getAllByRole('textbox');
    
    // Verifica se os valores estão corretos
    // Nota: Certifique-se de que a ordem dos inputs no seu componente Perfil.jsx
    // corresponde a este índice [0] para Nome e [1] para Email
    expect(inputs[0].value).toBe('Keila');
    expect(inputs[1].value).toBe('keila@teste.com');
  });
});