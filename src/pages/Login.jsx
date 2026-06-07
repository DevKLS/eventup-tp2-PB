import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaChevronLeft, FaGoogle } from "react-icons/fa";
import { supabase } from "../supabaseClient";

/**
 * Componente de Login.
 * Gerencia autenticação via e-mail/senha e integração OAuth (Google).
 */
function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", senha: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.senha,
    });

    if (error) setErrorMessage("E-mail ou senha inválidos.");
    else navigate("/");
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) setErrorMessage(`Erro no login Google: ${error.message}`);
  };

  const updateField = (field, val) => setFormData(p => ({ ...p, [field]: val }));

  return (
    <div className="auth-container">
      <div className="auth-card">
        <Link to="/" className="back-link">
          <FaChevronLeft size={10} /> Voltar para o Início
        </Link>

        <h1>Login</h1>

        {errorMessage && <div className="error-alert">{errorMessage}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Digite seu email" value={formData.email} onChange={(e) => updateField("email", e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <input type="password" placeholder="Digite sua senha" value={formData.senha} onChange={(e) => updateField("senha", e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary full-width">Entrar</button>
        </form>

        <button onClick={handleGoogleLogin} style={googleButtonStyle}>
          <FaGoogle color="#DB4437" /> Entrar com Google
        </button>

        <p className="auth-footer">
          Não possui conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}

const googleButtonStyle = {
  marginTop: "15px", padding: "10px", backgroundColor: "#fff", border: "1px solid #ccc",
  borderRadius: "6px", color: "#333", fontWeight: "bold", cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", width: "100%"
};

export default Login;