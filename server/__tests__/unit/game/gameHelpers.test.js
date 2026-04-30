import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  applyTest,
  resolveBug,
  subtractPointsToPlayer,
  addPointsToPlayerBank,
  addPointsToPlayerBankByHolding,
  addPointsToPlayerHand,
} from '../../../src/game/gameHelpers.js';
import { mockPlayer } from '../../fixtures/mockData.js';

describe('gameHelpers', () => {
  describe('applyTest', () => {
    it('marca hasTests como true', () => {
      const component = { hasTests: false };
      const result = applyTest(component);
      expect(result.hasTests).toBe(true);
    });

    it('retorna sem mudar se já tem testes', () => {
      const component = { hasTests: true };
      expect(() => applyTest(component)).toThrow('COMPONENT_ALREADY_HAS_TESTS');
    });
  });

  describe('resolveBug', () => {
    it('decrementa bugAmount quando > 0', () => {
      const component = { bugAmount: 3 };
      const result = resolveBug(component, 1);
      expect(result.bugAmount).toBe(2);
    });

    it('não decrementa abaixo de 0', () => {
      const component = { bugAmount: 0 };
      expect(() => resolveBug(component, 1)).toThrow(
        'COMPONENT_HAS_NO_BUGS_TO_RESOLVE',
      );
    });

    it('usa quantidade padrão 1', () => {
      const component = { bugAmount: 3 };
      const result = resolveBug(component);
      expect(result.bugAmount).toBe(2);
    });

    it('decrementa múltiplos bugs', () => {
      const component = { bugAmount: 5 };
      const result = resolveBug(component, 3);
      expect(result.bugAmount).toBe(2);
    });
  });

  describe('subtractPointsToPlayer', () => {
    let player;

    beforeEach(() => {
      player = { ...mockPlayer };
    });

    it('subtrai de handPoints quando suficiente', () => {
      player.handPoints = 5;
      player.bankPoints = 3;
      const result = subtractPointsToPlayer(player, 2);
      expect(result.handPoints).toBe(3);
      expect(result.bankPoints).toBe(3);
    });

    it('usa bankPoints quando handPoints insuficiente', () => {
      player.handPoints = 2;
      player.bankPoints = 5;
      const result = subtractPointsToPlayer(player, 4);
      expect(result.handPoints).toBe(0);
      expect(result.bankPoints).toBe(3);
    });

    it('rejeita se total insuficiente', () => {
      player.handPoints = 1;
      player.bankPoints = 1;
      expect(() => subtractPointsToPlayer(player, 5)).toThrow(
        'NOT_ENOUGH_POINTS_TO_SUBTRACT',
      );
    });
  });

  describe('addPointsToPlayerBankByDonation', () => {
    let player;

    beforeEach(() => {
      player = { handPoints: 2, bankPoints: 2 };
    });

    it('adiciona pontos ao bank se não excede máximo', () => {
      const result = addPointsToPlayerBank(player, 2, 8);
      expect(result.bankPoints).toBe(4);
    });

    it('rejeita se excede máximo', () => {
      const result = addPointsToPlayerBank(player, 6, 8);
      expect(result.bankPoints).toBe(6);
      expect(result.handPoints).toBe(2);
    });
  });

  describe('addPointsToPlayerBankByHolding', () => {
    let player;

    beforeEach(() => {
      player = { handPoints: 5, bankPoints: 2 };
    });

    it('move pontos de hand para bank', () => {
      const result = addPointsToPlayerBankByHolding(player, 3);
      expect(result.handPoints).toBe(2);
      expect(result.bankPoints).toBe(5);
    });

    it('rejeita se handPoints insuficiente', () => {
      player.handPoints = 1;
      const result = addPointsToPlayerBankByHolding(player, 3);
      expect(result.handPoints).toBe(0);
      expect(result.bankPoints).toBe(3);
    });
  });

  describe('addPointsToPlayerHand', () => {
    let player;

    beforeEach(() => {
      player = { handPoints: 2, bankPoints: 2 };
    });

    it('adiciona pontos à mão se não excede máximo', () => {
      const result = addPointsToPlayerHand(player, 2, 8);
      expect(result.handPoints).toBe(4);
    });

    it('não adiciona se já em máximo', () => {
      player.handPoints = 4;
      player.bankPoints = 4;
      const result = addPointsToPlayerHand(player, 2, 8);
      expect(result).toBe(player);
    });
  });
});
