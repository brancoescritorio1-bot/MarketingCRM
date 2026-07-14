import React from 'react';

export function ReportsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-navy-900 mb-6">Dashboard Executivo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-sm font-medium text-gray-500 uppercase">Clientes Ativos</h2>
          <p className="text-3xl font-bold text-gray-900">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-sm font-medium text-gray-500 uppercase">Receita Mensal</h2>
          <p className="text-3xl font-bold text-green-600">R$ 0,00</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-sm font-medium text-gray-500 uppercase">Conteúdos Criados</h2>
          <p className="text-3xl font-bold text-blue-600">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-sm font-medium text-gray-500 uppercase">Utilização da IA</h2>
          <p className="text-3xl font-bold text-purple-600">0</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Gráficos de Performance</h2>
        <p className="text-gray-600">Visualização de dados (gráficos) em desenvolvimento.</p>
      </div>
    </div>
  );
}
