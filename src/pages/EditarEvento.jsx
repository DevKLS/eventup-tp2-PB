import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";

function EditarEvento() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    location: "",
    image: "",
    cep: "",
    description: "",
    vagas: "",
  });

  useEffect(() => {
    carregarEvento();
  }, []);

  async function carregarEvento() {
    const { data, error } = await supabase
      .from("eventos")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      alert("Erro ao carregar evento.");
    } else {
      setFormData({
        title: data.title || "",
        category: data.category || "",
        date: data.date || "",
        location: data.location || "",
        image: data.image || "",
        cep: data.cep || "",
        description: data.description || "",
        vagas: data.vagas || "",
      });
    }

    setLoading(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { error } = await supabase
      .from("eventos")
      .update({
        title: formData.title,
        category: formData.category,
        date: formData.date,
        location: formData.location,
        image: formData.image,
        cep: formData.cep,
        description: formData.description,
        vagas: Number(formData.vagas),
      })
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Erro ao atualizar evento.");
      return;
    }

    alert("Evento atualizado com sucesso!");

    navigate(`/evento/${id}`);
  }

  if (loading) {
    return (
      <div className="container">
        <h2>Carregando evento...</h2>
      </div>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <div className="form-card">
          <h1>Editar Evento</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Título</label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Categoria</label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Data</label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Local</label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>CEP</label>

              <input
                type="text"
                name="cep"
                value={formData.cep}
                onChange={handleChange}
              />
            </div>

           <div className="form-group full">
            <label>Imagem do Evento</label>

              <input
               type="text"
               name="image"
               value={formData.image}
               onChange={handleChange}
             />

            {formData.image && (
              <img
                src={formData.image}
                alt={formData.title}
                className="preview-image"
              />
               )}
            </div>

            <div className="form-group">
              <label>Vagas</label>

              <input
                type="number"
                name="vagas"
                value={formData.vagas}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Descrição</label>

              <textarea
                name="description"
                rows="5"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="form-actions">
               <button
               type="submit"
               className="btn-salvar">
               Salvar Alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default EditarEvento;