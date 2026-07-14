import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Send, Bot, User } from 'lucide-react';

export function AiChatPage() {
  const [messages, setMessages] = useState<{role: 'user'|'model', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(prev => [...prev, { role: 'model', text: data.reply }]);
      } else {
        const data = await res.json();
        alert(data.error || 'Erro na resposta da IA');
      }
    } catch (e) {
      console.error(e);
      alert('Erro de comunicação com a IA');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col space-y-4">
      <h1 className="text-2xl font-bold text-navy-900">Assistente de Marketing IA</h1>
      
      <div className="flex-1 bg-white rounded-lg border border-gray-100 shadow-sm p-4 overflow-y-auto flex flex-col gap-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <Bot className="w-12 h-12 mb-4 text-gray-300" />
            <p>Olá! Sou seu assistente de marketing. Como posso ajudar com suas campanhas ou ideias hoje?</p>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] rounded-lg p-3 ${msg.role === 'user' ? 'bg-navy-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                <div className="flex items-center gap-2 mb-1">
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  <span className="text-xs font-semibold">{msg.role === 'user' ? 'Você' : 'Assistente'}</span>
                </div>
                <div className="text-sm whitespace-pre-wrap">{msg.text}</div>
              </div>
            </div>
          ))
        )}
        {loading && (
          <div className="flex justify-start">
            <div className="max-w-[75%] rounded-lg p-3 bg-gray-100 text-gray-800 flex items-center gap-2">
              <Bot className="w-4 h-4 animate-pulse" />
              <span className="text-sm">Pensando...</span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex gap-2">
        <Input 
          className="flex-1" 
          placeholder="Pergunte sobre ideias de posts, copies ou estratégias..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <Button type="submit" disabled={loading || !input.trim()}>
          <Send className="w-4 h-4 mr-2" />
          Enviar
        </Button>
      </form>
    </div>
  );
}
