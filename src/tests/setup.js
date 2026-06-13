import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import '@testing-library/jest-dom';

// 1. Mock global do alert para evitar o erro "Not implemented: window.alert"
global.alert = vi.fn();

// 2. Mock global da API de mídia (Câmera)
Object.defineProperty(global.navigator, 'mediaDevices', {
  value: {
    getUserMedia: vi.fn().mockResolvedValue({
      getTracks: () => [{ stop: vi.fn() }],
    }),
  },
  writable: true
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks(); // Limpa as chamadas de mock após cada teste
});