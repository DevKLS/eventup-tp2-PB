import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

/**
 * Componente responsável por buscar e exibir a listagem completa de eventos
 * armazenados no Supabase, ordenados cronologicamente.
 */
function EventList() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEventos();
  }, []);

  const fetchEventos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('eventos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error("Erro ao buscar eventos:", error.message);
    else setEventos(data || []);
    
    setLoading(false);
  };

  if (loading) return <p>Carregando eventos...</p>;

  return (
    <div className="event-list">
      <h2>Eventos Cadastrados</h2>
      {eventos.length === 0 ? (
        <p>Nenhum evento encontrado.</p>
      ) : (
        eventos.map((ev) => (
          <div key={ev.id} className="event-card" style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
            <h3>{ev.title}</h3>
            <p><strong>Categoria:</strong> {ev.category}</p>
            <p><strong>Data:</strong> {ev.date}</p>
            <p><strong>Local:</strong> {ev.location}</p>
            {ev.image && (
              <img src={ev.image} alt="Capa do evento" style={{ maxWidth: "200px", display: "block" }} />
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default EventList;