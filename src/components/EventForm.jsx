import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import CameraPicker from "./CameraPicker";
import { supabase } from "../services/supabaseClient";
import { useAuth } from "../contexts/AuthContext";

function EventForm({ onEventoAdicionado }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Chave para forçar a re-renderização do componente CameraPicker quando necessário
  const [formKey, setFormKey] = useState(0);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    location: "",
    cep: "",
    image: null
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Manipula mudanças nos inputs e formata o CEP automaticamente
  function handleChange(e) {
    let { name, value } = e.target;

    if (name === "cep") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length > 8) return;

      let displayValue = numericValue;
      if (numericValue.length > 5) {
        displayValue = numericValue.replace(/^(\d{5})(\d{1,3})/, "$1-$2");
      }
      setFormData(prev => ({ ...prev, [name]: displayValue }));

      if (numericValue.length === 8) {
        handleCepFetch(numericValue);
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  }

  // Busca dados de endereço via API ViaCEP
  async function handleCepFetch(cepLimpo) {
    setMessage("Buscando endereço...");
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();

      if (data.erro) {
        setError(true);
        setMessage("CEP não encontrado.");
      } else {
        setFormData(prev => ({
          ...prev,
          location: `${data.logradouro}, ${data.bairro} - ${data.localidade}/${data.uf}`
        }));
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

  // Processa o envio do formulário
  async function handleSubmit(e) {
    e.preventDefault();

    if (!user) {
      setError(true);
      return setMessage("Você precisa estar logado para criar um evento.");
    }

    const ehAdministrador = user.email?.endsWith("@eventup.com");
    if (!ehAdministrador) {
      setError(true);
      return setMessage("Acesso negado: Apenas administradores podem criar eventos.");
    }

    setIsSubmitting(true);
    setError(false);
    setMessage("Salvando evento...");

    try {
      const { error: insertError } = await supabase
        .from("eventos")
        .insert({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          date: formData.date,
          location: formData.location,
          cep: formData.cep,
          image: formData.image,
          organizador_id: user.id
        });

      if (insertError) {
        setMessage("Erro ao salvar: " + insertError.message);
        setError(true);
      } else {
        setMessage("Evento criado com sucesso!");
        if (onEventoAdicionado) onEventoAdicionado();
        
        // Reseta o estado do formulário
        setFormData({ title: "", description: "", category: "", date: "", location: "", cep: "", image: null });
        setFormKey(prev => prev + 1);
        setTimeout(() => setMessage(""), 4000);
      }
    } catch (err) {
      setMessage("Erro inesperado: " + err.message);
      setError(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    /* Adicionamos aria-label="form-evento" para que o teste encontre o formulário via role */
    <form className="contact-form" onSubmit={handleSubmit} aria-label="form-evento">
      <div className="form-group">
        <label htmlFor="title">Título do Evento</label>
        <input id="title" name="title" value={formData.title} onChange={handleChange} required placeholder="Ex: Workshop Avançado de React" />
      </div>

      <div className="form-group">
        <label htmlFor="description">Descrição do Evento</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleChange} required placeholder="Conte um pouco sobre o evento..." />
      </div>

      <div className="form-group">
        <label htmlFor="category">Categoria</label>
        <select id="category" name="category" value={formData.category} onChange={handleChange} required>
          <option value="">Selecione uma categoria</option>
          {["Feira", "Workshop", "Mutirão", "Esporte", "Cultura", "Palestra", "Educação", "Social"].map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="date">Data de Realização</label>
        <input id="date" type="date" name="date" value={formData.date} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="cep">CEP</label>
        <input id="cep" name="cep" value={formData.cep} onChange={handleChange} placeholder="00000-000" maxLength={9} required />
      </div>

      <div className="form-group">
        <label htmlFor="location">Localização Completa</label>
        <input id="location" name="location" value={formData.location} onChange={handleChange} required placeholder="Rua, Número, Bairro - Cidade/UF" />
      </div>

      <div className="form-group">
        <label>Foto de Capa do Evento</label>
        <CameraPicker key={formKey} onImageCapture={handleImageCapture} />
      </div>

      <button type="submit" disabled={isSubmitting} className={`btn-submit-form ${isSubmitting ? "btn-disabled" : ""}`}>
        {isSubmitting ? "Salvando..." : "Salvar evento"}
      </button>

      {message && (
        <p className={`form-message ${error ? "error-message" : "success-message"}`}>
          {message}
        </p>
      )}
    </form>
  );
}

export default EventForm;