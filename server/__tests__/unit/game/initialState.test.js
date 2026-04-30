import { describe, it, expect } from 'vitest';
import { createInitialState } from '../../../src/game/initialState.js';

describe('initialState', () => {
  it('cria state com metadados básicos', () => {
    const state = createInitialState({ roomId: 'test-room-123' });
    expect(state.meta).toBeDefined();
    expect(state.meta.roomId).toBe('test-room-123');
    expect(state.meta.rev).toBe(0);
    expect(state.meta.createdAt).toBeDefined();
    expect(state.meta.updatedAt).toBeDefined();
  });

  it('inicializa phase como LOBBY', () => {
    const state = createInitialState({ roomId: 'test' });
    expect(state.phase).toBe('LOBBY');
  });

  it('inicializa players como array vazio', () => {
    const state = createInitialState({ roomId: 'test' });
    expect(Array.isArray(state.players)).toBe(true);
    expect(state.players).toEqual([]);
  });

  it('inicializa flow com estrutura correta', () => {
    const state = createInitialState({ roomId: 'test' });
    expect(state.flow).toBeDefined();
    expect(state.flow.round).toBe(0);
    expect(state.flow.turn).toBe(0);
    expect(state.flow.currentPlayerId).toBeNull();
    expect(state.flow.step).toBeDefined();
    expect(state.flow.step.name).toBe('WAITING_PLAYERS_READY');
  });


  it('inicializa gameConfig com limites e custos', () => {
    const state = createInitialState({ roomId: 'test' });
    expect(state.gameConfig).toBeDefined();
    expect(state.gameConfig.maxPlayers).toBe(4);
    expect(state.gameConfig.minPlayers).toBe(4);
    expect(state.gameConfig.taskPoints).toBeDefined();
    expect(state.gameConfig.decisionCosts).toBeDefined();
  });

  it('inicializa deck como array vazio', () => {
    const state = createInitialState({ roomId: 'test' });
    expect(state.deck).toEqual({ drawPile: [], discardPile: [] });
  });

  it('inicializa log com lastEvent null', () => {
    const state = createInitialState({ roomId: 'test' });
    expect(state.log).toBeDefined();
    expect(state.log.lastEvent).toBeNull();
  });

  it('inicializa components como objeto vazio', () => {
    const state = createInitialState({ roomId: 'test' });
    expect(state.components).toBeDefined();
    expect(typeof state.components).toBe('object');
  });

  it('timestamps createdAt e updatedAt são iguais', () => {
    const state = createInitialState({ roomId: 'test' });
    expect(state.meta.createdAt).toBe(state.meta.updatedAt);
  });

  it('flowControl.current.accepts é PLAYER_INPUT', () => {
    const state = createInitialState({ roomId: 'test' });
    expect(state.flow.step.flowControl.current.accepts).toBe('PLAYER_INPUT');
  });

  it('deck composition tem valores de quantidade positivos', () => {
    const state = createInitialState({ roomId: 'test' });
    expect(state.gameConfig.deckComposition).toBeDefined();
    expect(Array.isArray(state.gameConfig.deckComposition.regularCards)).toBe(
      true,
    );
    state.gameConfig.deckComposition.regularCards.forEach(item => {
      expect(item.quantity).toBeGreaterThan(0);
    });
    expect(state.gameConfig.deckComposition.specialCards.quantity).toBeGreaterThan(
      0,
    );
  });
});
