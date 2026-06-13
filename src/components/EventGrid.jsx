import { useState, useEffect } from "react";
import EventCard from "./EventCard";
import { supabase } from "../services/supabaseClient"; 

function EventGrid() {
  const [eventos, setEventos] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);

  const carregarEventos = async () => {
    setCarregando(true);
    try {
      const { data, error } = await supabase
        .from("eventos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setEventos(data || []);
    } catch (err) { // <--- CORRIGIDO: Removida a chave sobressalente que quebrava a sintaxe
      console.error("Erro ao carregar Supabase, usando fallback local:", err.message);
      setEventos([
        { 
          id: 1, 
          title: "Workshop de React Native", 
          category: "Tecnologia", 
          date: "2026-10-12", 
          location: "Instituto Infnet", 
          description: "Desenvolvimento front-end avançado.",
          image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80"
        }
      ]);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => { 
    carregarEventos(); 
  }, []);

  const handleExcluirEvento = async (id) => {
    try {
      const { error } = await supabase.from("eventos").delete().eq("id", id);
      if (error) throw error;
      setEventos((prev) => prev.filter((ev) => ev.id !== id));
    } catch (err) {
      alert("Erro ao deletar do banco: " + err.message);
    }
  };

  const eventosFiltrados = eventos.filter((ev) => 
    ev.title?.toLowerCase().includes(busca.toLowerCase()) || 
    ev.category?.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <section className="event-section container" id="eventos">
      <div className="section-header">
        <h2>Descobrir Eventos</h2>
        <button onClick={carregarEventos} className="refresh-btn">🔄 Atualizar</button>
      </div>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Filtrar por nome ou categoria..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      {carregando ? (
        <div className="loading">Carregando eventos...</div>
      ) : (
        <div className="grid event-grid">
          {eventosFiltrados.length > 0 ? (
            eventosFiltrados.map((ev) => (
              <EventCard key={ev.id} {...ev} onDelete={handleExcluirEvento} />
            ))
          ) : (
            <p className="no-events" style={{ color: "var(--muted)", gridColumn: "1 / -1", textAlign: "center", padding: "2rem 0" }}>
              Nenhum evento encontrado.
            </p>
          )}
        </div>
      )}
    </section>
  );
}

export default EventGrid;