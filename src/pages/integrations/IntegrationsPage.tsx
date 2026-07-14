import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';

export function IntegrationsPage() {
  const [integrations, setIntegrations] = useState([
    { id: 1, name: 'Meta Ads', status: 'connected', description: 'Sincronizar leads e campanhas' },
    { id: 2, name: 'Google Ads', status: 'disconnected', description: 'Monitorar métricas de anúncios' },
    { id: 3, name: 'WhatsApp', status: 'connected', description: 'Disparos de mensagens automatizadas' },
    { id: 4, name: 'Canva', status: 'disconnected', description: 'Importar templates direto para o app' },
  ]);

  const toggle = (id: number) => {
    setIntegrations(integrations.map(i => {
      if (i.id === id) {
        return { ...i, status: i.status === 'connected' ? 'disconnected' : 'connected' };
      }
      return i;
    }));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-navy-900 mb-6">Central de Integrações</h1>
      <p className="text-gray-600 mb-6">Gerencie suas conexões com Meta, Google, WhatsApp, Canva e IA.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map(integration => (
          <div key={integration.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg text-navy-900">{integration.name}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${integration.status === 'connected' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                  {integration.status === 'connected' ? 'Conectado' : 'Desconectado'}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-6">{integration.description}</p>
            </div>
            <Button variant={integration.status === 'connected' ? 'outline' : 'primary'} onClick={() => toggle(integration.id)}>
              {integration.status === 'connected' ? 'Desconectar' : 'Conectar'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
