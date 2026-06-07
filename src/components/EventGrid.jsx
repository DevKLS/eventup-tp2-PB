import { useState, useEffect } from "react";
import EventCard from "./EventCard";

/**
 * Gerencia a listagem, filtragem e remoção de eventos.
 * Implementa padrão de fallback para simulação de dados em caso de falha na API.
 */
function EventGrid() {
  const [eventos, setEventos] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);

  const carregarEventos = async () => {
    setCarregando(true);
    try {
      const resposta = await fetch("https://api.mockaroo.com/api/exemplo-fake-api");
      const dados = await resposta.json();
      setEventos(dados);
    } catch {
      // Fallback para ambiente de desenvolvimento/demo
      setEventos([
        { id: 1, title: "Workshop de React Native", category: "Tecnologia", date: "12/10/2026", location: "Instituto Infnet", description: "Desenvolvimento front-end avançado.", image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80" },
        { id: 2, title: "Festival de Inovação", category: "Inovação", date: "25/11/2026", location: "Online", description: "Tendências de info-produtos.", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80" },
        { id: 3, title: "UX/UI Design & Branding", category: "Design", date: "05/12/2026", location: "Auditório", description: "Construção de identidades visuais.", image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80" }
      ]);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => { carregarEventos(); }, []);

  const handleExcluirEvento = (id) => {
    setEventos((prev) => prev.filter((ev) => ev.id !== id));
  };

  const eventosFiltrados = eventos.filter((ev) => 
    ev.title.toLowerCase().includes(busca.toLowerCase()) || 
    ev.category.toLowerCase().includes(busca.toLowerCase())
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
        <div className="event-grid">
          {eventosFiltrados.length > 0 ? (
            eventosFiltrados.map((ev) => (
              <EventCard key={ev.id} {...ev} onDelete={handleExcluirEvento} />
            ))
          ) : (
            <p className="no-events">Nenhum evento encontrado.</p>
          )}
        </div>
      )}
    </section>
  );
}

export default EventGrid;