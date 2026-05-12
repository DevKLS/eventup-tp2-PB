import { useParams, Link } from "react-router-dom";
import { events } from "../data/data";
import Header from "../components/Header";
import { useState } from "react"; 

function DetalhesEvento() {
  const { id } = useParams();
  const [confirmado, setConfirmado] = useState(false); 

  const evento = events.find((e) => e.id === Number(id));

  if (!evento) {
    return (
      <>
        <Header />
        <p style={{ padding: "100px 20px", textAlign: "center" }}>Evento não encontrado</p>
      </>
    );
  }

  return (
    <>
      <Header /> 
      
      <div className="details-container" style={{ paddingTop: "80px" }}>
        <div className="container">
           {/* ✅ Botão de voltar para facilitar a navegação mobile-first */}
          <Link to="/" style={{ textDecoration: 'none', color: 'var(--primary-color)', fontWeight: 'bold' }}>
            ← Voltar para a listagem
          </Link>
          
          <div className="details-card" style={{ marginTop: '20px' }}>
            <h1>{evento.title}</h1>

            <span className="details-category">{evento.category}</span>

            <p className="details-info">
              📅 {evento.date}
            </p>

            <p className="details-info">
              📍 {evento.location}
            </p>

            <div className="details-description">
              <p>{evento.description}</p>
            </div>

            
            <div style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
              <button 
                className={`btn ${confirmado ? 'btn-secondary' : 'btn-primary'}`}
                onClick={() => setConfirmado(!confirmado)}
              >
                {confirmado ? "✓ Presença Confirmada" : "Confirmar Presença"}
              </button>
              
              {confirmado && (
                <p style={{ color: 'green', fontSize: '0.9rem', marginTop: '10px' }}>
                  Você está na lista de participantes deste evento!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetalhesEvento;