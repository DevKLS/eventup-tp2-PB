import { useMemo, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import SectionTitle from './components/SectionTitle'
import FeatureCard from './components/FeatureCard'
import EventCard from './components/EventCard'
import StatCard from './components/StatCard'
import EventForm from './components/EventForm'
import { highlights, events, stats, categories } from './data/data'

function App() {
  const [selectedCategory, setSelectedCategory] = useState('Todos')

  const filteredEvents = useMemo(() => {
    if (selectedCategory === 'Todos') return events
    return events.filter((event) => event.category === selectedCategory)
  }, [selectedCategory])

  const updatedStats = stats.map((stat) => {
    if (stat.label === 'Categorias') {
      return {
        ...stat,
        value: categories.length - 1
      }
    }
    return stat
  })

  return (
    <>
      <Header />

      <main>
        <Hero />

        <section className="section" id="funcionalidades">
          <div className="container">
            <SectionTitle
              eyebrow="Recursos"
              title="Principais funcionalidades da EventUp"
              text="A primeira versão da aplicação foi construída com componentes reutilizáveis e foco em experiência responsiva."
            />

            <div className="grid">
              {highlights.map((item) => (
                <FeatureCard
                  key={item.id}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="section alt-bg" id="eventos">
          <div className="container">
            <SectionTitle
              eyebrow="Eventos"
              title="Eventos em destaque"
              text="Exemplo de listagem dinâmica com filtro por categoria, atendendo ao escopo inicial do projeto."
            />

            <div className="filter-bar">
              <label htmlFor="category">Filtrar por categoria:</label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  title={event.title}
                  category={event.category}
                  date={event.date}
                  location={event.location}
                  description={event.description}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="estatisticas">
          <div className="container">
            <SectionTitle
              eyebrow="Métricas"
              title="Visão geral da plataforma"
              text="Blocos reutilizáveis para exibir indicadores resumidos da aplicação."
            />

            <div className="stats-grid">
              {updatedStats.map((stat) => (
                <StatCard key={stat.id} value={stat.value} label={stat.label} />
              ))}
            </div>
          </div>
        </section>

        <section className="section alt-bg" id="cadastro">
          <div className="container contact-wrapper">
            <SectionTitle
              eyebrow="Cadastro"
              title="Criar novo evento"
              text="Formulário controlado em React para representar a funcionalidade principal do organizador."
            />

            <EventForm />
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>© 2026 EventUp - Projeto de Bloco-TP2</p>
        </div>
      </footer>
    </>
  )
}

export default App