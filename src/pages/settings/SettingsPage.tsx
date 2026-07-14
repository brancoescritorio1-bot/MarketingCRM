import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function SettingsPage() {
  const [settings, setSettings] = useState({
    companyName: 'Minha Empresa',
    timezone: 'America/Sao_Paulo',
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-navy-900">Configurações</h1>
      <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Geral</h2>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Nome da Empresa" value={settings.companyName} onChange={(e) => setSettings({...settings, companyName: e.target.value})} />
          <Input label="Fuso Horário" value={settings.timezone} onChange={(e) => setSettings({...settings, timezone: e.target.value})} />
        </div>
        <div className="mt-6">
          <Button>Salvar Alterações</Button>
        </div>
      </div>
    </div>
  );
}
