-- 1. Criar tabela usuarios
CREATE TABLE IF NOT EXISTS public.usuarios (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    nome TEXT NOT NULL,
    perfil TEXT NOT NULL CHECK (perfil IN ('administrador', 'usuario')),
    status TEXT NOT NULL DEFAULT 'ativo' CHECK (status IN ('ativo', 'inativo')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Criar tabela clients e suas dependentes
CREATE TABLE IF NOT EXISTS public.clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    company TEXT NOT NULL,
    trade_name TEXT,
    cpf_cnpj TEXT,
    segment TEXT,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.client_contacts (
    client_id UUID PRIMARY KEY REFERENCES public.clients(id) ON DELETE CASCADE,
    whatsapp TEXT,
    phone TEXT,
    email TEXT,
    website TEXT
);

CREATE TABLE IF NOT EXISTS public.client_addresses (
    client_id UUID PRIMARY KEY REFERENCES public.clients(id) ON DELETE CASCADE,
    zip TEXT,
    street TEXT,
    number TEXT,
    complement TEXT,
    neighborhood TEXT,
    city TEXT,
    state TEXT
);

-- 3. Biblioteca de Arquivos
INSERT INTO storage.buckets (id, name, public) VALUES 
('clientes-logos', 'clientes-logos', false),
('clientes-artes', 'clientes-artes', false),
('clientes-reels', 'clientes-reels', false),
('clientes-stories', 'clientes-stories', false),
('clientes-videos', 'clientes-videos', false),
('clientes-documentos', 'clientes-documentos', false),
('clientes-identidade', 'clientes-identidade', false),
('temporarios', 'temporarios', false)
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS public.folders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    parent_id UUID REFERENCES public.folders(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    folder_id UUID REFERENCES public.folders(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    size BIGINT NOT NULL,
    storage_path TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS public.tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS public.file_tags (
    file_id UUID REFERENCES public.files(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE,
    PRIMARY KEY (file_id, tag_id)
);

CREATE TABLE IF NOT EXISTS public.favorites (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    file_id UUID REFERENCES public.files(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, file_id)
);

CREATE TABLE IF NOT EXISTS public.file_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_id UUID REFERENCES public.files(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. RLS e Políticas
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.folders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins podem tudo" ON public.usuarios FOR ALL TO authenticated USING (auth.jwt() ->> 'email' = 'larapecanha2015@gmail.com');
CREATE POLICY "Admins podem tudo" ON public.clients FOR ALL TO authenticated USING (auth.jwt() ->> 'email' = 'larapecanha2015@gmail.com');
CREATE POLICY "Acesso autenticado" ON public.folders FOR ALL TO authenticated USING (true);
CREATE POLICY "Acesso autenticado" ON public.files FOR ALL TO authenticated USING (true);

-- 5. Trigger de pastas automáticas
CREATE OR REPLACE FUNCTION public.create_client_folders()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.folders (client_id, name) VALUES 
    (NEW.id, 'Logos'),
    (NEW.id, 'Artes'),
    (NEW.id, 'Carrosséis'),
    (NEW.id, 'Stories'),
    (NEW.id, 'Reels'),
    (NEW.id, 'Vídeos'),
    (NEW.id, 'Fotos'),
    (NEW.id, 'Contratos'),
    (NEW.id, 'PDFs'),
    (NEW.id, 'Documentos'),
    (NEW.id, 'Identidade Visual'),
    (NEW.id, 'Materiais Recebidos'),
    (NEW.id, 'Outros');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_create_client_folders ON public.clients;
CREATE TRIGGER trg_create_client_folders
AFTER INSERT ON public.clients
FOR EACH ROW EXECUTE FUNCTION public.create_client_folders();
-- ==================================================
-- MIGRATION SCRIPT: Etapa 4 - Gestão de Conteúdo
-- ==================================================

-- 1. Tabelas de suporte
CREATE TABLE IF NOT EXISTS public.campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabela principal de conteúdos
CREATE TABLE IF NOT EXISTS public.contents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    campaign_id UUID REFERENCES public.campaigns(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    category TEXT,
    objective TEXT,
    description TEXT,
    caption TEXT,
    cta TEXT,
    hashtags TEXT[],
    status TEXT NOT NULL DEFAULT 'ideia',
    assigned_to UUID REFERENCES auth.users(id),
    priority TEXT DEFAULT 'media',
    color TEXT,
    due_date TIMESTAMP WITH TIME ZONE,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Anexos de Conteúdo (Vínculo com Biblioteca/Etapa 3)
CREATE TABLE IF NOT EXISTS public.content_attachments (
    content_id UUID REFERENCES public.contents(id) ON DELETE CASCADE,
    file_id UUID REFERENCES public.files(id) ON DELETE CASCADE,
    PRIMARY KEY (content_id, file_id)
);

-- 4. RLS
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_attachments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Acesso autenticado" ON public.campaigns FOR ALL TO authenticated USING (true);
CREATE POLICY "Acesso autenticado" ON public.contents FOR ALL TO authenticated USING (true);
CREATE POLICY "Acesso autenticado" ON public.content_attachments FOR ALL TO authenticated USING (true);
-- ==================================================
-- FULL SUPABASE SETUP SCRIPT (Etapas 5, 6, 7)
-- ==================================================

-- 1. AI Assistant Tables
CREATE TABLE IF NOT EXISTS public.ai_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.ai_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES public.ai_conversations(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.ai_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Integrations Tables
CREATE TABLE IF NOT EXISTS public.integrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    service_type TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'disconnected',
    config JSONB,
    encrypted_credentials TEXT,
    last_sync_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.integration_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    integration_id UUID REFERENCES public.integrations(id) ON DELETE CASCADE,
    event TEXT NOT NULL,
    status TEXT NOT NULL,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Finance Tables
CREATE TABLE IF NOT EXISTS public.finance_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('revenue', 'expense')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.finance_contracts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    value DECIMAL(12,2) NOT NULL,
    periodicity TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    status TEXT NOT NULL DEFAULT 'active',
    file_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.finance_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
    type TEXT NOT NULL CHECK (type IN ('revenue', 'expense')),
    description TEXT NOT NULL,
    category_id UUID REFERENCES public.finance_categories(id),
    amount DECIMAL(12,2) NOT NULL,
    due_date DATE NOT NULL,
    paid_at TIMESTAMP WITH TIME ZONE,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. RLS Policies
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.integration_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.finance_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.finance_contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.finance_transactions ENABLE ROW LEVEL SECURITY;

-- Creating policies
CREATE POLICY "Acesso autenticado" ON public.ai_conversations FOR ALL TO authenticated USING (true);
CREATE POLICY "Acesso autenticado" ON public.ai_messages FOR ALL TO authenticated USING (true);
CREATE POLICY "Acesso autenticado" ON public.ai_templates FOR ALL TO authenticated USING (true);
CREATE POLICY "Acesso autenticado" ON public.integrations FOR ALL TO authenticated USING (true);
CREATE POLICY "Acesso autenticado" ON public.integration_logs FOR ALL TO authenticated USING (true);
CREATE POLICY "Acesso autenticado" ON public.finance_categories FOR ALL TO authenticated USING (true);
CREATE POLICY "Acesso autenticado" ON public.finance_contracts FOR ALL TO authenticated USING (true);
CREATE POLICY "Acesso autenticado" ON public.finance_transactions FOR ALL TO authenticated USING (true);

-- ==================================================
-- Etapa 8 - Relatórios e Analytics
-- ==================================================

-- Auditoria
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_name TEXT NOT NULL,
    action TEXT NOT NULL,
    record_id UUID NOT NULL,
    changed_by UUID REFERENCES auth.users(id),
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    old_data JSONB,
    new_data JSONB
);

-- Configurações de Relatórios
CREATE TABLE IF NOT EXISTS public.report_configurations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    filters JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_configurations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Acesso autenticado" ON public.audit_logs FOR ALL TO authenticated USING (true);
CREATE POLICY "Acesso autenticado" ON public.report_configurations FOR ALL TO authenticated USING (true);

-- ==================================================
-- Etapa 9 - Central de Automações (Workflow Builder)
-- ==================================================

-- Tabela de Workflows Principais
CREATE TABLE IF NOT EXISTS public.workflows (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'active', -- active, inactive, draft
    trigger_type TEXT NOT NULL, -- client_created, webhook_received, schedule, etc
    trigger_config JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Passos do Workflow (para suportar Drag and Drop e ordenação)
CREATE TABLE IF NOT EXISTS public.workflow_steps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id UUID NOT NULL REFERENCES public.workflows(id) ON DELETE CASCADE,
    step_order INTEGER NOT NULL,
    step_type TEXT NOT NULL, -- condition, action
    config JSONB,
    next_step_id UUID REFERENCES public.workflow_steps(id), -- Para ramificações/loops se necessário
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Condições do Workflow (separado para granularidade)
CREATE TABLE IF NOT EXISTS public.workflow_conditions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    step_id UUID NOT NULL REFERENCES public.workflow_steps(id) ON DELETE CASCADE,
    field TEXT NOT NULL,
    operator TEXT NOT NULL, -- equals, contains, greater_than
    value TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ações do Workflow (separado para granularidade)
CREATE TABLE IF NOT EXISTS public.workflow_actions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    step_id UUID NOT NULL REFERENCES public.workflow_steps(id) ON DELETE CASCADE,
    action_type TEXT NOT NULL, -- create_client, send_email, etc
    action_config JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Histórico de Execuções dos Workflows
CREATE TABLE IF NOT EXISTS public.workflow_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id UUID REFERENCES public.workflows(id) ON DELETE CASCADE,
    status TEXT NOT NULL, -- success, failed, running, retrying
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    error_message TEXT,
    execution_time_ms INTEGER
);

-- Logs detalhados de execução
CREATE TABLE IF NOT EXISTS public.workflow_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    history_id UUID REFERENCES public.workflow_history(id) ON DELETE CASCADE,
    step_id UUID REFERENCES public.workflow_steps(id),
    status TEXT NOT NULL,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Templates Prontos
CREATE TABLE IF NOT EXISTS public.workflow_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    category TEXT,
    configuration JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Webhooks
CREATE TABLE IF NOT EXISTS public.webhooks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    method TEXT DEFAULT 'POST',
    secret_key TEXT,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Configurações de API (Rest)
CREATE TABLE IF NOT EXISTS public.api_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id UUID REFERENCES public.workflows(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    method TEXT NOT NULL,
    headers JSONB,
    body JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Logs de API
CREATE TABLE IF NOT EXISTS public.api_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    api_request_id UUID REFERENCES public.api_requests(id) ON DELETE CASCADE,
    status_code INTEGER,
    response_body TEXT,
    duration_ms INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS
ALTER TABLE public.workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflow_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflow_conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflow_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflow_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflow_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflow_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Acesso autenticado" ON public.workflows FOR ALL TO authenticated USING (true);
CREATE POLICY "Acesso autenticado" ON public.workflow_steps FOR ALL TO authenticated USING (true);
CREATE POLICY "Acesso autenticado" ON public.workflow_conditions FOR ALL TO authenticated USING (true);
CREATE POLICY "Acesso autenticado" ON public.workflow_actions FOR ALL TO authenticated USING (true);
CREATE POLICY "Acesso autenticado" ON public.workflow_history FOR ALL TO authenticated USING (true);
CREATE POLICY "Acesso autenticado" ON public.workflow_logs FOR ALL TO authenticated USING (true);
CREATE POLICY "Acesso autenticado" ON public.workflow_templates FOR ALL TO authenticated USING (true);
CREATE POLICY "Acesso autenticado" ON public.webhooks FOR ALL TO authenticated USING (true);
CREATE POLICY "Acesso autenticado" ON public.api_requests FOR ALL TO authenticated USING (true);
CREATE POLICY "Acesso autenticado" ON public.api_logs FOR ALL TO authenticated USING (true);

-- ==================================================
-- Etapa 10 - Portal do Cliente, Aprovação Online e Configurações
-- ==================================================

-- Configurações Gerais da Agência
CREATE TABLE IF NOT EXISTS public.system_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agency_name TEXT NOT NULL,
    logo_url TEXT,
    cnpj TEXT,
    email TEXT,
    phone TEXT,
    whatsapp TEXT,
    website TEXT,
    address TEXT,
    timezone TEXT DEFAULT 'America/Sao_Paulo',
    language TEXT DEFAULT 'pt-BR',
    theme_primary_color TEXT DEFAULT '#1E40AF',
    theme_mode TEXT DEFAULT 'light', -- light, dark, system
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Preferências do Usuário (Administrador)
CREATE TABLE IF NOT EXISTS public.user_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    language TEXT DEFAULT 'pt-BR',
    theme TEXT DEFAULT 'light',
    notifications_enabled BOOLEAN DEFAULT true,
    last_accessed_path TEXT,
    saved_filters JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tokens de Compartilhamento do Portal do Cliente
CREATE TABLE IF NOT EXISTS public.client_portal_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    token TEXT NOT NULL UNIQUE,
    valid_until TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    revoked_at TIMESTAMP WITH TIME ZONE
);

-- Histórico de Aprovações no Portal
CREATE TABLE IF NOT EXISTS public.approval_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    token_id UUID REFERENCES public.client_portal_tokens(id) ON DELETE CASCADE,
    content_id UUID NOT NULL, -- Reference to content/post
    action TEXT NOT NULL, -- approved, rejected, revision_requested
    comments TEXT,
    action_by_name TEXT, -- Client name who approved
    action_by_email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Backups do Sistema
CREATE TABLE IF NOT EXISTS public.system_backups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type TEXT NOT NULL, -- manual, automatic
    status TEXT NOT NULL, -- running, completed, failed
    file_url TEXT,
    file_size_bytes BIGINT,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    error_message TEXT
);

-- Monitoramento e Saúde do Sistema
CREATE TABLE IF NOT EXISTS public.system_health (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_name TEXT NOT NULL, -- database, storage, whatsapp_api, openai
    status TEXT NOT NULL, -- online, offline, degraded
    last_check_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    response_time_ms INTEGER,
    error_details TEXT
);

-- Logs Globais do Sistema
CREATE TABLE IF NOT EXISTS public.system_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    level TEXT NOT NULL, -- info, warning, error
    category TEXT NOT NULL, -- auth, database, integration, system
    message TEXT NOT NULL,
    details JSONB,
    user_id UUID REFERENCES auth.users(id),
    ip_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notificações do Sistema
CREATE TABLE IF NOT EXISTS public.system_notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL, -- alert, info, success
    is_read BOOLEAN DEFAULT false,
    link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_portal_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.approval_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_backups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_health ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Acesso autenticado" ON public.system_settings FOR ALL TO authenticated USING (true);
CREATE POLICY "Acesso autenticado" ON public.user_preferences FOR ALL TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Acesso autenticado" ON public.client_portal_tokens FOR ALL TO authenticated USING (true);
CREATE POLICY "Acesso autenticado" ON public.approval_history FOR ALL TO authenticated USING (true);
CREATE POLICY "Acesso autenticado" ON public.system_backups FOR ALL TO authenticated USING (true);
CREATE POLICY "Acesso autenticado" ON public.system_health FOR ALL TO authenticated USING (true);
CREATE POLICY "Acesso autenticado" ON public.system_logs FOR ALL TO authenticated USING (true);
CREATE POLICY "Acesso autenticado" ON public.system_notifications FOR ALL TO authenticated USING (user_id = auth.uid());

-- Políticas públicas para o Portal do Cliente (acesso via Token)
-- Apenas SELECT para validar token
CREATE POLICY "Acesso publico por token" ON public.client_portal_tokens FOR SELECT USING (is_active = true AND valid_until > NOW());
CREATE POLICY "Permitir insercao anonima de aprovacao" ON public.approval_history FOR INSERT WITH CHECK (true);
