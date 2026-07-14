-- Executar no SQL Editor do Supabase para corrigir a recursão infinita
DROP POLICY IF EXISTS "Admins podem tudo" ON public.usuarios;
DROP POLICY IF EXISTS "Acesso autenticado" ON public.usuarios;
DROP POLICY IF EXISTS "Usuários podem ver a si mesmos" ON public.usuarios;
DROP POLICY IF EXISTS "Administradores tem acesso total" ON public.usuarios;

CREATE POLICY "Admins podem tudo" ON public.usuarios 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);
