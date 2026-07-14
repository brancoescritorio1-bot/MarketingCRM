import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db/index.js';
import { users } from '../db/schema.js';
import { eq } from 'drizzle-orm';

export const authRouter = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-jwt-key';

authRouter.get('/check-admin', async (req, res) => { try { const result = await db.select().from(users).where(eq(users.email, 'larapecanha2015@gmail.com')); res.json({ exists: result.length > 0 }); } catch (error: any) { res.status(500).json({ error: error.message }); } });

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userResult = await db.select().from(users).where(eq(users.email, email));
    if (userResult.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    const user = userResult[0];
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, { httpOnly: true, path: '/' });
    res.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

authRouter.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const existing = await db.select().from(users).where(eq(users.email, email));
    if (existing.length > 0) {
      return res.status(400).json({ error: 'E-mail já cadastrado' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const result = await db.insert(users).values({
      email,
      passwordHash,
      name: name || 'Usuário',
      role: 'administrador'
    }).returning();
    
    const user = result[0];
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, { httpOnly: true, path: '/' });
    res.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

authRouter.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ success: true });
});

authRouter.get('/me', async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: 'Não autenticado' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const userResult = await db.select().from(users).where(eq(users.id, decoded.id));
    if (userResult.length === 0) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }
    const user = userResult[0];
    res.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});
