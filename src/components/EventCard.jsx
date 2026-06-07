import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

function EventCard({ id, title, category, date, location, description, image, onDelete }) {
  const { isOrganizador } = useAuth();
  
  // Função auxiliar para encurtar a descrição
  const formatDescription = (text) => 
    text?.length > 60 ? `${text.substring(0, 60)}...` : (text || "Nenhuma descrição disponível.");

  return (
    <div className="event-card">
      {/* Imagem usando a classe que já existe no seu CSS */}
      {image && (
        <img 
          src={image} 
          alt={`Capa do evento ${title}`} 
          className="event-image" 
        />
      )}

      <div className="event-card-content">
        <h3>{title}</h3>
        <p style={{ color: "var(--primary)" }}>{category || "Não especificada"}</p>
        <p>📅 {date}</p>
        <p>📍 {location}</p>
        <p className="event-preview">{formatDescription(description)}</p>

        {/* Botões usando as classes já definidas no seu App.css */}
        <div className="event-actions">
          <Link to={`/evento/${id}`} style={{ flex: 1, textDecoration: 'none' }}>
            <button className="btn-detalhes" style={{ width: '100%' }}>
              Ver detalhes
            </button>
          </Link>

          {isOrganizador && (
            <button
              className="btn-excluir"
              onClick={() => window.confirm(`Excluir "${title}"?`) && onDelete(id)}
            >
              Excluir
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventCard;