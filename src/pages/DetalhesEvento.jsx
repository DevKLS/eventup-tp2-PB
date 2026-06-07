import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import { supabase } from "../supabaseClient";

function DetalhesEvento() {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmado, setConfirmado] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    async function fetchEvento() {
      setLoading(true);
      const { data, error } = await supabase
        .from('eventos')
        .select('*')
        .eq('id', id)
        .single();

      if (error) console.error("Erro ao buscar:", error);
      else setEvento(data);
      setLoading(false);
    }
    fetchEvento();
  }, [id]);

  // Função de clique integrada
  const handleConfirmar = () => {
    setConfirmado(!confirmado);
    setFeedback(!confirmado ? "Presença confirmada com sucesso!" : "Presença removida.");
    setTimeout(() => setFeedback(""), 3000);
  };

  if (loading) return <p style={{ textAlign: "center", marginTop: "50px" }}>Carregando...</p>;
  if (!evento) return <p style={{ textAlign: "center", marginTop: "50px" }}>Evento não encontrado.</p>;

  return (
    <>
      <Header />
      <div className="page-details-layout">
        <div className="details-content-box">
          <div className="details-card">
            <Link to="/" className="back-link">← Voltar para a listagem</Link>
            {evento.image && <img src={evento.image} alt={evento.title} className="details-image" />}
            
            <h1>{evento.title}</h1>
            <span className="details-category">{evento.category}</span>
            
            <div style={{ margin: "20px 0" }}>
              <p className="details-info">📅 {evento.date}</p>
              <p className="details-info">📍 {evento.location}</p>
            </div>
            
            <div className="details-description">
              <p>{evento.description || "Nenhuma descrição disponível."}</p>
            </div>

            <div className="action-area" style={{ marginTop: "30px", borderTop: "1px solid var(--border)", paddingTop: "20px" }}>
              <button
                onClick={handleConfirmar}
                style={{
                  background: confirmado
                    ? "linear-gradient(90deg, rgba(0, 122, 255, 0.4) 0%, rgba(255, 122, 0, 0.4) 100%)"
                    : "linear-gradient(90deg, #007aff 0%, #ff7a00 100%)",
                  color: confirmado ? "rgba(255, 255, 255, 0.7)" : "white",
                  padding: "14px 20px",
                  border: confirmado ? "1px solid rgba(255, 255, 255, 0.2)" : "none",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  width: "100%",
                  fontSize: "16px",
                  boxShadow: confirmado ? "0 0 15px rgba(0, 122, 255, 0.5)" : "var(--shadow)",
                  transition: "all 0.4s ease",
                }}
              >
                {confirmado ? "✓ Presença Confirmada" : "Confirmar Presença"}
              </button>

              {/* Exibição do feedback */}
              {feedback && (
                <div style={{
                  marginTop: "15px",
                  padding: "10px",
                  borderRadius: "8px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid var(--primary)",
                  color: "white",
                  textAlign: "center",
                  fontSize: "0.9rem"
                }}>
                  {feedback}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetalhesEvento;