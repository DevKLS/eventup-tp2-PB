import { useState } from 'react'
import { Link } from 'react-router-dom' 

function Header() {
  const [open, setOpen] = useState(false)

  // Função para fechar o menu e rolar para o topo
  const handleInicioClick = () => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'inherit' }} onClick={handleInicioClick}>
          <h1>EventUp</h1>
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menu"
        >
          ☰
        </button>

        <nav className={`nav ${open ? 'nav-open' : ''}`}>
          {/* Agora ele chama a função que rola para o topo */}
          <Link to="/" onClick={handleInicioClick}>Início</Link>
          
          <a href="/#funcionalidades" onClick={() => setOpen(false)}>Funcionalidades</a>
          <a href="/#eventos" onClick={() => setOpen(false)}>Eventos</a>
          <a href="/#estatisticas" onClick={() => setOpen(false)}>Estatísticas</a>
          <a href="/#cadastro" onClick={() => setOpen(false)}>Cadastro</a>
        </nav>
      </div>
    </header>
  )
}

export default Header