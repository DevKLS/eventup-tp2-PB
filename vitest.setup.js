import { expect, vi } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import '@testing-library/jest-dom';
import './supabaseMock';

// 1. Registra os matchers do jest-dom (para funcionar o toBeInTheDocument)
expect.extend(matchers);

// 2. Mock Global do Supabase
vi.mock('../src/services/supabaseClient', () => ({
  supabase: {
    auth: {
      getSession: vi.fn(() => Promise.resolve({ data: { session: null }, error: null })),
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } },
      })),
      signInWithPassword: vi.fn(),
    },
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({ data: [], error: null }),
    })),
  },
}));

// 3. Mock do window.alert (corrigindo o erro do Login.test.jsx)
window.alert = vi.fn();