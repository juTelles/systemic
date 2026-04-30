import { describe, it, expect, beforeEach } from 'vitest';
import { createRoomsStore } from '../../../src/rooms/roomsStore.js';

describe('roomsStore', () => {
  let store;

  beforeEach(() => {
    store = createRoomsStore();
  });

  describe('generateRoomId', () => {
    it('gera IDs sequenciais começando de 100', () => {
      const id1 = store.generateRoomId();
      const id2 = store.generateRoomId();
      const id3 = store.generateRoomId();
      expect(id1).toBe('100');
      expect(id2).toBe('101');
      expect(id3).toBe('102');
    });

    it('continua sequencial após múltiplas chamadas', () => {
      store.generateRoomId(); // 100
      store.generateRoomId(); // 101
      const id = store.generateRoomId();
      expect(id).toBe('102');
    });
  });

  describe('ensure', () => {
    it('cria room se não existe', () => {
      const room = store.ensure('200', (id) => ({ id, players: [] }));
      expect(room.id).toBe('200');
      expect(room.players).toEqual([]);
    });

    it('retorna room existente sem sobrescrever', () => {
      const room1 = store.ensure('200', (id) => ({ id, players: [] }));
      const room2 = store.ensure('200', (id) => ({ id, players: ['override'] }));
      expect(room1).toBe(room2);
      expect(room2.players).toEqual([]);
    });

    it('cria múltiplas rooms diferentes', () => {
      const room1 = store.ensure('201', (id) => ({ id, data: 1 }));
      const room2 = store.ensure('202', (id) => ({ id, data: 2 }));
      expect(room1.data).toBe(1);
      expect(room2.data).toBe(2);
    });
  });

  describe('get', () => {
    it('retorna room se existe', () => {
      store.ensure('300', (id) => ({ id, name: 'Test' }));
      const room = store.get('300');
      expect(room).toEqual({ id: '300', name: 'Test' });
    });

    it('retorna undefined se room não existe', () => {
      const room = store.get('999');
      expect(room).toBeUndefined();
    });
  });

  describe('getAll', () => {
    it('retorna array vazio se nenhuma room', () => {
      const rooms = store.getAll();
      expect(rooms).toEqual([]);
    });

    it('retorna todas as rooms criadas', () => {
      store.ensure('301', (id) => ({ id, num: 1 }));
      store.ensure('302', (id) => ({ id, num: 2 }));
      store.ensure('303', (id) => ({ id, num: 3 }));
      const rooms = store.getAll();
      expect(rooms).toHaveLength(3);
      expect(rooms.map(r => r.id)).toContain('301');
      expect(rooms.map(r => r.id)).toContain('302');
      expect(rooms.map(r => r.id)).toContain('303');
    });

    it('retorna array mesmo com uma room', () => {
      store.ensure('304', (id) => ({ id }));
      const rooms = store.getAll();
      expect(Array.isArray(rooms)).toBe(true);
      expect(rooms).toHaveLength(1);
    });
  });
});
