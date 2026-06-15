import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

/**
 * Página responsável pela exibição das informações
 * do usuário autenticado na aplicação.
 * Também disponibiliza a funcionalidade de logout.
 */
function Perfil() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Verifica se existe um usuário autenticado
  if (!user) {
    return (
      <div className="auth-container">
        <div className="auth-card" style={{ textAlign: "center" }}>
          <h1>Acesso Restrito</h1>
          <p>Você precisa estar logado.</p>
          <button className="btn btn-primary full-width" onClick={() => navigate("/login")}>
            Ir para Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <div className="profile-card">
          <Link to="/" className="back-link">
            <FaChevronLeft size={12} /> Voltar para o Início
          </Link>
          
          <h1>Meu Perfil</h1>

          <ProfileField
            label="Nome"
            value={user.user_metadata?.full_name || "Usuário"}
          />

          <ProfileField
            label="Email"
            value={user.email || ""}
          />

          <button
            className="btn btn-secondary full-width"
            onClick={logout}
          >
            Sair da Conta
          </button>
        </div>
      </div>
    </section>
  );
}

/**
 * Componente reutilizável utilizado para exibir
 * informações do perfil em formato somente leitura.
 */
const ProfileField = ({ label, value }) => (
  <div className="form-group" style={{ marginBottom: "15px" }}>
    <label>{label}</label>
    <input
      type="text"
      value={value}
      readOnly
    />
  </div>
);

export default Perfil;