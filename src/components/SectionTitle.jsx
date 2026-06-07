function SectionTitle({ eyebrow, title, text, subtitle }) {
  const description = text || subtitle; 

  return (
    <div className="section-title">
      {eyebrow && <span>{eyebrow}</span>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export default SectionTitle;