import React from "react";
import { Link } from "react-router-dom";
import {
  FaRocket,
  FaMapMarkerAlt,
  FaQrcode,
  FaUsers,
  FaCalendarCheck,
  FaTicketAlt
} from "react-icons/fa";
import FeatureCard from "../components/FeatureCard";
import { useAuth } from "../contexts/AuthContext";

function Home() {
  const { user } = useAuth();

  // Verifica se o usuário possui permissão para criar eventos
  const ehAdministrador = user?.email?.endsWith("@eventup.com");

  const recursos = [
    {
      icon: <FaRocket />,
      title: "Divulgação Instantânea",
      description: "Publique seus eventos comunitários em segundos.",
      gradient: "var(--primary)"
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Geolocalização Inteligente",
      description: "Encontre atividades perto de você.",
      gradient: "var(--secondary)"
    },
    {
      icon: <FaQrcode />,
      title: "Inscrições Simplificadas",
      description: "Garanta sua vaga com um clique.",
      gradient: "var(--primary)"
    },
    {
      icon: <FaUsers />,
      title: "Gestão de Comunidades",
      description: "Painel administrativo completo.",
      gradient: "var(--secondary)"
    }
  ];

  return (
    <div className="home-page">
      <section className="hero" id="inicio">
        <div className="container hero-content">
          <div className="hero-main-info">
            <p className="hero-tag">Plataforma colaborativa</p>

            <h2>
              Descubra, organize e aproveite eventos na sua comunidade.
            </h2>

            <p className="hero-text">
              A EventUp conecta organizadores e participantes em uma
              experiência simples, intuitiva e responsiva para divulgação de
              eventos comunitários.
            </p>

            <div className="hero-actions">
              <a href="#eventos" className="btn btn-primary">
                Ver eventos
              </a>

              {/* Exibe o botão de criação apenas para administradores */}
              {ehAdministrador && (
                <Link to="/novo-evento" className="btn btn-secondary">
                  Criar evento
                </Link>
              )}
            </div>
          </div>

          <div className="card hero-card">
            <h3>Conecte-se</h3>

            <ul className="hero-features-list">
              <ListItem text="Encontre eventos ao seu redor" />
              <ListItem text="Compartilhe experiências" />
              <ListItem text="Conheça novas pessoas" />
              <ListItem text="Participe de atividades locais" />
            </ul>
          </div>
        </div>
      </section>

      <section
        className="section container"
        id="funcionalidades"
        style={{ padding: "80px 0 40px 0" }}
      >
        <div className="section-title">
          <span>Recursos do App</span>
          <h2>Tudo o que você precisa para se conectar</h2>
        </div>

        <div className="grid" style={{ marginTop: "40px" }}>
          {recursos.map((rec, index) => (
            <FeatureCard
              key={index}
              icon={rec.icon}
              title={rec.title}
              description={rec.description}
              gradientColor={rec.gradient}
            />
          ))}
        </div>
      </section>

      <section
        className="section container"
        id="estatisticas"
        style={{ padding: "60px 0 80px 0" }}
      >
        <div className="section-title">
          <span>Nosso Impacto</span>
          <h2>O EventUp em Números</h2>
        </div>

        <div className="grid" style={{ marginTop: "40px" }}>
          <article
            className="card stat-card"
            style={{
              textAlign: "center",
              padding: "2.5rem 1.5rem"
            }}
          >
            <FaCalendarCheck
              style={{
                fontSize: "2.2rem",
                color: "var(--primary)",
                marginBottom: "1rem"
              }}
            />

            <h3
              style={{
                fontSize: "2.5rem",
                fontWeight: "800",
                color: "#ffffff"
              }}
            >
              24+
            </h3>

            <p style={{ color: "var(--muted)" }}>
              Eventos Criados
            </p>
          </article>

          <article
            className="card stat-card"
            style={{
              textAlign: "center",
              padding: "2.5rem 1.5rem"
            }}
          >
            <FaUsers
              style={{
                fontSize: "2.2rem",
                color: "var(--secondary)",
                marginBottom: "1rem"
              }}
            />

            <h3
              style={{
                fontSize: "2.5rem",
                fontWeight: "800",
                color: "#ffffff"
              }}
            >
              150+
            </h3>

            <p style={{ color: "var(--muted)" }}>
              Usuários Ativos
            </p>
          </article>

          <article
            className="card stat-card"
            style={{
              textAlign: "center",
              padding: "2.5rem 1.5rem"
            }}
          >
            <FaTicketAlt
              style={{
                fontSize: "2.2rem",
                color: "var(--primary)",
                marginBottom: "1rem"
              }}
            />

            <h3
              style={{
                fontSize: "2.5rem",
                fontWeight: "800",
                color: "#ffffff"
              }}
            >
              420+
            </h3>

            <p style={{ color: "var(--muted)" }}>
              Presenças Confirmadas
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}

const ListItem = ({ text }) => <li>{text}</li>;

export default Home;