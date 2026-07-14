import { Router } from 'express';
import { GoogleGenAI } from '@google/genai';

export const chatRouter = Router();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

chatRouter.post('/', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Mensagem é obrigatória' });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: 'Você é um assistente de marketing experiente. Responda de forma concisa e útil.',
      }
    });
    res.json({ reply: response.text });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
