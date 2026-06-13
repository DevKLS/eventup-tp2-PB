import { render, screen } from './test-utils';
import Header from "../components/Header";
import React from 'react';

describe('Header Navigation', () => {
  it('deve renderizar os links de navegação corretamente', () => {
    // Tente renderizar sem o BrowserRouter, pois o test-utils deve prover isso
    render(<Header />);
    
   expect(screen.getByRole('link', { name: /início/i })).toBeInTheDocument();
  });
});