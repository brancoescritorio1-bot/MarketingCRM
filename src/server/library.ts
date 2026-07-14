import { Router } from 'express';
import { db } from '../db/index.js';
import { libraryFiles } from '../db/schema.js';
import { eq } from 'drizzle-orm';

export const libraryRouter = Router();

libraryRouter.get('/', async (req, res) => {
  try {
    const files = await db.select().from(libraryFiles).orderBy(libraryFiles.createdAt);
    res.json(files);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

libraryRouter.post('/', async (req, res) => {
  const { title, url, category } = req.body;
  try {
    const newFile = await db.insert(libraryFiles).values({
      title, url, category: category || 'geral'
    }).returning();
    res.json(newFile[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

libraryRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await db.delete(libraryFiles).where(eq(libraryFiles.id, id)).returning();
    if (deleted.length === 0) return res.status(404).json({ error: 'Arquivo não encontrado' });
    res.json({ success: true, file: deleted[0] });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
