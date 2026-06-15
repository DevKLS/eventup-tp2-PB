import React from 'react';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../services/supabaseClient";
import { useAuth } from "../contexts/AuthContext";
import {
  FaPlus,
  FaCalendarPlus,
  FaUsers,
  FaMapMarkerAlt,
  FaRegCalendarAlt,
  FaTrashAlt,
  FaExternalLinkAlt,
  FaEdit
} from "react-icons/fa";

// Card responsável por exibir as informações e ações de um evento
const DashboardCard = ({ evento, onExcluir }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="card"
      style={{
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s",
        transform: isHovered ? "translateY(-5px)" : "translateY(0)"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {evento.image ? (
        <img
          src={evento.image}
          alt={evento.title}
          className="event-image"
          style={{ height: "180px", objectFit: "cover" }}
        />
      ) : (
        <div
          className="event-image"
          style={{
            height: "180px",
            backgroundColor: "#1f2937",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <FaCalendarPlus size={40} color="#374151" />
        </div>
      )}

      <div
        className="event-card-content"
        style={{ padding: "1.25rem", flexGrow: 1 }}
      >
        <span
          style={{
            color: "var(--secondary)",
            fontSize: "0.8rem",
            fontWeight: "700",
            textTransform: "uppercase"
          }}
        >
          {evento.category || "Geral"}
        </span>

        <h3 style={{ margin: "0.5rem 0" }}>
          {evento.title}
        </h3>

        <p
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "0.88rem"
          }}
        >
          <FaRegCalendarAlt size={14} /> {evento.date}
        </p>

        <p
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "0.88rem"
          }}
        >
          <FaMapMarkerAlt size={14} /> {evento.location}
        </p>

        <div
          style={{
            marginTop: "1rem",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px"
          }}
        >
          <Link to={`/evento/${evento.id}`}>
            <button className="btn-detalhes" style={{ width: "100%" }}>
              <FaExternalLinkAlt /> Ver
            </button>
          </Link>

          <Link to={`/editar-evento/${evento.id}`}>
            <button
              className="btn-editar"
              style={{
                width: "100%",
                backgroundColor: "#f39c12",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              <FaEdit /> Editar
            </button>
          </Link>

          <button
            onClick={() => onExcluir(evento.id)}
            className="btn-excluir"
            style={{
              gridColumn: "span 2",
              width: "100%"
            }}
          >
            <FaTrashAlt /> Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

function Dashboard() {
  const { user } = useAuth();
  const [eventos, setEventos] = useState([]);
  const [totalInscritos, setTotalInscritos] = useState(0);
  const [loading, setLoading] = useState(true);

  // Carrega os eventos do organizador e a quantidade de inscrições
  useEffect(() => {
    async function carregarDados() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data: evs } = await supabase
          .from("eventos")
          .select("*")
          .eq("organizador_id", user.id)
          .order("created_at", { ascending: false });

        setEventos(evs || []);

        if (evs?.length > 0) {
          const { data: ins } = await supabase
            .from("inscricoes")
            .select("id")
            .in("evento_id", evs.map((e) => e.id));

          setTotalInscritos(ins?.length || 0);
        }
      } catch (err) {
        console.error("Erro ao carregar Dashboard:", err);
      }

      setLoading(false);
    }

    carregarDados();
  }, [user]);

  // Remove um evento do banco de dados e atualiza a lista exibida
  const excluirEvento = async (id) => {
    if (!window.confirm("Deseja realmente excluir este evento?")) return;

    const { error } = await supabase
      .from("eventos")
      .delete()
      .eq("id", id);

    if (!error) {
      setEventos(eventos.filter((e) => e.id !== id));
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "80px" }}>
        Carregando painel...
      </div>
    );
  }

  return (
    <section className="section container">
      <div
        className="section-title"
        style={{ textAlign: "center", marginBottom: "40px" }}
      >
        <h2>Painel do Organizador</h2>

        <Link
          to="/novo-evento"
          className="btn-primary"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "14px 28px",
            marginTop: "20px",
            background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
            color: "#fff",
            borderRadius: "12px",
            textDecoration: "none",
            transition: "0.3s"
          }}
        >
          <FaPlus /> Criar Novo Evento
        </Link>
      </div>

      <div
        className="dashboard-stats"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "25px",
          maxWidth: "800px",
          margin: "0 auto 50px auto"
        }}
      >
        <div
          className="card"
          style={{ padding: "2rem", textAlign: "center" }}
        >
          <FaCalendarPlus size={35} color="var(--primary)" />
          <h2 style={{ fontSize: "2.5rem" }}>
            {eventos.length}
          </h2>
          <p>Eventos Criados</p>
        </div>

        <div
          className="card"
          style={{ padding: "2rem", textAlign: "center" }}
        >
          <FaUsers size={35} color="var(--secondary)" />
          <h2 style={{ fontSize: "2.5rem" }}>
            {totalInscritos}
          </h2>
          <p>Total de Inscritos</p>
        </div>
      </div>

      <div className="grid">
        {eventos.map((evento) => (
          <DashboardCard
            key={evento.id}
            evento={evento}
            onExcluir={excluirEvento}
          />
        ))}
      </div>
    </section>
  );
}

export default Dashboard;