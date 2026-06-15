import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaUserPlus } from "react-icons/fa";
import { supabase } from "../services/supabaseClient";

/*
 * Tela responsável pelo cadastro de novos usuários.
 * O perfil do usuário é definido automaticamente a partir do domínio do e-mail.
 */
function Cadastro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: ""
  });
  const [loading, setLoading] = useState(false);

  const handleCadastroSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Define o tipo de usuário com base no domínio do e-mail
    const emailLimpo = formData.email.trim().toLowerCase();
    const role = emailLimpo.endsWith("@eventup.com")
      ? "organizador"
      : "participante";

    try {
      const { error } = await supabase.auth.signUp({
        email: emailLimpo,
        password: formData.senha,
        options: {
          data: {
            full_name: formData.nome,
            role
          }
        }
      });

      if (error) throw error;

      alert("Cadastro realizado! Verifique seu e-mail.");
      navigate("/login");
    } catch (err) {
      alert(`Erro ao criar conta: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field, value) =>
    setFormData((p) => ({ ...p, [field]: value }));

  return (
    <div
      className="container"
      style={{
        padding: "60px 20px",
        maxWidth: "500px",
        margin: "0 auto"
      }}
    >
      <Link
        to="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          color: "#8b949e",
          textDecoration: "none",
          marginBottom: "20px"
        }}
      >
        <FaArrowLeft /> Voltar para o Início
      </Link>

      <div
        style={{
          backgroundColor: "#161b22",
          padding: "40px",
          borderRadius: "12px",
          border: "1px solid #30363d"
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px"
          }}
        >
          <FaUserPlus
            style={{
              color: "#ff7a00",
              fontSize: "40px",
              marginBottom: "10px"
            }}
          />

          <h2 style={{ color: "#fff", margin: 0 }}>
            Criar sua conta
          </h2>
        </div>

        <form
          onSubmit={handleCadastroSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px"
          }}
        >
          <input
            type="text"
            placeholder="Nome Completo"
            value={formData.nome}
            onChange={(e) => updateField("nome", e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Senha"
            value={formData.senha}
            onChange={(e) => updateField("senha", e.target.value)}
            required
            style={inputStyle}
          />

          <button
            type="submit"
            disabled={loading}
            style={buttonStyle(loading)}
          >
            {loading ? "Cadastrando..." : "Finalizar Cadastro"}
          </button>
        </form>

        <p
          style={{
            marginTop: "25px",
            fontSize: "14px",
            color: "#8b949e",
            textAlign: "center"
          }}
        >
          Já tem uma conta?{" "}
          <Link
            to="/login"
            style={{
              color: "#ff7a00",
              textDecoration: "none"
            }}
          >
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}

// Estilos reutilizados pelos campos do formulário
const inputStyle = {
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid #30363d",
  backgroundColor: "#0d1117",
  color: "#fff"
};

// Estilo do botão com alteração visual durante o carregamento
const buttonStyle = (loading) => ({
  padding: "14px",
  backgroundColor: "#ff7a00",
  border: "none",
  borderRadius: "6px",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
  opacity: loading ? 0.7 : 1
});

export default Cadastro;