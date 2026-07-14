// Basic structure for future AI service integration
export interface AiAssistantService {
  generateText(prompt: string, context: any): Promise<string>;
}

// Placeholder implementation using Gemini
export const geminiService: AiAssistantService = {
  generateText: async (prompt: string, context: any) => {
    // Integration logic will go here
    return `Resposta simulada para: ${prompt}`;
  }
};
