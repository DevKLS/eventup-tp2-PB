import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CameraPicker from "./CameraPicker"; 
import { supabase } from "../supabaseClient"; 
import { useAuth } from "./AuthContext";

// Adicionei props na assinatura da função para receber a função de atualização
function EventForm({ onEventoAdicionado }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formKey, setFormKey] = useState(0);
  const [formData, setFormData] = useState({
    title: "", category: "", date: "", location: "", cep: "", image: null
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    let { name, value } = e.target;
    if (name === "cep") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length > 8) return; 
      let displayValue = numericValue;
      if (numericValue.length > 5) displayValue = numericValue.replace(/^(\d{5})(\d{1,3})/, "$1-$2");
      setFormData(prev => ({ ...prev, [name]: displayValue }));
      if (numericValue.length === 8) handleCepFetch(numericValue);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  }

  async function handleCepFetch(cepLimpo) {
    setMessage("Buscando endereço...");
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();
      if (data.erro) {
        setError(true);
        setMessage("CEP não encontrado.");
      } else {
        setFormData(prev => ({ ...prev, location: `${data.logradouro}, ${data.bairro} - ${data.localidade}` }));
        setMessage("Endereço encontrado!");
        setError(false);
      }
    } catch {
      setError(true);
      setMessage("Erro ao buscar CEP.");
    }
  }

  const handleImageCapture = (base64Data) => {
    setFormData(prev => ({ ...prev, image: base64Data }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user) return setMessage("Você precisa estar logado.");
    setIsSubmitting(true);
    try {
      const { error: insertError } = await supabase.from('eventos').insert({ 
           title: formData.title,
           category: formData.category,
           date: formData.date,
           location: formData.location,
           cep: formData.cep,
           image: formData.image,
           organizador_id: user.id 
      });
      if (insertError) {
        setMessage("Erro: " + insertError.message);
        setError(true);
      } else {
        setMessage("Evento criado com sucesso!");
        // Chama a função que atualiza a lista na HomePage instantaneamente
        if (onEventoAdicionado) onEventoAdicionado(); 
        
        // Limpa formulário após sucesso
        setFormData({ title: "", category: "", date: "", location: "", cep: "", image: null });
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) {
      setMessage("Erro fatal: " + err.message);
      setError(true);
    }
    setIsSubmitting(false);
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group"><label>Título</label><input name="title" value={formData.title} onChange={handleChange} required /></div>
      <div className="form-group"><label>Categoria</label><select name="category" value={formData.category} onChange={handleChange} required><option value="">Selecione</option>{['Feira', 'Workshop', 'Mutirão', 'Esporte', 'Cultura', 'Palestra', 'Educação', 'Social'].map(cat => <option key={cat} value={cat}>{cat}</option>)}</select></div>
      <div className="form-group"><label>Data</label><input type="date" name="date" value={formData.date} onChange={handleChange} required /></div>
      <div className="form-group"><label>CEP</label><input name="cep" value={formData.cep} onChange={handleChange} placeholder="00000-000" maxLength={9} required /></div>
      <div className="form-group"><label>Localização</label><input name="location" value={formData.location} readOnly /></div>
      <div className="form-group"><label>Foto</label><CameraPicker onImageCapture={handleImageCapture} /></div>
      
      <button 
        type="submit" 
        disabled={isSubmitting}
        style={{
          background: isSubmitting ? "var(--bg-soft)" : "linear-gradient(90deg, #007aff 0%, #ff7a00 100%)",
          color: "var(--text)",
          padding: "14px 20px",
          border: "none",
          borderRadius: "8px",
          fontWeight: "bold",
          cursor: isSubmitting ? "not-allowed" : "pointer",
          width: "100%",
          marginTop: "20px",
          fontSize: "16px",
          boxShadow: "var(--shadow)",
          transition: "transform 0.2s ease, opacity 0.2s ease"
        }}
        onMouseOver={(e) => !isSubmitting && (e.currentTarget.style.opacity = "0.9")}
        onMouseOut={(e) => !isSubmitting && (e.currentTarget.style.opacity = "1")}
      >
        {isSubmitting ? "Salvando..." : "Salvar evento"}
      </button>

      {message && <p className={error ? "error" : "success"} style={{ marginTop: "15px", textAlign: "center", fontWeight: "bold" }}>{message}</p>}
    </form>
  );
}
export default EventForm;