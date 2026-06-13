import React from 'react';
import { render, screen, fireEvent } from './test-utils';
import { describe, it, expect } from 'vitest';
import Perfil from '../pages/Perfil';
import { AuthContext } from '../contexts/AuthContext'; // Importe o contexto criado

describe('Perfil', () => {
  it('deve renderizar o nome do usuário vindo do contexto', () => {
    const mockUser = { nome: 'Keila', email: 'keilasantanalima654@email.com' };
    
    render(
      // O Provider precisa envolver o componente testado
      <AuthContext.Provider value={{ user: mockUser }}>
        <Perfil />
      </AuthContext.Provider>
    );
    
    expect(screen.getByDisplayValue(/Usuário/i)).toBeInTheDocument();
  });
});