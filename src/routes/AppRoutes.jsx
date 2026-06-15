import React from "react";
import { Routes, Route } from "react-router-dom";

// Importação das páginas da aplicação
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Perfil from "../pages/Perfil";
import Dashboard from "../pages/Dashboard";
import DetalhesEvento from "../pages/DetalhesEvento";
import MinhasInscricoes from "../pages/MinhasInscricoes";
import EditarEvento from "../pages/EditarEvento";
import Favoritos from "../pages/Favoritos";

// Importação dos componentes auxiliares
import EventForm from "../components/EventForm";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* Rotas de acesso público disponíveis para todos os usuários */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/evento/:id" element={<DetalhesEvento />} />

      {/* Rotas que exigem autenticação do usuário */}
      <Route
        path="/novo-evento"
        element={
          <ProtectedRoute>
            <EventForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/minhas-inscricoes"
        element={
          <ProtectedRoute>
            <MinhasInscricoes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/perfil"
        element={
          <ProtectedRoute>
            <Perfil />
          </ProtectedRoute>
        }
      />

      <Route
        path="/editar-evento/:id"
        element={
          <ProtectedRoute>
            <EditarEvento />
          </ProtectedRoute>
        }
      />

      <Route
        path="/favoritos"
        element={
          <ProtectedRoute>
            <Favoritos />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;