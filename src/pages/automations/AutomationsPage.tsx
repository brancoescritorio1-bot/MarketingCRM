import React from 'react';
import { Zap, Activity, Clock, AlertTriangle, Plus, Play, Pause, Settings, MoreVertical } from 'lucide-react';

export function AutomationsPage() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Central de Automações (Workflow Builder)</h1>
          <p className="text-gray-600">Crie fluxos de trabalho visuais conectando gatilhos, condições e múltiplas ações.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Criar Automação
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100 flex items-center">
          <div className="bg-green-100 p-3 rounded-full mr-4">
            <Play className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500 uppercase">Automações Ativas</h2>
            <p className="text-2xl font-bold text-gray-900">3</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100 flex items-center">
          <div className="bg-gray-100 p-3 rounded-full mr-4">
            <Pause className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500 uppercase">Automações Inativas</h2>
            <p className="text-2xl font-bold text-gray-900">1</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100 flex items-center">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <Activity className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500 uppercase">Execuções no Mês</h2>
            <p className="text-2xl font-bold text-gray-900">1,204</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100 flex items-center">
          <div className="bg-red-100 p-3 rounded-full mr-4">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500 uppercase">Falhas (Mês)</h2>
            <p className="text-2xl font-bold text-red-600">2</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow border border-gray-100 mb-8 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Workflow Builder (Prévia Visual)</h2>
              <div className="flex space-x-2">
                <button className="text-gray-500 hover:text-gray-700"><Settings className="w-4 h-4" /></button>
                <button className="text-gray-500 hover:text-gray-700"><MoreVertical className="w-4 h-4" /></button>
              </div>
            </div>
            
            {/* Pseudo-Canvas para Drag & Drop */}
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center relative overflow-hidden h-[400px]">
              
              {/* Controles de Zoom/Mini-mapa visuais */}
              <div className="absolute bottom-4 right-4 bg-white shadow rounded border border-gray-200 p-2 flex space-x-2">
                <button className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded text-gray-600 hover:bg-gray-200">+</button>
                <button className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded text-gray-600 hover:bg-gray-200">-</button>
              </div>

              <div className="flex flex-col items-center justify-center space-y-4">
                {/* Gatilho */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-purple-200 w-72 flex items-center cursor-move hover:shadow-md transition-shadow">
                  <div className="bg-purple-100 p-2 rounded mr-3">
                    <Zap className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="text-left flex-1">
                    <span className="text-xs font-bold text-purple-600 uppercase">Gatilho</span>
                    <p className="text-sm font-medium text-gray-900">Novo Cliente Cadastrado</p>
                  </div>
                </div>
                
                <div className="w-0.5 h-8 bg-gray-300 relative">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full w-4 h-4 flex items-center justify-center text-gray-400 text-xs">+</div>
                </div>
                
                {/* Condição */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-yellow-200 w-72 flex items-center cursor-move hover:shadow-md transition-shadow">
                  <div className="bg-yellow-100 p-2 rounded mr-3">
                    <Settings className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div className="text-left flex-1">
                    <span className="text-xs font-bold text-yellow-600 uppercase">Condição</span>
                    <p className="text-sm font-medium text-gray-900">Se Plano = Premium</p>
                  </div>
                </div>

                <div className="w-0.5 h-8 bg-gray-300 relative">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full w-4 h-4 flex items-center justify-center text-gray-400 text-xs">+</div>
                </div>
                
                {/* Ação 1 */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-200 w-72 flex items-center cursor-move hover:shadow-md transition-shadow">
                  <div className="bg-blue-100 p-2 rounded mr-3">
                    <Play className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-left flex-1">
                    <span className="text-xs font-bold text-blue-600 uppercase">Ação 1</span>
                    <p className="text-sm font-medium text-gray-900">Criar Pastas no Google Drive</p>
                  </div>
                </div>

                <div className="w-0.5 h-8 bg-gray-300 relative">
                   <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full w-4 h-4 flex items-center justify-center text-gray-400 text-xs">+</div>
                </div>
                
                {/* Ação 2 */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-200 w-72 flex items-center cursor-move hover:shadow-md transition-shadow">
                  <div className="bg-blue-100 p-2 rounded mr-3">
                    <Play className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-left flex-1">
                    <span className="text-xs font-bold text-blue-600 uppercase">Ação 2</span>
                    <p className="text-sm font-medium text-gray-900">Enviar WhatsApp de Boas-Vindas</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow border border-gray-100 mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Meus Workflows</h2>
            <ul className="space-y-3">
              <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
                  <span className="text-sm font-medium text-gray-700">Onboarding Cliente Premium</span>
                </div>
                <MoreVertical className="w-4 h-4 text-gray-400 cursor-pointer" />
              </li>
              <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
                  <span className="text-sm font-medium text-gray-700">Aprovação de Conteúdo</span>
                </div>
                <MoreVertical className="w-4 h-4 text-gray-400 cursor-pointer" />
              </li>
              <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-gray-400 mr-3"></div>
                  <span className="text-sm font-medium text-gray-700">Alerta Contrato Vencendo</span>
                </div>
                <MoreVertical className="w-4 h-4 text-gray-400 cursor-pointer" />
              </li>
            </ul>
            <button className="w-full mt-4 text-sm text-blue-600 font-medium hover:text-blue-700">Ver todos os modelos prontos &rarr;</button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Logs & Histórico</h2>
              <Clock className="w-4 h-4 text-gray-400" />
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-green-100 p-1 rounded mt-0.5 mr-3">
                  <Zap className="w-3 h-3 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Onboarding Cliente Premium</p>
                  <p className="text-xs text-gray-500">Hoje, 10:42 • Sucesso (1.2s)</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-100 p-1 rounded mt-0.5 mr-3">
                  <Zap className="w-3 h-3 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Aprovação de Conteúdo</p>
                  <p className="text-xs text-gray-500">Hoje, 09:15 • Sucesso (0.8s)</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-red-100 p-1 rounded mt-0.5 mr-3">
                  <AlertTriangle className="w-3 h-3 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Webhook Externo (Meta)</p>
                  <p className="text-xs text-gray-500">Ontem, 18:20 • Falha (Timeout)</p>
                  <button className="text-xs text-blue-600 mt-1 hover:underline">Reprocessar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

