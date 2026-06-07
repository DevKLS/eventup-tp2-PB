import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  // Verifica se existe um usuário logado no navegador
  const user = localStorage.getItem("loggedUser");

  // Se o usuário estiver logado, renderiza a página protegida (children).
  // Se não estiver, redireciona automaticamente para a página de login.
  return user ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;