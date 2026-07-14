import React from 'react';
import { Calendar, CheckCircle, XCircle, MessageSquare, Clock } from 'lucide-react';
import { useParams } from 'react-router-dom';

export function ClientPortalPage() {
  const { token } = useParams();

  // In a real app, we would fetch data based on the token.
  // We'll use mock data to demonstrate the UI.
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 py-4 px-6 sm:px-8 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-3 shadow-sm">
            M
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-tight">Minha Agência</h1>
            <p className="text-sm text-gray-500">Portal de Aprovação</p>
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
          <Clock className="w-4 h-4 mr-2 text-gray-500" />
          Link expira em 3 dias
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full p-4 sm:p-8">
        <div className="mb-8 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Programação Semanal</h2>
          <p className="text-gray-600 text-lg">Semana de 24 a 30 de Julho</p>
        </div>

        <div className="space-y-8">
          {/* Post Card 1 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all hover:shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="bg-gray-100 p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-200 relative min-h-[300px]">
                {/* Mock image placeholder */}
                <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                  <span className="font-medium">Imagem do Post 1</span>
                </div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-sm flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  24 Jul • 10:00
                </div>
              </div>
              <div className="p-6 flex flex-col">
                <div className="mb-4">
                  <span className="inline-block px-2.5 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded uppercase tracking-wider mb-3">Instagram Post</span>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Lançamento Nova Coleção</h3>
                  <div className="prose prose-sm text-gray-600">
                    <p>
                      A espera acabou! 🎉 Conheça nossa nova coleção de inverno que acabou de chegar. 
                      Peças exclusivas com conforto e estilo para você arrasar nesta estação. ❄️✨
                    </p>
                    <p className="text-blue-600 font-medium mt-2">
                      #NovaColecao #Inverno2026 #Moda #Estilo
                    </p>
                  </div>
                </div>
                
                <div className="mt-auto pt-6 border-t border-gray-100 flex flex-wrap gap-3">
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Aprovar
                  </button>
                  <button className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Alterar
                  </button>
                  <button className="flex-none bg-white border border-red-200 hover:bg-red-50 text-red-600 px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center" title="Reprovar">
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Post Card 2 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all hover:shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="bg-gray-100 p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-200 relative min-h-[300px]">
                <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                  <span className="font-medium">Vídeo do Reels</span>
                </div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-sm flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  26 Jul • 18:00
                </div>
              </div>
              <div className="p-6 flex flex-col">
                <div className="mb-4">
                  <span className="inline-block px-2.5 py-1 bg-pink-100 text-pink-700 text-xs font-bold rounded uppercase tracking-wider mb-3">Instagram Reels</span>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Bastidores da Produção</h3>
                  <div className="prose prose-sm text-gray-600">
                    <p>
                      Um pouquinho de como fazemos a magia acontecer nos bastidores. 🎬✨ 
                      Muito carinho e dedicação em cada detalhe para entregar o melhor pra vocês.
                    </p>
                    <p className="text-blue-600 font-medium mt-2">
                      #Bastidores #MakingOf #TrabalhoComAmor
                    </p>
                  </div>
                </div>
                
                <div className="mt-auto pt-6 border-t border-gray-100">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                    <div>
                      <p className="text-green-800 font-medium">Aprovado por João Cliente</p>
                      <p className="text-green-600 text-xs mt-1">Hoje, às 09:42</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-6 text-center text-gray-500 text-sm mt-auto">
        <p>Gerado pelo sistema de aprovação inteligente.</p>
      </footer>
    </div>
  );
}
