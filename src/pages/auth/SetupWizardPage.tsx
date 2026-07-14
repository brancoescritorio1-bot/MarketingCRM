import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ChevronRight, Building, User, Database, Share2, Globe, MessageSquare, Brain } from 'lucide-react';

const STEPS = [
  { id: 1, title: 'Agência', icon: Building },
  { id: 2, title: 'Admin', icon: User },
  { id: 3, title: 'Supabase', icon: Database },
  { id: 4, title: 'Meta', icon: Share2 },
  { id: 5, title: 'Google', icon: Globe },
  { id: 6, title: 'WhatsApp', icon: MessageSquare },
  { id: 7, title: 'IA', icon: Brain },
];

export function SetupWizardPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Concluir setup
      navigate('/');
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-navy-900">Configuração Inicial</h2>
          <p className="mt-2 text-sm text-gray-600">Prepare sua agência para decolar em poucos passos.</p>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Progress Bar */}
          <div className="border-b border-gray-200">
            <div className="flex justify-between items-center px-6 py-4 overflow-x-auto">
              {STEPS.map((step) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                
                return (
                  <div key={step.id} className={`flex items-center ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${isActive ? 'border-blue-600 bg-blue-50' : isCompleted ? 'border-green-600 bg-green-50' : 'border-gray-300'}`}>
                      {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                    </div>
                    {step.id !== STEPS.length && (
                      <div className={`w-8 h-1 mx-2 rounded ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Passo {currentStep}: {STEPS.find(s => s.id === currentStep)?.title}
            </h3>

            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nome da Agência</label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Sua Agência" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">CNPJ</label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="00.000.000/0000-00" />
                </div>
              </div>
            )}

            {currentStep > 1 && currentStep < 8 && (
              <div className="text-center py-10">
                <p className="text-gray-500">Integração com {STEPS.find(s => s.id === currentStep)?.title} (Simulação)</p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-left">
                  <label className="block text-sm font-medium text-gray-700 mb-1">API Key / Token</label>
                  <input type="password" placeholder="Cole seu token aqui" className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
              </div>
            )}

            <div className="mt-10 flex justify-between">
              <button
                onClick={handlePrev}
                disabled={currentStep === 1}
                className={`px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 ${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Voltar
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 flex items-center"
              >
                {currentStep === STEPS.length ? 'Concluir Setup' : 'Avançar'}
                {currentStep !== STEPS.length && <ChevronRight className="w-4 h-4 ml-2" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
