import React from 'react';
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  FaHome,
  FaChartBar,
  FaUser,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaClipboardList,
  FaHeart,
} from "react-icons/fa";

function Header() {
  const [open, setOpen] = useState(false);
  const { isOrganizador, user, logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const closeMenu = () => setOpen(false);

  const handleHomeClick = () => {
    closeMenu();
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleLogout = async () => {
    await logout();   // Executa a função do contexto
    closeMenu();      // Fecha o menu hamburguer
    navigate("/");    // Redireciona para a Home e força a re-renderização
  };

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo" onClick={handleHomeClick}>
          <h1>EventUp</h1>
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          ☰
        </button>

        <nav className={`nav ${open ? "nav-open" : ""}`}>
          <NavLink
            to="/"
            icon={<FaHome />}
            text="Início"
            active={pathname === "/"}
            onClick={handleHomeClick}
          />

          {user && isOrganizador && (
            <NavLink
              to="/dashboard"
              icon={<FaChartBar />}
              text="Dashboard"
              active={pathname === "/dashboard"}
              onClick={closeMenu}
            />
          )}

          {user && (
            <>
              <NavLink
                to="/minhas-inscricoes"
                icon={<FaClipboardList />}
                text="Inscrições"
                active={pathname === "/minhas-inscricoes"}
                onClick={closeMenu}
              />

              <NavLink
                to="/favoritos"
                icon={<FaHeart />}
                text="Favoritos"
                active={pathname === "/favoritos"}
                onClick={closeMenu}
              />

              <NavLink
                to="/perfil"
                icon={<FaUser />}
                text="Perfil"
                active={pathname === "/perfil"}
                onClick={closeMenu}
              />
            </>
          )}

          {user ? (
            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt />
              <span className="nav-text">Sair</span>
            </button>
          ) : (
            <>
              <NavLink
                to="/cadastro"
                icon={<FaUserPlus />}
                text="Cadastrar"
                active={pathname === "/cadastro"}
                onClick={closeMenu}
              />

              <NavLink
                to="/login"
                icon={<FaSignInAlt />}
                text="Entrar"
                active={pathname === "/login"}
                onClick={closeMenu}
              />
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

function NavLink({ to, icon, text, active, onClick }) {
  return (
    <Link
      to={to}
      className={`nav-item ${active ? "active" : ""}`}
      onClick={onClick}
    >
      {icon}
      <span className="nav-text">{text}</span>
    </Link>
  );
}

export default Header;