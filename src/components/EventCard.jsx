import { Link } from "react-router-dom";

function EventCard({ id, title, category, date, location, description, onDelete }) {
  return (
    <div className="event-card">
      <h3>{title}</h3>
      <p><strong>Categoria:</strong> {category}</p>
      <p><strong>Data:</strong> {date}</p>
      <p><strong>Local:</strong> {location}</p>
      <p className="event-preview">
  {description.substring(0, 60)}...
</p>

      <div className="event-actions">
        <Link to={`/evento/${id}`}>
          <button className="btn-detalhes">Ver detalhes</button>
        </Link>

        <button 
          className="btn-excluir"
          onClick={() => onDelete(id)}
        >
          Excluir
        </button>
      </div>
    </div>
  );
}

export default EventCard;