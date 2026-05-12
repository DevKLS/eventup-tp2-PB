import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 

import Hero from "./components/Hero";
import EventCard from "./components/EventCard";
import EventForm from "./components/EventForm";
import SectionTitle from "./components/SectionTitle";
import StatCard from "./components/StatCard";

import { events as initialEvents, stats } from "./data/data";

function Home() {
 
  const [eventos, setEventos] = useState(() => {
    const savedEvents = localStorage.getItem("eventos_eventup");
    return savedEvents ? JSON.parse(savedEvents) : initialEvents;
  });

  
  useEffect(() => {
    localStorage.setItem("eventos_eventup", JSON.stringify(eventos));
  }, [eventos]);

  function addEvent(newEvent) {
    const newId = eventos.length > 0 ? Math.max(...eventos.map((e) => e.id)) + 1 : 1;
    setEventos((prev) => [...prev, { ...newEvent, id: newId }]);
    
   
    alert("Evento cadastrado com sucesso!");
  }

  function deleteEvent(id) {
    if (window.confirm("Tem certeza que deseja excluir este evento?")) {
      setEventos((prev) => prev.filter((evento) => evento.id !== id));
    }
  }

  return (
    <main>
      <Hero />

      <section className="section alt-bg" id="estatisticas">
        <div className="container">
          <div className="stats-grid">
            {stats.map((s, index) => (
              <StatCard key={index} {...s} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="eventos">
        <div className="container">
          <SectionTitle 
            title="Próximos Eventos" 
            subtitle="Explore o que está acontecendo na sua região" 
          />
          
          {eventos.length > 0 ? (
            <div className="grid">
              {eventos.map((evento) => (
                <EventCard 
                  key={evento.id} 
                  {...evento} 
                  onDelete={deleteEvent} 
                />
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
              Nenhum evento encontrado. Que tal criar o primeiro?
            </p>
          )}
        </div>
      </section>

      <section className="section alt-bg" id="cadastro">
        <div className="container">
          <SectionTitle 
            title="Organize seu Evento" 
            subtitle="Preencha os dados abaixo para publicar na plataforma" 
          />
          <div className="contact-wrapper">
            <EventForm onAddEvent={addEvent} />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;