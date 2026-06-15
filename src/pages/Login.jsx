import React from 'react';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";
import { useAuth } from "../contexts/AuthContext";
import { FaGoogle, FaSignInAlt } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const { loginComGoogle, user, loading: authLoading } = useAuth();
  const [formData, setFormData] = useState({ email: "", senha: "" });
  const [loading, setLoading] = useState(false);

  // Verifica se existe uma sessão ativa e redireciona para a página inicial
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Realiza a autenticação utilizando e-mail e senha cadastrados
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email.trim().toLowerCase(),
        password: formData.senha,
      });

      if (error) throw error;

      navigate("/");
    } catch (err) {
      alert(`Erro ao entrar: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container"
      style={{
        padding: "60px 20px",
        maxWidth: "500px",
        margin: "0 auto"
      }}
    >
      <div
        style={{
          backgroundColor: "#161b22",
          padding: "40px",
          borderRadius: "12px",
          border: "1px solid #30363d"
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <FaSignInAlt
            style={{
              color: "#ff7a00",
              fontSize: "40px",
              marginBottom: "10px"
            }}
          />
          <h2
            style={{
              color: "#fff",
              margin: 0,
              fontFamily: "sans-serif"
            }}
          >
            Entrar no EventUp
          </h2>
        </div>

        {/* Formulário de autenticação por e-mail e senha */}
        <form
          onSubmit={handleLoginSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px"
          }}
        >
          <input
            type="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value
              })
            }
            required
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Senha"
            value={formData.senha}
            onChange={(e) =>
              setFormData({
                ...formData,
                senha: e.target.value
              })
            }
            required
            style={inputStyle}
          />

          <button
            type="submit"
            disabled={loading || authLoading}
            style={buttonStyle(loading)}
          >
            {loading ? "Entrando..." : "Entrar com E-mail"}
          </button>
        </form>

        {/* Separador visual entre os métodos de login */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "25px 0",
            color: "#8b949e"
          }}
        >
          <hr
            style={{
              flexGrow: 1,
              border: "none",
              height: "1px",
              backgroundColor: "#30363d"
            }}
          />
          <span
            style={{
              padding: "0 15px",
              fontSize: "14px",
              fontFamily: "sans-serif"
            }}
          >
            ou
          </span>
          <hr
            style={{
              flexGrow: 1,
              border: "none",
              height: "1px",
              backgroundColor: "#30363d"
            }}
          />
        </div>

        {/* Botão para autenticação via conta Google */}
        <button
          type="button"
          onClick={loginComGoogle}
          disabled={loading || authLoading}
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: "#ffffff",
            color: "#0d1117",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            fontSize: "15px",
            fontFamily: "sans-serif",
            transition: "background-color 0.2s"
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#f0f0f0")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#ffffff")
          }
        >
          <FaGoogle
            style={{
              color: "#db4437",
              fontSize: "18px"
            }}
          />
          {authLoading ? "Conectando..." : "Entrar com o Google"}
        </button>

        <p
          style={{
            marginTop: "25px",
            fontSize: "14px",
            color: "#8b949e",
            textAlign: "center",
            fontFamily: "sans-serif"
          }}
        >
          Não tem uma conta?{" "}
          <Link
            to="/cadastro"
            style={{
              color: "#ff7a00",
              textDecoration: "none"
            }}
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}

// Estilos reutilizados para os campos de entrada do formulário
const inputStyle = {
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid #30363d",
  backgroundColor: "#0d1117",
  color: "#fff",
  outline: "none"
};

// Configuração visual do botão principal de autenticação
const buttonStyle = (loading) => ({
  padding: "14px",
  backgroundColor: "#ff7a00",
  border: "none",
  borderRadius: "6px",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "15px",
  opacity: loading ? 0.7 : 1,
  transition: "opacity 0.2s"
});

export default Login;