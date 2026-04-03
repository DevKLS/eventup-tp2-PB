function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="container hero-content">
        <div>
          <p className="hero-tag">Plataforma colaborativa</p>
          <h2>Descubra, organize e aproveite eventos na sua comunidade.</h2>
          <p className="hero-text">
            A EventUp conecta organizadores e participantes em uma experiência simples,
            intuitiva e responsiva para divulgação de eventos comunitários.
          </p>
          <div className="hero-actions">
            <a href="#eventos" className="btn btn-primary">Ver eventos</a>
            <a href="#cadastro" className="btn btn-secondary">Criar evento</a>
          </div>
        </div>

        <div className="hero-card">
          <h3>Conecte-se com sua comunidade</h3>
          <ul>
            <li>Encontre eventos ao seu redor</li>
            <li>Compartilhe experiências</li>
            <li> Conheça novas pessoas</li>
            <li>Participe de atividades locais</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Hero