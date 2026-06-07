import { useState } from "react";
import { Link, useLocation } from "react-router-dom"; 
import { HashLink } from "react-router-hash-link";
import { useAuth } from "./AuthContext"; 
import { FaHome, FaBolt, FaCalendarAlt, FaChartBar, FaPlusCircle, FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus } from "react-icons/fa";

/**
 * Componente de cabeçalho responsivo com controle de navegação condicional
 * baseado no estado de autenticação e papel do usuário.
 */
function Header() {
  const [open, setOpen] = useState(false);
  const { isOrganizador, user, logout } = useAuth();
  const { pathname } = useLocation(); 

  const closeMenu = () => setOpen(false);

  const handleHomeClick = () => {
    closeMenu();
    if (pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo" onClick={handleHomeClick}>
          <h1>EventUp</h1>
        </Link>

        <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Menu">☰</button>

        <nav className={`nav ${open ? "nav-open" : ""}`}>
          <NavLink to="/" icon={<FaHome />} text="Início" onClick={handleHomeClick} />
          <NavLink to="/#funcionalidades" hash icon={<FaBolt />} text="Recursos" onClick={closeMenu} />
          <NavLink to="/#eventos" hash icon={<FaCalendarAlt />} text="Eventos" onClick={closeMenu} />
          <NavLink to="/#estatisticas" hash icon={<FaChartBar />} text="Dados" onClick={closeMenu} />

          {isOrganizador && (
          <NavLink to="/novo-evento" icon={<FaPlusCircle />} text="Novo Evento" onClick={closeMenu} />
          )}

          {user ? (
            <>
              <NavLink to="/perfil" icon={<FaUser />} text="Perfil" onClick={closeMenu} />
              <button className="logout-btn" onClick={() => { logout(); closeMenu(); }}>
                <FaSignOutAlt /> <span className="nav-text">Sair</span>
              </button>
            </>
          ) : (
            <>
              <NavLink to="/cadastro" icon={<FaUserPlus />} text="Cadastrar" onClick={closeMenu} />
              <NavLink to="/login" icon={<FaSignInAlt />} text="Entrar" onClick={closeMenu} />
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

/**
 * Componente auxiliar para padronizar links de navegação
 */
const NavLink = ({ to, hash, icon, text, onClick }) => {
  const props = { to, className: "nav-item", onClick };
  return hash ? (
    <HashLink smooth {...props}>{icon} <span className="nav-text">{text}</span></HashLink>
  ) : (
    <Link {...props}>{icon} <span className="nav-text">{text}</span></Link>
  );
};

export default Header;