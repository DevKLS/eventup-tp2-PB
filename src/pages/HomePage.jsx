import { useState, useEffect, useMemo } from "react";
import Hero from "../components/Hero";
import SectionTitle from "../components/SectionTitle";
import EventCard from "../components/EventCard";
import EventForm from "../components/EventForm";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../services/supabaseClient";
import { categories } from "../data/data"; // Lista de categorias disponíveis para filtragem

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const { isOrganizador } = useAuth();
  const [events, setEvents] = useState([]);

  // Responsável por carregar os eventos cadastrados no banco de dados
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

  // Executa a busca inicial dos eventos ao abrir a página
  useEffect(() => {
    fetchEventos();
  }, []);

  // Filtra os eventos de acordo com a categoria selecionada
  const filteredEvents = useMemo(() => {
    return selectedCategory === "Todos" 
      ? events 
      : events.filter(e => e.category === selectedCategory);
  }, [selectedCategory, events]);

  // Remove um evento do banco de dados e atualiza a interface
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
      {/* Seção principal de apresentação da plataforma */}
      <Hero />

      {/* Área de exibição dos eventos com filtro por categoria */}
      <section className="section" id="eventos">
        <div className="container">
          <SectionTitle title="Eventos em destaque" />

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

      {/* Formulário disponível apenas para usuários organizadores */}
      {isOrganizador && (
        <section className="section alt-bg" id="cadastro">
          <div className="container">
            <SectionTitle title="Criar novo evento" />

            {/* Após criar um evento, atualiza automaticamente a lista */}
            <EventForm onEventoAdicionado={fetchEventos} />
          </div>
        </section>
      )}
    </>
  );
}

export default HomePage;