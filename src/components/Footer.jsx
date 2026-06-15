import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { FaBolt, FaCalendarAlt, FaChartBar, FaEnvelope } from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  // Estilo reutilizado para os textos do rodapé
  const textStyle = {
    color: "var(--muted)",
    fontSize: "0.9rem",
    lineHeight: "1.6"
  };

  return (
    <footer
      className="footer"
      style={{
        borderTop: "1px solid var(--border)",
        paddingTop: "60px",
        paddingBottom: "30px",
        marginTop: "auto",
        backgroundColor: "var(--bg-footer, #0a0a0c)"
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "40px",
            marginBottom: "40px"
          }}
        >
          <div>
            <Link
              to="/"
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
              style={{ textDecoration: "none" }}
            >
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "800",
                  margin: "0 0 1rem 0",
                  color: "var(--text)"
                }}
              >
                EventUp
              </h2>
            </Link>

            <p style={textStyle}>
              Conectando comunidades através da organização simplificada de
              eventos locais.
            </p>
          </div>

          <div>
            <h4
              style={{
                color: "var(--text)",
                marginBottom: "1.5rem"
              }}
            >
              Plataforma
            </h4>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              }}
            >
              <FooterLink
                to="/#funcionalidades"
                icon={<FaBolt />}
                text="Recursos"
              />

              <FooterLink
                to="/#eventos"
                icon={<FaCalendarAlt />}
                text="Explorar Eventos"
              />

              <FooterLink
                to="/#estatisticas"
                icon={<FaChartBar />}
                text="Métricas"
              />
            </div>
          </div>

          <div>
            <h4
              style={{
                color: "var(--text)",
                marginBottom: "1.5rem"
              }}
            >
              Contato
            </h4>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              }}
            >
              <a
                href="mailto:contato@eventup.com"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "var(--muted)",
                  textDecoration: "none",
                  fontSize: "0.9rem"
                }}
              >
                <FaEnvelope /> suporte@eventup.com
              </a>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
            fontSize: "0.85rem",
            color: "var(--muted)"
          }}
        >
          <p style={{ margin: 0 }}>
            &copy; {currentYear} EventUp. Todos os direitos reservados.
          </p>

          <p style={{ margin: 0 }}>
            Desenvolvido por{" "}
            <span
              style={{
                color: "var(--text)",
                fontWeight: "600"
              }}
            >
              Keila Santana Lima
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

const FooterLink = ({ to, icon, text }) => (
  <HashLink
    smooth
    to={to}
    className="footer-link"
    style={{
      color: "var(--muted)",
      textDecoration: "none",
      fontSize: "0.9rem",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      transition: "all 0.2s"
    }}
  >
    {icon} {text}
  </HashLink>
);

export default Footer;