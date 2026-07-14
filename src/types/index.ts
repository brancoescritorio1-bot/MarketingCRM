export type UserRole = 'admin' | 'editor' | 'designer' | 'client';

export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  created_by: string;
  updated_by: string;
}

export interface User extends BaseEntity {
  email: string;
  role: UserRole;
  name: string;
}
