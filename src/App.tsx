/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { LoginPage } from '@/pages/auth/LoginPage';
import { ModulePlaceholder } from '@/pages/ModulePlaceholder';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<div>Dashboard</div>} />
              <Route path="clients" element={<ModulePlaceholder title="Clientes" />} />
              <Route path="calendar" element={<ModulePlaceholder title="Calendário" />} />
              <Route path="contents" element={<ModulePlaceholder title="Conteúdos" />} />
              <Route path="pipeline" element={<ModulePlaceholder title="Pipeline" />} />
              <Route path="library" element={<ModulePlaceholder title="Biblioteca" />} />
              <Route path="finance" element={<ModulePlaceholder title="Financeiro" />} />
              <Route path="reports" element={<ModulePlaceholder title="Relatórios" />} />
              <Route path="ai" element={<ModulePlaceholder title="Inteligência Artificial" />} />
              <Route path="settings" element={<ModulePlaceholder title="Configurações" />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
