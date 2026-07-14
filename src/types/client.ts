export interface Client {
  id: string;
  name: string;
  company: string;
  trade_name: string;
  cpf_cnpj: string;
  segment: string;
  description: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface ClientContact {
  client_id: string;
  whatsapp: string;
  phone: string;
  email: string;
  website: string;
}

export interface ClientAddress {
  client_id: string;
  zip: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface ClientSocial {
  client_id: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  linkedin: string;
  youtube: string;
  pinterest: string;
}

export interface ClientBrand {
  client_id: string;
  logo_url: string;
  color_palette: string;
  font_family: string;
  manual_url: string;
}

export interface ClientPlan {
  client_id: string;
  name: string;
  value: number;
  start_date: string;
  due_date: string;
  status: 'active' | 'inactive';
  payment_method: string;
}

export interface ClientLinks {
  client_id: string;
  drive: string;
  canva: string;
  meta: string;
  calendar: string;
  sheets: string;
  other: string;
}
