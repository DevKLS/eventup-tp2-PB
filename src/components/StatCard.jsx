function StatCard({ value, label }) {
  return (
    <article className="card stat-card">
      <h3>{value}</h3>
      <p>{label}</p>
    </article>
  )
}

export default StatCard