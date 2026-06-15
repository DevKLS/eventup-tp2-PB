import { vi } from 'vitest';

export const mockSupabase = {
  auth: {
    signInWithPassword: vi.fn(), // Deve ser um vi.fn() para aceitar .mockResolvedValueOnce
    getSession: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
    onAuthStateChange: vi.fn(() => ({ data: { subscription: { unsubscribe: vi.fn() } } })),
    signOut: vi.fn(),
  },
  from: vi.fn(() => ({
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({ data: {}, error: null }),
  })),
};

vi.mock('../services/supabaseClient', () => ({
  supabase: mockSupabase
}));