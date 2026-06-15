import { useState, useEffect, useMemo } from "react";
import Hero from "../components/Hero";
import SectionTitle from "../components/SectionTitle";
import EventCard from "../components/EventCard";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../services/supabaseClient"; 
import { categories } from "../data/data";

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  // Armazena a lista de eventos carregados do banco de dados
  const [events, setEvents] = useState([]);

  // Busca os eventos cadastrados no Supabase
  async function fetchEventos() {
    const { data, error } = await supabase
      .from('eventos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Erro ao buscar eventos:", error);
    } else {
      setEvents(data || []);
    }
  }

  // Executa a busca dos eventos quando a página é carregada
  useEffect(() => {
    fetchEventos();
  }, []);

  // Filtra os eventos conforme a categoria selecionada
  const filteredEvents = useMemo(() => {
    return selectedCategory === "Todos" 
      ? events 
      : events.filter(e => e.category === selectedCategory);
  }, [selectedCategory, events]);

  // Remove um evento do banco de dados e atualiza a lista na tela
  const deleteEvent = async (id) => {
    if (window.confirm("Excluir este evento?")) {
      const { error } = await supabase
        .from('eventos')
        .delete()
        .eq('id', id);

      if (!error) {
        setEvents(prev => prev.filter(e => e.id !== id));
      } else {
        alert("Erro ao excluir: " + error.message);
      }
    }
  };

  return (
    <>
      <Hero />

      <section className="section" id="eventos">
        <div className="container">
          <SectionTitle title="Eventos em destaque" />

          {/* Permite filtrar os eventos por categoria */}
          <div className="filter-bar">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Exibe os eventos filtrados */}
          <div className="grid">
            {filteredEvents.map(ev => (
              <EventCard
                key={ev.id}
                {...ev}
                onDelete={() => deleteEvent(ev.id)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;