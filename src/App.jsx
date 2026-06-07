import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Perfil from "./pages/Perfil";
import DetalhesEvento from "./pages/DetalhesEvento";
import EventForm from "./components/EventForm"; 
import ProtectedRoute from "./components/ProtectedRoute";


/**
 * Componente para garantir que a página role para o topo 
 * ao mudar de rota
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/evento/:id" element={<DetalhesEvento />} />
            <Route path="/novo-evento" element={<EventForm />} />
            <Route path="/perfil" element={
              <ProtectedRoute><Perfil /></ProtectedRoute>
            } />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;