import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../services/supabaseClient";
import { useAuth } from "../contexts/AuthContext";
import { FaCalendarAlt, FaMapMarkerAlt, FaExternalLinkAlt, FaTrashAlt, FaCheckCircle } from "react-icons/fa";

// --- COMPONENTE EXTRAÍDO ---
const EventoCard = ({ evento, onCancelar }) => (
  <div className="card" style={{ display: "flex", flexDirection: "column" }}>
    {evento.image && <img src={evento.image} alt={evento.title} className="event-image" />}
    
    <div className="event-card-content">
      <span style={{ color: "var(--secondary)", fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "6px" }}>
        <FaCheckCircle /> Presença Confirmada
      </span>
      
      <h3 style={{ marginTop: "0.5rem", marginBottom: "0.8rem" }}>{evento.title}</h3>
      <p style={{ color: "var(--primary)", fontSize: "0.88rem", marginBottom: "0.5rem" }}>{evento.category || "Comunidade"}</p>
      
      <p style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "0.3rem" }}>
        <FaCalendarAlt size={14} /> {evento.date}
      </p>
      <p style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
        <FaMapMarkerAlt size={14} /> {evento.location}
      </p>

      <div className="event-actions" style={{ marginTop: "auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        <Link to={`/evento/${evento.id}`} style={{ display: "block" }}>
          <button className="btn-detalhes" style={{ width: "100%", height: "45px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", whiteSpace: "nowrap" }}>
            <FaExternalLinkAlt size={12} /> Ver
          </button>
        </Link>
        <button onClick={() => onCancelar(evento.id)} className="btn-excluir" style={{ width: "100%", height: "45px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", whiteSpace: "nowrap" }}>
          <FaTrashAlt size={12} /> Cancelar
        </button>
      </div>
    </div>
  </div>
);

// --- COMPONENTE PRINCIPAL ---
function MinhasInscricoes() {
  const { user } = useAuth();
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarInscricoes() {
      if (!user) return;
      try {
        setLoading(true);
        const { data: inscricoes } = await supabase.from("inscricoes").select("evento_id").eq("usuario_id", user.id);
        
        if (inscricoes?.length > 0) {
          const { data: eventosData } = await supabase.from("eventos").select("*").in("id", inscricoes.map(i => i.evento_id));
          setEventos(eventosData || []);
        }
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    }
    carregarInscricoes();
  }, [user]);

  const handleCancelarInscricao = async (eventoId) => {
    if (!window.confirm("Cancelar inscrição neste evento?")) return;
    const { error } = await supabase.from("inscricoes").delete().eq("evento_id", eventoId).eq("usuario_id", user.id);
    if (!error) setEventos(eventos.filter((e) => e.id !== eventoId));
    else alert("Erro ao cancelar.");
  };

  if (loading) return <div className="loading">Carregando inscrições...</div>;

  return (
    <section className="section container">
      <div className="section-title">
        <span>Seus Eventos</span>
        <h2>Minhas Inscrições</h2>
      </div>

      {eventos.length === 0 ? (
        <p style={{ textAlign: "center", color: "var(--muted)" }}>Você não se inscreveu em nenhum evento.</p>
      ) : (
        <div className="grid">
          {eventos.map((evento) => (
            <EventoCard key={evento.id} evento={evento} onCancelar={handleCancelarInscricao} />
          ))}
        </div>
      )}
    </section>
  );
}

export default MinhasInscricoes;