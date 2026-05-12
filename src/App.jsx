import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useMemo, useState } from "react";

import Header from "./components/Header";
import Hero from "./components/Hero";
import SectionTitle from "./components/SectionTitle";
import EventCard from "./components/EventCard";
import EventForm from "./components/EventForm";
import StatCard from "./components/StatCard";
import FeatureCard from "./components/FeatureCard"; // ✅ ADICIONADO

import DetalhesEvento from "./pages/DetalhesEvento";

import { 
  categories, 
  events as initialEvents, 
  stats, 
  highlights // ✅ ADICIONADO
} from "./data/data";

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [events, setEvents] = useState(initialEvents);

  const filteredEvents = useMemo(() => {
    if (selectedCategory === "Todos") return events;
    return events.filter((event) => event.category === selectedCategory);
  }, [selectedCategory, events]);

  function addEvent(newEvent) {
    const newId =
      events.length > 0
        ? Math.max(...events.map((e) => e.id)) + 1
        : 1;

    const eventWithId = {
      ...newEvent,
      id: newId,
    };

    setEvents((prev) => [...prev, eventWithId]);
  }

  function deleteEvent(id) {
    const confirmar = window.confirm("Tem certeza que deseja excluir?");
    if (confirmar) {
      setEvents((prev) => prev.filter((event) => event.id !== id));
    }
  }

  return (
    <>
      <Header />

      <main>
        <Hero />

        {/* FUNCIONALIDADES */}
        <section className="section" id="funcionalidades">
          <div className="container">
            <SectionTitle
              eyebrow="Funcionalidades"
              title="O que você pode fazer"
              text="Explore os principais recursos da plataforma."
            />

            <div className="grid">
              {highlights.map((item) => (
                <FeatureCard key={item.id} {...item} />
              ))}
            </div>
          </div>
        </section>

        {/* EVENTOS */}
        <section className="section" id="eventos">
          <div className="container">
            <SectionTitle
              eyebrow="Eventos"
              title="Eventos em destaque"
              text="Listagem dinâmica com filtro por categoria."
            />

            <div className="filter-bar">
              <label>Filtrar por categoria:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="grid">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  {...event}
                  onDelete={deleteEvent}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ESTATÍSTICAS */}
        <section className="section" id="estatisticas">
          <div className="container">
            <SectionTitle
              eyebrow="Métricas"
              title="Visão geral da plataforma"
              text="Indicadores da aplicação."
            />

            <div className="stats-grid">
              {stats.map((stat) => (
                <StatCard key={stat.id} {...stat} />
              ))}
            </div>
          </div>
        </section>

        {/* FORMULÁRIO */}
        <section className="section alt-bg" id="cadastro">
          <div className="container contact-wrapper">
            <SectionTitle
              eyebrow="Cadastro"
              title="Criar novo evento"
            />
            <EventForm onAddEvent={addEvent} />
          </div>
        </section>
      </main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/evento/:id" element={<DetalhesEvento />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;