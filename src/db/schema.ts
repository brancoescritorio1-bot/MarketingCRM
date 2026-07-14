import { pgTable, uuid, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  name: text('name').notNull(),
  role: text('role').notNull().default('usuario'),
  status: text('status').notNull().default('ativo'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const clients = pgTable('clients', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  company: text('company').notNull(),
  tradeName: text('trade_name'),
  cpfCnpj: text('cpf_cnpj'),
  segment: text('segment'),
  description: text('description'),
  status: text('status').default('active'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const clientContacts = pgTable('client_contacts', {
  clientId: uuid('client_id').primaryKey().references(() => clients.id, { onDelete: 'cascade' }),
  whatsapp: text('whatsapp'),
  phone: text('phone'),
  email: text('email'),
  website: text('website'),
});

export const clientAddresses = pgTable('client_addresses', {
  clientId: uuid('client_id').primaryKey().references(() => clients.id, { onDelete: 'cascade' }),
  zip: text('zip'),
  street: text('street'),
  number: text('number'),
  complement: text('complement'),
  neighborhood: text('neighborhood'),
  city: text('city'),
  state: text('state'),
});

export const clientSocials = pgTable('client_socials', {
  clientId: uuid('client_id').primaryKey().references(() => clients.id, { onDelete: 'cascade' }),
  instagram: text('instagram'),
  facebook: text('facebook'),
  tiktok: text('tiktok'),
  linkedin: text('linkedin'),
  youtube: text('youtube'),
  pinterest: text('pinterest'),
});

export const clientBrands = pgTable('client_brands', {
  clientId: uuid('client_id').primaryKey().references(() => clients.id, { onDelete: 'cascade' }),
  logoUrl: text('logo_url'),
  colorPalette: text('color_palette'),
  fontFamily: text('font_family'),
  manualUrl: text('manual_url'),
});

export const clientLinks = pgTable('client_links', {
  clientId: uuid('client_id').primaryKey().references(() => clients.id, { onDelete: 'cascade' }),
  drive: text('drive'),
  canva: text('canva'),
  meta: text('meta'),
  calendar: text('calendar'),
  sheets: text('sheets'),
  other: text('other'),
});

export const libraryFiles = pgTable('library_files', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  url: text('url').notNull(),
  category: text('category').default('geral'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const transactions = pgTable('transactions', {
  id: uuid('id').primaryKey().defaultRandom(),
  description: text('description').notNull(),
  amount: text('amount').notNull(),
  type: text('type').notNull(), // 'income' or 'expense'
  date: timestamp('date').defaultNow().notNull(),
});

export const contents = pgTable('contents', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  type: text('type').notNull(),
  status: text('status').default('draft'),
  pipelineStage: text('pipeline_stage').default('Ideia'),
  clientId: uuid('client_id').references(() => clients.id, { onDelete: 'set null' }),
  scheduledDate: timestamp('scheduled_date'),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
