import { useState } from 'react'

function EventForm({ onAddEvent }) {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    date: '',
    location: '',
    cep: ''
  })

  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))

    //BUSCA AUTOMÁTICA AO DIGITAR CEP
    if (name === 'cep') {
      buscarCep(value)
    }
  }

  async function buscarCep(cep) {
    const cepLimpo = cep.replace(/\D/g, '')

    if (cepLimpo.length !== 8) return

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
      const data = await response.json()

      if (data.erro) {
        setMessage('CEP não encontrado.')
        setError(true)
        return
      }

      const endereco = `${data.logradouro || ''}, ${data.bairro || ''} - ${data.localidade}`

      setFormData((prev) => ({
        ...prev,
        location: endereco
      }))

      setError(false)
      setMessage('')
    } catch (err) {
      setMessage('Erro ao buscar CEP.')
      setError(true)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()

    const { title, category, date, location } = formData

    if (!title || !category || !date || !location) {
      setError(true)
      setMessage('Preencha todos os campos do evento.')
      return
    }

    const newEvent = {
      id: Date.now(),
      title,
      category,
      date,
      location
    }

    onAddEvent(newEvent)

    setError(false)
    setMessage('Evento cadastrado com sucesso!')

    setFormData({
      title: '',
      category: '',
      date: '',
      location: '',
      cep: ''
    })
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      
      <div className="form-group">
        <label>Título do evento</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Categoria</label>
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Data</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>CEP</label>
        <input
          name="cep"
          value={formData.cep}
          onChange={handleChange}
          placeholder="Digite o CEP (ex: 01001000)"
        />
      </div>

      <div className="form-group">
        <label>Localização</label>
        <input
          name="location"
          value={formData.location}
          readOnly
        />
      </div>

      <button type="submit" className="btn btn-primary full-width">
        Salvar evento
      </button>

      {message && (
        <p className={`form-message ${error ? 'error' : 'success'}`}>
          {message}
        </p>
      )}
    </form>
  )
}

export default EventForm