import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../services/supabaseClient";
import { useAuth } from "../contexts/AuthContext";
import { FaTrashAlt, FaMapMarkerAlt, FaRegCalendarAlt, FaHeart, FaExternalLinkAlt } from "react-icons/fa";

// --- COMPONENTE DE CARD PADRONIZADO ---
const FavoritoCard = ({ fav, onRemover }) => {
  const evento = fav.eventos;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      style={{ 
        display: "flex", 
        flexDirection: "column", 
        backgroundColor: "#111827", 
        borderRadius: "16px", 
        overflow: "hidden", 
        border: isHovered ? "1px solid #3b82f6" : "1px solid rgba(255,255,255,0.03)",
        transition: "all 0.3s ease",
        transform: isHovered ? "translateY(-5px)" : "translateY(0)"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {evento.image ? (
        <img src={evento.image} alt={evento.title} style={{ width: "100%", height: "170px", objectFit: "cover", display: "block" }} />
      ) : (
        <div style={{ width: "100%", height: "170px", backgroundColor: "#1f2937", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <FaHeart size={40} color="#374151" />
        </div>
      )}

      <div style={{ flexGrow: 1, padding: "1.25rem" }}>
        <span style={{ color: "var(--secondary)", fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "8px" }}>
          {evento.category || "Geral"}
        </span>
        <h3 style={{ fontSize: "1.35rem", fontWeight: "700", color: "#ffffff", margin: "0 0 15px 0", lineHeight: "1.3" }}>
          {evento.title}
        </h3>
        
        <div style={{ color: "var(--text-soft)", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
          <FaRegCalendarAlt style={{ color: "var(--muted)" }} /> {evento.date}
        </div>
        <div style={{ color: "var(--text-soft)", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "8px" }}>
          <FaMapMarkerAlt style={{ color: "var(--muted)", flexShrink: 0 }} />
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{evento.location}</span>
        </div>
      </div>

      <div style={{ padding: "1.25rem", borderTop: "1px solid rgba(255,255,255,0.05)", backgroundColor: "rgba(0,0,0,0.1)" }}>
        <Link to={`/evento/${evento.id}`} style={{ display: "block", marginBottom: "10px" }}>
          <button style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "none", background: "var(--primary)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
            <FaExternalLinkAlt size={12} /> Ver Detalhes
          </button>
        </Link>
        <button 
          onClick={() => onRemover(fav.id)}
          style={{ 
            width: "100%", backgroundColor: "rgba(239, 68, 68, 0.1)", color: "#ef4444", border: "1px solid rgba(239, 68, 68, 0.2)",
            borderRadius: "8px", padding: "10px", fontSize: "0.85rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontWeight: "600"
          }}
        >
          <FaTrashAlt /> Remover dos Favoritos
        </button>
      </div>
    </div>
  );
};

function Favoritos() {
  const { user } = useAuth();
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarFavoritos() {
      if (!user) { setLoading(false); return; }
      try {
        const { data } = await supabase
          .from("favoritos")
          .select("id, evento_id, eventos (id, title, category, date, location, image)")
          .eq("usuario_id", user.id);
        
        setFavoritos((data || []).filter(item => item.eventos !== null));
      } catch (error) { console.error(error); }
      setLoading(false);
    }
    carregarFavoritos();
  }, [user]);

  const handleRemoverFavorito = async (idFavorito) => {
    if (!window.confirm("Remover dos favoritos?")) return;
    const { error } = await supabase.from("favoritos").delete().eq("id", idFavorito);
    if (!error) setFavoritos(prev => prev.filter(item => item.id !== idFavorito));
  };

  if (loading) return <div style={{ textAlign: "center", padding: "80px" }}>Carregando...</div>;

  return (
    <section className="section container" style={{ padding: "40px 0", minHeight: "80vh" }}>
      <div className="section-title" style={{ marginBottom: "40px", textAlign: "center" }}>
        <span>Seu Painel</span>
        <h2>Meus Favoritos</h2>
      </div>

      {favoritos.length === 0 ? (
        <p style={{ textAlign: "center", color: "var(--muted)" }}>Nenhum favorito salvo.</p>
      ) : (
        <div className="grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "25px" }}>
          {favoritos.map((fav) => (
            <FavoritoCard key={fav.id} fav={fav} onRemover={handleRemoverFavorito} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Favoritos;