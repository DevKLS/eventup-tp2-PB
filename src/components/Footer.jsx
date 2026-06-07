import React from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { FaBolt, FaCalendarAlt, FaChartBar } from "react-icons/fa";

/**
 * Componente de rodapé. 
 * Exibe links de navegação rápida e créditos do desenvolvedor.
 */
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" style={{ backgroundColor: "#0d1117", borderTop: "1px solid #21262d", padding: "30px 0", marginTop: "auto", color: "#8b949e" }}>
      <div className="container" style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        
        {/* Superior: Marca e Links */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
          <Link to="/" onClick={() => window.scrollTo(0, 0)} style={{ textDecoration: "none", color: "inherit" }}>
            <h1 style={{ fontSize: "1.5rem", fontWeight: "800", margin: 0 }}>EventUp</h1>
          </Link>

          <div style={{ display: "flex", gap: "20px" }}>
            <FooterLink to="/#funcionalidades" icon={<FaBolt />} text="Recursos" />
            <FooterLink to="/#eventos" icon={<FaCalendarAlt />} text="Eventos" />
            <FooterLink to="/#estatisticas" icon={<FaChartBar />} text="Dados" />
          </div>
        </div>

        <div style={{ width: "100%", height: "1px", backgroundColor: "#21262d" }}></div>

        {/* Inferior: Créditos */}
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
          <p style={{ margin: 0 }}>&copy; {currentYear} EventUp. Direitos reservados.</p>
          <p style={{ margin: 0 }}>Desenvolvido por <span style={{ color: "#fff", fontWeight: "600" }}>Keila Santana Lima</span></p>
        </div>
      </div>
    </footer>
  );
}

/**
 * Componente auxiliar para padronizar links do rodapé
 */
const FooterLink = ({ to, icon, text }) => (
  <HashLink smooth to={to} style={{ color: "#8b949e", textDecoration: "none", fontSize: "14px", display: "flex", alignItems: "center", gap: "5px" }}>
    {icon} {text}
  </HashLink>
);

export default Footer;