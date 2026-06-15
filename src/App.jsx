import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

/**
 * Componente responsável por reposicionar a página
 * para o topo sempre que uma nova rota é acessada.
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/**
 * Componente principal da aplicação.
 * Define a estrutura global contendo cabeçalho,
 * conteúdo principal, rodapé e gerenciamento de rotas.
 */
function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <ScrollToTop />

      {/* Cabeçalho compartilhado entre todas as páginas */}
      <Header />

      {/* Área principal responsável pela renderização das rotas */}
      <main style={{ flex: 1 }}>
        <AppRoutes />
      </main>

      {/* Rodapé compartilhado entre todas as páginas */}
      <Footer />
    </div>
  );
}

export default App;