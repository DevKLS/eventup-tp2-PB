import React from "react";

/**
 * Componente Hero: Seção de destaque da aplicação.
 * Apresenta a proposta de valor e CTAs principais para conversão de usuários.
 */
function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="container hero-content">
        <div>
          <p className="hero-tag">Plataforma colaborativa</p>
          <h2>Descubra, organize e aproveite eventos na sua comunidade.</h2>
          <p className="hero-text">
            A EventUp conecta organizadores e participantes em uma experiência 
            simples, intuitiva e responsiva para divulgação de eventos comunitários.
          </p>
          <div className="hero-actions">
            <a href="#eventos" className="btn btn-primary">Ver eventos</a>
            <a href="#cadastro" className="btn btn-secondary">Criar evento</a>
          </div>
        </div>

        <div className="card hero-card" style={{ padding: "2rem" }}>
          <h3 style={{ marginBottom: "1rem", color: "var(--text)" }}>Conecte-se</h3>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", color: "var(--muted)" }}>
            <ListItem text="Encontre eventos ao seu redor" />
            <ListItem text="Compartilhe experiências" />
            <ListItem text="Conheça novas pessoas" />
            <ListItem text="Participe de atividades locais" />
          </ul>
        </div>
      </div>
    </section>
  );
}

/**
 * Componente auxiliar para padronização da lista do card
 */
const ListItem = ({ text }) => <li>{text}</li>;

export default Hero;