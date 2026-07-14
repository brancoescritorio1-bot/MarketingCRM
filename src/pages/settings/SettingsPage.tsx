import React, { useState } from 'react';
import { Building, User, Database, Globe, Bell, Shield, Server, Palette } from 'lucide-react';

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('agency');

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Configurações Gerais</h1>
          <p className="text-gray-600">Gerencie as configurações da agência, portal do cliente e sistema.</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Salvar Alterações
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 flex-shrink-0">
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveTab('agency')}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'agency' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <Building className="w-5 h-5 mr-3" /> Dados da Agência
            </button>
            <button 
              onClick={() => setActiveTab('appearance')}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'appearance' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <Palette className="w-5 h-5 mr-3" /> Aparência
            </button>
            <button 
              onClick={() => setActiveTab('portal')}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'portal' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <Globe className="w-5 h-5 mr-3" /> Portal do Cliente
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'security' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <Shield className="w-5 h-5 mr-3" /> Segurança & Backup
            </button>
            <button 
              onClick={() => setActiveTab('health')}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'health' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <Server className="w-5 h-5 mr-3" /> Saúde do Sistema
            </button>
            <button 
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'profile' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <User className="w-5 h-5 mr-3" /> Meu Perfil
            </button>
          </nav>
        </aside>

        <main className="flex-1">
          {activeTab === 'agency' && (
            <div className="bg-white shadow rounded-lg p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Informações da Agência</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome da Agência</label>
                  <input type="text" className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500" defaultValue="Minha Agência" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CNPJ</label>
                  <input type="text" className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">E-mail de Contato</label>
                  <input type="email" className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
                  <input type="text" className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'health' && (
            <div className="bg-white shadow rounded-lg p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Monitoramento do Sistema</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-100 rounded-lg">
                  <div className="flex items-center">
                    <Database className="w-5 h-5 text-green-600 mr-3" />
                    <div>
                      <p className="font-medium text-green-900">Banco de Dados (Supabase)</p>
                      <p className="text-sm text-green-700">Online • 14ms de latência</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-200 text-green-800 text-xs font-semibold rounded-full">Operacional</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-100 rounded-lg">
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 text-green-600 mr-3" />
                    <div>
                      <p className="font-medium text-green-900">Storage API</p>
                      <p className="text-sm text-green-700">Online • 45ms de latência</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-200 text-green-800 text-xs font-semibold rounded-full">Operacional</span>
                </div>
              </div>
            </div>
          )}

          {/* Outras abas podem ser desenvolvidas de forma análoga */}
          {activeTab !== 'agency' && activeTab !== 'health' && (
             <div className="bg-white shadow rounded-lg p-6 border border-gray-100 flex items-center justify-center h-64 text-gray-500">
               Conteúdo da aba em desenvolvimento...
             </div>
          )}
        </main>
      </div>
    </div>
  );
}