import { neon } from '@neondatabase/serverless';

// Use a dummy URL for build time, real URL for runtime
const databaseUrl = process.env.DATABASE_URL || 'postgresql://dummy:dummy@dummy/dummy';

export const sql = neon(databaseUrl);

// User interface matching our current structure
export interface User {
  id: number;
  email: string;
  password: string;
  isPremium: boolean;
  created_at: string;
  updated_at: string;
}

// Database functions
export async function findUserByEmail(email: string): Promise<User | null> {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  
  const result = await sql`
    SELECT id, email, password, is_premium as "isPremium", created_at, updated_at 
    FROM users WHERE email = ${email.toLowerCase()} LIMIT 1
  `;
  return (result[0] as User) || null;
}

export async function createUser(email: string, hashedPassword: string): Promise<User> {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  
  const result = await sql`
    INSERT INTO users (email, password, is_premium)
    VALUES (${email.toLowerCase()}, ${hashedPassword}, false)
    RETURNING id, email, password, is_premium as "isPremium", created_at, updated_at
  `;
  return result[0] as User;
}

export async function updateUserPremium(email: string, isPremium: boolean): Promise<User | null> {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  
  const result = await sql`
    UPDATE users 
    SET is_premium = ${isPremium}, updated_at = CURRENT_TIMESTAMP
    WHERE email = ${email.toLowerCase()}
    RETURNING id, email, password, is_premium as "isPremium", created_at, updated_at
  `;
  return (result[0] as User) || null;
}

export async function getUserById(id: number): Promise<User | null> {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  
  const result = await sql`
    SELECT id, email, password, is_premium as "isPremium", created_at, updated_at 
    FROM users WHERE id = ${id} LIMIT 1
  `;
  return (result[0] as User) || null;
}
