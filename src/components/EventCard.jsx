import React from 'react';
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function EventCard({ id, title, category, date, location, description, image, onDelete }) {
  const { isOrganizador } = useAuth();
  
  const formatDescription = (text) => 
    text?.length > 70 ? `${text.substring(0, 70)}...` : (text || "Explore as atividades deste evento comunitário.");

  return (
    <div className="card event-card" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Imagem de Capa Sangrada */}
      {image && (
        <div style={{ width: "100%", height: "180px", overflow: "hidden" }}>
          <img 
            src={image} 
            alt={`Capa do evento ${title}`} 
            className="event-image" 
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      )}

      {/* Conteúdo interno envelopado com padding correto */}
      <div className="event-card-content" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <span style={{ color: "var(--primary)", fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          {category || "Comunidade"}
        </span>
        
        <h3 style={{ fontSize: "1.2rem", margin: "0.4rem 0 0.6rem 0", color: "var(--text)" }}>
          {title}
        </h3>
        
        <div style={{ fontSize: "0.9rem", color: "var(--text-soft)", marginBottom: "0.8rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <p style={{ margin: 0 }}>📅 {date}</p>
          <p style={{ margin: 0 }}>📍 {location}</p>
        </div>

        <p className="event-preview" style={{ fontSize: "0.88rem", color: "var(--muted)", marginBottom: "1.25rem", lineHeight: "1.4" }}>
          {formatDescription(description)}
        </p>

        {/* Grupo de ações fixado no rodapé do card */}
        <div className="event-actions" style={{ marginTop: "auto", display: "flex", gap: "10px", width: "100%" }}>
          <Link to={`/evento/${id}`} style={{ flex: 2, textDecoration: 'none' }}>
            <button className="btn-detalhes" style={{ width: '100%', padding: "10px" }}>
              Ver detalhes
            </button>
          </Link>

          {isOrganizador && (
            <button
              className="btn-excluir"
              style={{ flex: 1, padding: "10px" }}
              onClick={() => window.confirm(`Deseja remover "${title}" permanentemente?`) && onDelete(id)}
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