import React from "react";

function FeatureCard({ icon, title, description, gradientColor }) {
  return (
    <article 
      className="card feature-card" 
      style={{ 
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "2rem",
        height: "100%",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "default"
      }}
      // Efeito sutil de elevação e brilho ao passar o mouse
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.borderColor = "var(--border-glow)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "var(--border)";
      }}
    >
      {/* Container do Ícone com cor dinâmica (Azul ou Laranja do seu CSS) */}
      <div 
        style={{
          fontSize: "1.5rem",
          color: gradientColor || "var(--primary)",
          background: "rgba(255, 255, 255, 0.03)",
          padding: "12px",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1.5rem",
          border: "1px solid var(--border)"
        }}
      >
        {icon}
      </div>

      <h3 style={{ 
        fontSize: "1.25rem", 
        fontWeight: "700", 
        color: "#ffffff", 
        marginBottom: "0.75rem",
        letterSpacing: "-0.3px"
      }}>
        {title}
      </h3>

      <p style={{ 
        fontSize: "0.92rem", 
        color: "var(--muted)", 
        lineHeight: "1.6",
        margin: 0 
      }}>
        {description}
      </p>
    </article>
  );
}

export default FeatureCard;