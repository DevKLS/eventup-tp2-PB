import React from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [isWaitingOAuth, setIsWaitingOAuth] = useState(true);

  useEffect(() => {
    // Se a URL contiver fragmentos do Google, damos tempo para o Supabase capturar
    const hasOAuthParams = 
      window.location.hash.includes("access_token") || 
      window.location.search.includes("error");

    if (hasOAuthParams) {
      const timer = setTimeout(() => {
        setIsWaitingOAuth(false);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setIsWaitingOAuth(false);
    }
  }, [location]);

  // Enquanto estiver a carregar ou a processar o OAuth, mostra o ecrã de carregamento
  if (loading || isWaitingOAuth) {
    return (
      <div style={{ 
        textAlign: "center", 
        padding: "100px 0", 
        color: "#ffffff", 
        backgroundColor: "#0b0f19", 
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <div style={{ fontSize: "2rem", marginBottom: "15px" }}>🔄</div>
        <h3 style={{ fontFamily: "sans-serif" }}>A autenticar a sua conta...</h3>
        <p style={{ color: "#8b949e", fontSize: "0.9rem" }}>Aguarde um instante.</p>
      </div>
    );
  }

  // Só redireciona se tiver a certeza absoluta de que não há utilizador autenticado
  return user ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;