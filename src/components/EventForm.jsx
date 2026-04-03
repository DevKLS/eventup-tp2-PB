import { useState } from 'react'

function EventForm() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    date: '',
    location: ''
  })

  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const { title, category, date, location } = formData

    if (!title || !category || !date || !location) {
      setError(true)
      setMessage('Preencha todos os campos do evento.')
      return
    }

    setError(false)
    setMessage('Evento cadastrado com sucesso!')
    setFormData({ title: '', category: '', date: '', location: '' })
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Título do evento</label>
        <input id="title" name="title" value={formData.title} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="category">Categoria</label>
        <input id="category" name="category" value={formData.category} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="date">Data</label>
        <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="location">Localização</label>
        <input id="location" name="location" value={formData.location} onChange={handleChange} />
      </div>

      <button type="submit" className="btn btn-primary full-width">Salvar evento</button>

      {message && (
        <p className={`form-message ${error ? 'error' : 'success'}`}>
          {message}
        </p>
      )}
    </form>
  )
}

export default EventForm