import { describe, it, expect } from 'vitest';
import {
  getPlayerObject,
  getTotalPlayersPoints,
  isGameReadyToStart,
} from '../../../src/game/selectors.js';

describe('selectors', () => {
  describe('getPlayerObject', () => {
    it('encontra player por ID', () => {
      const playersArray = [
        { id: '1', nickname: 'Alice' },
        { id: '2', nickname: 'Bob' },
      ];
      const result = getPlayerObject('2', playersArray);
      expect(result).toEqual({ id: '2', nickname: 'Bob' });
    });

    it('retorna undefined se player não encontrado', () => {
      const playersArray = [{ id: '1', nickname: 'Alice' }];
      const result = getPlayerObject('999', playersArray);
      expect(result).toBeUndefined();
    });

    it('retorna undefined se array vazio', () => {
      const result = getPlayerObject('1', []);
      expect(result).toBeUndefined();
    });
  });

  describe('getTotalPlayersPoints', () => {
    it('soma handPoints + bankPoints', () => {
      const player = { handPoints: 3, bankPoints: 4 };
      const result = getTotalPlayersPoints(player);
      expect(result).toBe(7);
    });

    it('soma com zero em ambos', () => {
      const player = { handPoints: 0, bankPoints: 0 };
      const result = getTotalPlayersPoints(player);
      expect(result).toBe(0);
    });

    it('soma com valores grandes', () => {
      const player = { handPoints: 100, bankPoints: 200 };
      const result = getTotalPlayersPoints(player);
      expect(result).toBe(300);
    });
  });

  describe('isGameReadyToStart', () => {
    it('retorna true com número correto de players, phase LOBBY e todos READY', () => {
      const state = {
        players: [
          { status: 'READY' },
          { status: 'READY' },
        ],
        phase: 'LOBBY',
        gameConfig: { minPlayers: 2, maxPlayers: 4 },
      };
      const result = isGameReadyToStart(state, 'LOBBY', 'READY');
      expect(result).toBe(true);
    });

    it('retorna false se um player não está READY', () => {
      const state = {
        players: [
          { status: 'READY' },
          { status: 'WAITING' },
        ],
        phase: 'LOBBY',
        gameConfig: { minPlayers: 2, maxPlayers: 4 },
      };
      const result = isGameReadyToStart(state, 'LOBBY', 'READY');
      expect(result).toBe(false);
    });

    it('retorna false se menos que minPlayers', () => {
      const state = {
        players: [{ status: 'READY' }],
        phase: 'LOBBY',
        gameConfig: { minPlayers: 2, maxPlayers: 4 },
      };
      const result = isGameReadyToStart(state, 'LOBBY', 'READY');
      expect(result).toBe(false);
    });

    it('retorna false se mais que maxPlayers', () => {
      const state = {
        players: [
          { status: 'READY' },
          { status: 'READY' },
          { status: 'READY' },
          { status: 'READY' },
          { status: 'READY' },
        ],
        phase: 'LOBBY',
        gameConfig: { minPlayers: 2, maxPlayers: 4 },
      };
      const result = isGameReadyToStart(state, 'LOBBY', 'READY');
      expect(result).toBe(false);
    });

    it('retorna false se phase incorreta', () => {
      const state = {
        players: [
          { status: 'READY' },
          { status: 'READY' },
        ],
        phase: 'IN_GAME',
        gameConfig: { minPlayers: 2, maxPlayers: 4 },
      };
      const result = isGameReadyToStart(state, 'LOBBY', 'READY');
      expect(result).toBe(false);
    });
  });
});
