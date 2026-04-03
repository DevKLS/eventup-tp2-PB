function EventCard({ title, category, date, location, description }) {
  return (
    <article className="card post-card">
      <div className="post-top">
        <span className="post-category">{category}</span>
        <span className="post-likes">📍 {location}</span>
      </div>
      <h3>{title}</h3>
      <p><strong>Data:</strong> {date}</p>
      <p>{description}</p>
      <button className="btn btn-small">Ver detalhes</button>
    </article>
  )
}

export default EventCard