import { Router } from 'express';
import { db } from '../db/index.js';
import { clients, clientContacts, clientAddresses, clientSocials, clientBrands, clientLinks } from '../db/schema.js';
import { eq, ilike, or } from 'drizzle-orm';

export const clientsRouter = Router();

// List all clients
clientsRouter.get('/', async (req, res) => {
  try {
    const allClients = await db.select().from(clients).orderBy(clients.name);
    res.json(allClients);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single client
clientsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.select().from(clients).where(eq(clients.id, id));
    if (result.length === 0) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    res.json(result[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new client
clientsRouter.post('/', async (req, res) => {
  const { name, company, trade_name, cpf_cnpj, segment, description, status } = req.body;
  try {
    const newClient = await db.insert(clients).values({
      name,
      company,
      tradeName: trade_name,
      cpfCnpj: cpf_cnpj,
      segment,
      description,
      status: status || 'active'
    }).returning();
    res.json(newClient[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update a client
clientsRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, company, trade_name, cpf_cnpj, segment, description, status } = req.body;
  try {
    const updatedClient = await db.update(clients).set({
      name,
      company,
      tradeName: trade_name,
      cpfCnpj: cpf_cnpj,
      segment,
      description,
      status,
      updatedAt: new Date()
    }).where(eq(clients.id, id)).returning();
    
    if (updatedClient.length === 0) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    res.json(updatedClient[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a client
clientsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedClient = await db.delete(clients).where(eq(clients.id, id)).returning();
    if (deletedClient.length === 0) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    res.json({ success: true, client: deletedClient[0] });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
