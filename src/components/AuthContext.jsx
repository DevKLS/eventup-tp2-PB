import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from "../supabaseClient";

const AuthContext = createContext(null);

/**
 * Provedor de autenticação responsável por gerenciar o estado do usuário,
 * persistência de sessão e lógica de logout.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carrega a sessão inicial do usuário
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };
    getSession();

    // Sincroniza estado de autenticação em tempo real
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  /**
   * Finaliza a sessão do usuário e redireciona para a home
   */
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    
    // Pequeno atraso para feedback visual antes do redirecionamento
    setTimeout(() => {
      window.location.href = "/";
    }, 500); 
  };

  const isOrganizador = user?.user_metadata?.role === 'organizador';

  return (
    <AuthContext.Provider value={{ user, isOrganizador, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);