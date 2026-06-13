import { useState, useEffect, useMemo } from "react";
import Hero from "../components/Hero";
import SectionTitle from "../components/SectionTitle";
import EventCard from "../components/EventCard";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../services/supabaseClient"; 
import { categories } from "../data/data";

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [events, setEvents] = useState([]); 

  // Função para buscar dados
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

  // Apenas busca os dados ao montar a página
  useEffect(() => {
    fetchEventos();
  }, []); // <--- Array vazio garante que rode apenas UMA vez ao abrir a página

  const filteredEvents = useMemo(() => {
    return selectedCategory === "Todos" 
      ? events 
      : events.filter(e => e.category === selectedCategory);
  }, [selectedCategory, events]);

  const deleteEvent = async (id) => {
    if (window.confirm("Excluir este evento?")) {
      const { error } = await supabase.from('eventos').delete().eq('id', id);
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
          <div className="filter-bar">
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="grid">
            {filteredEvents.map(ev => (
              <EventCard key={ev.id} {...ev} onDelete={() => deleteEvent(ev.id)} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;