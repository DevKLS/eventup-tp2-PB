import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; // Importe o contexto original

const customRender = (ui, { providerProps, ...renderOptions } = {}) => {
  // Criamos um wrapper que injeta o valor do providerProps no contexto
  const AllTheProviders = ({ children }) => {
    return (
      <AuthContext.Provider value={providerProps || { user: null }}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </AuthContext.Provider>
    );
  };

  return render(ui, { wrapper: AllTheProviders, ...renderOptions });
};

// Re-exporta tudo do testing-library
export * from '@testing-library/react';
// Substitui o render pelo nosso render customizado
export { customRender as render };