import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from "./contexts/AuthContext";
import './styles.css';

/**
 * Ponto de entrada da aplicação.
 * Responsável por inicializar o React e configurar
 * os provedores globais de roteamento e autenticação.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    {/* Gerenciamento de rotas da aplicação */}
    <BrowserRouter>

      {/* Disponibiliza o contexto de autenticação para toda a aplicação */}
      <AuthProvider>

        {/* Componente principal */}
        <App />

      </AuthProvider>
    </BrowserRouter>

  </React.StrictMode>
);