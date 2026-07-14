import { useState, useEffect } from 'react';

export function CalendarPage() {
  const [contents, setContents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/contents');
      if (res.ok) {
        const data = await res.json();
        setContents(data.filter((c: any) => c.scheduledDate));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-navy-900">Calendário</h1>
      <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
        {loading ? (
          <div className="text-center py-10">Carregando...</div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Conteúdos Agendados</h2>
            {contents.length === 0 ? (
              <p className="text-gray-500">Nenhum conteúdo agendado.</p>
            ) : (
              <ul className="space-y-2">
                {contents.map(c => (
                  <li key={c.id} className="p-4 border rounded bg-gray-50 flex justify-between items-center">
                    <div>
                      <span className="font-semibold text-navy-900">{c.title}</span>
                      <span className="text-sm text-gray-500 ml-2">({c.type})</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {new Date(c.scheduledDate).toLocaleDateString()}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
