import { Router } from 'express';
import { db } from '../db/index.js';
import { transactions } from '../db/schema.js';
import { eq } from 'drizzle-orm';

export const financeRouter = Router();

financeRouter.get('/', async (req, res) => {
  try {
    const list = await db.select().from(transactions).orderBy(transactions.date);
    res.json(list);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

financeRouter.post('/', async (req, res) => {
  const { description, amount, type, date } = req.body;
  try {
    const newTx = await db.insert(transactions).values({
      description,
      amount: String(amount),
      type,
      date: date ? new Date(date) : new Date()
    }).returning();
    res.json(newTx[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

financeRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await db.delete(transactions).where(eq(transactions.id, id)).returning();
    if (deleted.length === 0) return res.status(404).json({ error: 'Transação não encontrada' });
    res.json({ success: true, transaction: deleted[0] });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});