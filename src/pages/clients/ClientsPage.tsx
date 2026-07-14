import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { Client } from '@/types/client';
import { Plus, Search, MoreVertical } from 'lucide-react';
import { Input } from '@/components/ui/Input';

export function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('clients').select('*');
    if (data) setClients(data);
    setLoading(false);
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-navy-900">Clientes</h1>
        <Link to="/clients/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Cliente
          </Button>
        </Link>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex items-center gap-4">
        <Search className="w-5 h-5 text-gray-400" />
        <Input 
          placeholder="Pesquisar clientes..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-none focus:ring-0"
        />
      </div>

      {loading ? (
        <div className="text-center py-10">Carregando...</div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase">
              <tr>
                <th className="px-6 py-4">Nome</th>
                <th className="px-6 py-4">Empresa</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredClients.map(client => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-navy-900">{client.name}</td>
                  <td className="px-6 py-4 text-gray-600">{client.company}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${client.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {client.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link to={`/clients/${client.id}`} className="text-gray-400 hover:text-navy-900">
                      <MoreVertical className="w-5 h-5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
