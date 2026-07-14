// Interface base para serviços de integração
export interface IntegrationService {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  testConnection(): Promise<boolean>;
}

// Implementações concretas seriam adicionadas aqui conforme necessário
export const metaService: IntegrationService = {
  connect: async () => { console.log('Conectando Meta...'); },
  disconnect: async () => { console.log('Desconectando Meta...'); },
  testConnection: async () => { return true; }
};
