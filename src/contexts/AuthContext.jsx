import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from "../services/supabaseClient";

// Contexto responsável por compartilhar os dados de autenticação
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verifica se o usuário possui permissão de organizador
  const isOrganizador = user ? (
    user.email?.endsWith("@eventup.com") ||
    user.user_metadata?.email?.endsWith("@eventup.com")
  ) : false;

  useEffect(() => {
    let isMounted = true;

    // Recupera a sessão atual do usuário
    const checkSession = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession();

      if (isMounted) {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    };

    checkSession();

    // Monitora alterações no estado de autenticação
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (isMounted) {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Realiza o login utilizando uma conta Google
  const loginComGoogle = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin
      }
    });

    if (error) {
      setLoading(false);
      console.error("Erro no login:", error.message);
    }
  };

  // Encerra a sessão do usuário
  const logout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setLoading(false);
  };

  // Dados e funções disponibilizados para toda a aplicação
  const value = {
    user,
    loginComGoogle,
    logout,
    loading,
    isOrganizador
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acessar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }

  return context;
};