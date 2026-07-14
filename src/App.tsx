/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { InitialCheck } from '@/components/InitialCheck';
import { LoginPage } from '@/pages/auth/LoginPage';
import { SetupAdminPage } from '@/pages/auth/SetupAdminPage';
import { ClientsPage } from '@/pages/clients/ClientsPage';
import { ClientFormPage } from '@/pages/clients/ClientFormPage';
import { ContentsPage } from '@/pages/contents/ContentsPage';
import { ContentFormPage } from '@/pages/contents/ContentFormPage';
import { ModulePlaceholder } from '@/pages/ModulePlaceholder';
import { CalendarPage } from '@/pages/calendar/CalendarPage';
import { PipelinePage } from '@/pages/pipeline/PipelinePage';
import { LibraryPage } from '@/pages/library/LibraryPage';
import { AiChatPage } from '@/pages/ai/AiChatPage';
import { IntegrationsPage } from '@/pages/integrations/IntegrationsPage';
import { FinancePage } from '@/pages/finance/FinancePage';
import { ReportsPage } from '@/pages/reports/ReportsPage';
import { AutomationsPage } from '@/pages/automations/AutomationsPage';
import { SettingsPage } from '@/pages/settings/SettingsPage';
import { ClientPortalPage } from '@/pages/client-portal/ClientPortalPage';
import { SetupWizardPage } from '@/pages/auth/SetupWizardPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/setup-admin" element={<SetupAdminPage />} />
          <Route path="/setup-wizard" element={<SetupWizardPage />} />
          <Route path="/portal/:token" element={<ClientPortalPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<div>Dashboard</div>} />
              <Route path="clients" element={<ClientsPage />} />
              <Route path="clients/new" element={<ClientFormPage />} />
              <Route path="clients/:id" element={<ClientFormPage />} />
              <Route path="contents" element={<ContentsPage />} />
              <Route path="contents/new" element={<ContentFormPage />} />
              <Route path="contents/:id" element={<ContentFormPage />} />
              <Route path="calendar" element={<CalendarPage />} />
              <Route path="pipeline" element={<PipelinePage />} />
              <Route path="library" element={<LibraryPage />} />
              <Route path="ai" element={<AiChatPage />} />
              <Route path="integrations" element={<IntegrationsPage />} />
              <Route path="finance" element={<FinancePage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="automations" element={<AutomationsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
