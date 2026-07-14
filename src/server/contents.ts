import { Router } from 'express';
import { db } from '../db/index.js';
import { contents } from '../db/schema.js';
import { eq } from 'drizzle-orm';

export const contentsRouter = Router();

contentsRouter.get('/', async (req, res) => {
  try {
    const allContents = await db.select().from(contents).orderBy(contents.scheduledDate);
    res.json(allContents);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

contentsRouter.post('/', async (req, res) => {
  const { title, type, status, clientId, scheduledDate, description, pipelineStage } = req.body;
  try {
    const newContent = await db.insert(contents).values({
      title,
      type,
      status: status || 'draft',
      pipelineStage: pipelineStage || 'Ideia',
      clientId: clientId || null,
      scheduledDate: scheduledDate ? new Date(scheduledDate) : null,
      description
    }).returning();
    res.json(newContent[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

contentsRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, type, status, clientId, scheduledDate, description, pipelineStage } = req.body;
  try {
    const updated = await db.update(contents).set({
      title,
      type,
      status,
      pipelineStage,
      clientId: clientId || null,
      scheduledDate: scheduledDate ? new Date(scheduledDate) : null,
      description,
      updatedAt: new Date()
    }).where(eq(contents.id, id)).returning();
    if (updated.length === 0) return res.status(404).json({ error: 'Conteúdo não encontrado' });
    res.json(updated[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

contentsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await db.delete(contents).where(eq(contents.id, id)).returning();
    if (deleted.length === 0) return res.status(404).json({ error: 'Conteúdo não encontrado' });
    res.json({ success: true, content: deleted[0] });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
