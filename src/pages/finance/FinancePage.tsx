import React from 'react';

export function FinancePage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-navy-900 mb-6">Módulo Financeiro</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700">Receitas do Mês</h2>
          <p className="text-3xl font-bold text-green-600">R$ 0,00</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700">Despesas do Mês</h2>
          <p className="text-3xl font-bold text-red-600">R$ 0,00</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700">Fluxo de Caixa</h2>
          <p className="text-3xl font-bold text-blue-600">R$ 0,00</p>
        </div>
      </div>
      <p className="mt-8 text-gray-600">Gestão financeira, contratos e indicadores em desenvolvimento.</p>
    </div>
  );
}
