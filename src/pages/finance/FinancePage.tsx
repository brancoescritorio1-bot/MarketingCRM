import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Trash2 } from 'lucide-react';

export function FinancePage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/finance');
      if (res.ok) {
        const data = await res.json();
        setTransactions(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/finance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, amount: parseFloat(amount), type })
      });
      if (res.ok) {
        const newTx = await res.json();
        setTransactions([...transactions, newTx]);
        setDescription('');
        setAmount('');
      } else {
        alert('Erro ao salvar');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja excluir?')) return;
    try {
      const res = await fetch(`/api/finance/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setTransactions(transactions.filter(t => t.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const formatCurrency = (val: string | number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(val));
  };

  const income = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + Number(curr.amount), 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + Number(curr.amount), 0);
  const balance = income - expense;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-navy-900 mb-6">Módulo Financeiro</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Receitas</h2>
          <p className="text-3xl font-bold text-green-600">{formatCurrency(income)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Despesas</h2>
          <p className="text-3xl font-bold text-red-600">{formatCurrency(expense)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Fluxo de Caixa</h2>
          <p className={`text-3xl font-bold ${balance >= 0 ? 'text-navy-900' : 'text-red-600'}`}>{formatCurrency(balance)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm lg:col-span-1 h-fit">
          <h2 className="text-lg font-medium text-navy-900 mb-4">Nova Transação</h2>
          <form onSubmit={handleAdd} className="flex flex-col gap-4">
            <Input required placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} />
            <Input required type="number" step="0.01" placeholder="Valor" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <select 
              className="h-10 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-navy-500"
              value={type} 
              onChange={(e) => setType(e.target.value)}
            >
              <option value="income">Receita</option>
              <option value="expense">Despesa</option>
            </select>
            <Button type="submit" disabled={saving}>{saving ? 'Adicionando...' : 'Adicionar'}</Button>
          </form>
        </div>

        <div className="bg-white rounded-lg border border-gray-100 shadow-sm lg:col-span-2">
          {loading ? (
            <div className="p-6 text-center text-gray-500">Carregando...</div>
          ) : transactions.length === 0 ? (
            <div className="p-6 text-center text-gray-500">Nenhuma transação registrada.</div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase">
                <tr>
                  <th className="px-6 py-4">Data</th>
                  <th className="px-6 py-4">Descrição</th>
                  <th className="px-6 py-4 text-right">Valor</th>
                  <th className="px-6 py-4 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {transactions.map(tx => (
                  <tr key={tx.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-600 text-sm">{new Date(tx.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 font-medium text-navy-900">{tx.description}</td>
                    <td className={`px-6 py-4 text-right font-medium ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                      {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => handleDelete(tx.id)} className="text-red-400 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
