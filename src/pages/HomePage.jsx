import { useState, useEffect, useMemo } from "react";
import Hero from "../components/Hero";
import SectionTitle from "../components/SectionTitle";
import EventCard from "../components/EventCard";
import EventForm from "../components/EventForm";
import StatCard from "../components/StatCard";
import FeatureCard from "../components/FeatureCard";
import { useAuth } from "../components/AuthContext";
import { supabase } from "../supabaseClient";
import { categories, stats, highlights } from "../data/data";

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const { isOrganizador } = useAuth();
  const [events, setEvents] = useState([]);

  // Função centralizada para buscar eventos
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

  // Busca inicial
  useEffect(() => {
    fetchEventos();
  }, []);

  const filteredEvents = useMemo(() => {
    return selectedCategory === "Todos" 
      ? events 
      : events.filter(e => e.category === selectedCategory);
  }, [selectedCategory, events]);

  const deleteEvent = async (id) => {
    if (window.confirm("Excluir este evento?")) {
      const { error } = await supabase
        .from('eventos')
        .delete()
        .eq('id', id);

      if (error) alert("Erro ao excluir: " + error.message);
      else setEvents(prev => prev.filter(e => e.id !== id));
    }
  };

  return (
    <>
      <Hero />
      <section className="section" id="funcionalidades">
        <div className="container">
          <SectionTitle title="O que você pode fazer" />
          <div className="grid">{highlights.map(item => <FeatureCard key={item.id} {...item} />)}</div>
        </div>
      </section>

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

      <section className="section" id="estatisticas">
        <div className="container">
          <div className="stats-grid">{stats.map(s => <StatCard key={s.id} {...s} />)}</div>
        </div>
      </section>

      {isOrganizador && (
        <section className="section alt-bg" id="cadastro">
          <div className="container">
            <SectionTitle title="Criar novo evento" />
            {/* Passamos a função fetchEventos para o formulário */}
            <EventForm onEventoAdicionado={fetchEventos} />
          </div>
        </section>
      )}
    </>
  );
}

export default HomePage;