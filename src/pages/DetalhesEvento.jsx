import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient";
import { useAuth } from "../contexts/AuthContext";
// Ícones profissionais
import { 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaMailBulk, 
  FaTicketAlt, 
  FaHeart, 
  FaRegHeart, 
  FaCheckCircle, 
  FaArrowLeft 
} from "react-icons/fa";

function DetalhesEvento() {
  const { id } = useParams();
  const { user } = useAuth();

  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmado, setConfirmado] = useState(false);
  const [loadingInscricao, setLoadingInscricao] = useState(false);
  const [favoritado, setFavoritado] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    carregarDados();
  }, [id, user]);

  async function carregarDados() {
    setLoading(true);

    const { data: eventoData, error: eventoError } = await supabase
      .from("eventos")
      .select("*")
      .eq("id", id)
      .single();

    if (eventoError) {
      console.error(eventoError);
    } else {
      setEvento(eventoData);
    }

    if (user) {
      const { data: inscricao } = await supabase
        .from("inscricoes")
        .select("*")
        .eq("usuario_id", user.id)
        .eq("evento_id", id)
        .maybeSingle();

      setConfirmado(!!inscricao);

      const { data: favorito } = await supabase
        .from("favoritos")
        .select("*")
        .eq("usuario_id", user.id)
        .eq("evento_id", id)
        .maybeSingle();

      setFavoritado(!!favorito);
    }

    setLoading(false);
  }

  async function handleConfirmar() {
    if (!user) {
      setFeedback("Faça login para se inscrever.");
      return;
    }

    setLoadingInscricao(true);

    try {
      if (!confirmado) {
        const { error } = await supabase
          .from("inscricoes")
          .insert({
            usuario_id: user.id,
            evento_id: evento.id,
          });

        if (error) throw error;

        setConfirmado(true);
        setFeedback("Inscrição realizada com sucesso!");
      } else {
        const { error } = await supabase
          .from("inscricoes")
          .delete()
          .eq("usuario_id", user.id)
          .eq("evento_id", evento.id);

        if (error) throw error;

        setConfirmado(false);
        setFeedback("Inscrição cancelada.");
      }
    } catch (error) {
      console.error(error);
      setFeedback("Erro ao ajustar inscrição.");
    }

    setLoadingInscricao(false);

    setTimeout(() => {
      setFeedback("");
    }, 3000);
  }

  async function handleFavoritar() {
    if (!user) {
      setFeedback("Faça login para favoritar.");
      return;
    }

    try {
      if (!favoritado) {
        await supabase.from("favoritos").insert({
          usuario_id: user.id,
          evento_id: evento.id,
        });

        setFavoritado(true);
        setFeedback("Evento adicionado aos favoritos!");
      } else {
        await supabase
          .from("favoritos")
          .delete()
          .eq("usuario_id", user.id)
          .eq("evento_id", evento.id);

        setFavoritado(false);
        setFeedback("Evento removido dos favoritos.");
      }
    } catch (error) {
      console.error(error);
    }

    setTimeout(() => {
      setFeedback("");
    }, 3000);
  }

  if (loading) {
    return (
      <div className="container" style={{ padding: "80px 0", textAlign: "center" }}>
        <h2 style={{ color: "var(--text-soft)" }}>Buscando detalhes do evento...</h2>
      </div>
    );
  }

  if (!evento) {
    return (
      <div className="container" style={{ padding: "80px 0", textAlign: "center" }}>
        <h2 style={{ color: "var(--text-soft)" }}>Evento não encontrado.</h2>
        <Link to="/" className="btn btn-secondary" style={{ marginTop: "20px", display: "inline-block" }}>
          Voltar para Home
        </Link>
      </div>
    );
  }

  return (
    <section className="section" style={{ padding: "40px 0", minHeight: "85vh" }}>
      <div className="container">
        
        {/* Link de retorno */}
        <Link to="/" className="back-link" style={{ 
          display: "inline-flex", 
          alignItems: "center", 
          gap: "8px", 
          color: "var(--muted)", 
          textDecoration: "none",
          marginBottom: "25px",
          fontSize: "0.95rem",
          transition: "color 0.2s"
        }}
        onMouseOver={(e) => e.currentTarget.style.color = "#ffffff"}
        onMouseOut={(e) => e.currentTarget.style.color = "var(--muted)"}
        >
          <FaArrowLeft size={14} /> Voltar para eventos
        </Link>

        {/* Layout Split: Reduzimos a proporção da esquerda com o max-width */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "window" in globalThis && window.innerWidth < 992 ? "1fr" : "minmax(0, 1.8fr) minmax(310px, 1fr)", 
          gap: "35px",
          alignItems: "start"
        }}>
          
          {/* LADO ESQUERDO: CARD PRINCIPAL COMPACTADO */}
          <div className="card" style={{ padding: "0", overflow: "hidden", maxWidth: "720px" }}>
            {evento.image && (
              <img
                src={evento.image}
                alt={evento.title}
                style={{ 
                  width: "100%", 
                  maxHeight: "320px", // Reduzido de 420px para 320px para suavizar o impacto visual
                  objectFit: "cover", 
                  display: "block",
                  borderBottom: "1px solid var(--border)"
                }}
              />
            )}

            <div style={{ padding: "24px" }}> {/* Reduzido o padding interno levemente */}
              <span className="hero-tag" style={{ fontSize: "0.75rem", textTransform: "uppercase", padding: "4px 10px" }}>
                {evento.category || "Comunidade"}
              </span>
              
              {/* Título mais compacto e proporcional */}
              <h1 style={{ fontSize: "1.8rem", fontWeight: "800", color: "#ffffff", margin: "12px 0 20px 0", letterSpacing: "-0.5px" }}>
                {evento.title}
              </h1>

              <div className="details-description" style={{ borderTop: "1px solid var(--border)", paddingTop: "20px" }}>
                <h3 style={{ fontSize: "1.1rem", color: "#ffffff", marginBottom: "10px", fontWeight: "600" }}>
                  Sobre o evento
                </h3>
                <p style={{ color: "var(--muted)", lineHeight: "1.6", fontSize: "0.95rem", margin: 0 }}>
                  {evento.description || "Nenhuma descrição adicional informada para este evento comunitário."}
                </p>
              </div>
            </div>
          </div>

          {/* LADO DIREITO: SIDEBAR DE INFORMAÇÕES E AÇÕES */}
          <div className="card" style={{ padding: "25px", position: "sticky", top: "30px" }}>
            <h3 style={{ fontSize: "1.1rem", color: "#ffffff", marginBottom: "20px", fontWeight: "600" }}>
              Informações Gerais
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "25px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--muted)", fontSize: "0.95rem" }}>
                <FaCalendarAlt style={{ color: "var(--primary)", flexShrink: 0 }} size={16} />
                <span>{evento.date}</span>
              </div>
              
              <div style={{ display: "flex", alignItems: "start", gap: "12px", color: "var(--muted)", fontSize: "0.95rem" }}>
                <FaMapMarkerAlt style={{ color: "var(--secondary)", flexShrink: 0, marginTop: "3px" }} size={16} />
                <span>{evento.location}</span>
              </div>

              {evento.cep && (
                <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--muted)", fontSize: "0.95rem" }}>
                  <FaMailBulk style={{ color: "var(--primary)", flexShrink: 0 }} size={16} />
                  <span>CEP: {evento.cep}</span>
                </div>
              )}

              {evento.vagas && (
                <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--muted)", fontSize: "0.95rem" }}>
                  <FaTicketAlt style={{ color: "var(--secondary)", flexShrink: 0 }} size={16} />
                  <span>{evento.vagas} vagas restantes</span>
                </div>
              )}
            </div>

            {/* Container de Botões */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <button
                className={`btn ${confirmado ? "btn-secondary" : "btn-primary"}`}
                onClick={handleConfirmar}
                disabled={loadingInscricao}
                style={{ 
                  width: "100%", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  gap: "10px",
                  fontWeight: "600",
                  padding: "14px"
                }}
              >
                {confirmado ? <FaCheckCircle size={16} /> : null}
                {loadingInscricao ? "Processando..." : confirmado ? "Inscrição Confirmada" : "Garantir minha vaga"}
              </button>

              <button
                onClick={handleFavoritar}
                style={{ 
                  width: "100%", 
                  padding: "12px", 
                  borderRadius: "8px", 
                  border: "1px solid var(--border)", 
                  background: favoritado ? "rgba(239, 68, 68, 0.1)" : "rgba(255, 255, 255, 0.02)", 
                  color: favoritado ? "#ef4444" : "var(--muted)", 
                  cursor: "pointer",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "all 0.2s ease"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = favoritado ? "#ef4444" : "var(--text-soft)";
                  if(!favoritado) e.currentTarget.style.color = "#ffffff";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  if(!favoritado) e.currentTarget.style.color = "var(--muted)";
                }}
              >
                {favoritado ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
                {favoritado ? "Salvo nos Favoritos" : "Adicionar aos Favoritos"}
              </button>
            </div>

            {/* Feedback */}
            {feedback && (
              <div style={{ 
                marginTop: "15px", 
                padding: "12px", 
                borderRadius: "6px", 
                backgroundColor: "rgba(255,255,255,0.04)", 
                borderLeft: "4px solid var(--primary)",
                color: "#ffffff",
                fontSize: "0.88rem",
                textAlign: "center"
              }}>
                {feedback}
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}

export default DetalhesEvento;