function StatCard({ value, label, title }) {
  return (
    <article className="card stat-card">
      <h3>{value}</h3>
      <p>{label || title}</p>
    </article>
  );
}

export default StatCard;