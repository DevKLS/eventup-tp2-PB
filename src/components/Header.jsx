import { useState } from 'react'

function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="header">
      <div className="container header-content">
        <h1 className="logo">EventUp</h1>

        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menu"
        >
          ☰
        </button>

        <nav className={`nav ${open ? 'nav-open' : ''}`}>
          <a href="#inicio" onClick={() => setOpen(false)}>Início</a>
          <a href="#funcionalidades" onClick={() => setOpen(false)}>Funcionalidades</a>
          <a href="#eventos" onClick={() => setOpen(false)}>Eventos</a>
          <a href="#estatisticas" onClick={() => setOpen(false)}>Estatísticas</a>
          <a href="#cadastro" onClick={() => setOpen(false)}>Cadastro</a>
        </nav>
      </div>
    </header>
  )
}

export default Header