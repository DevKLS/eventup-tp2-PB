import React from 'react';
import { render, screen } from './test-utils';
import Header from "../components/Header";
import { describe, it, expect } from 'vitest';

describe('Header Navigation', () => {
  it('deve renderizar os links de navegação corretamente', async () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: /início/i })).toBeInTheDocument();
  });
});