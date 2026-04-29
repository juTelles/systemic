import { SYSTEM_HEALTH_STATES, GAME_PHASE, GAME_RESULT } from "../../../shared/src/constants/gameEnums.js";
import { buildGameConfig } from "../../../shared/src/definitions/gameConfigOptions.js";
import { createStepState } from "./roomStateFactories.js";

export function createInitialState({ roomId }) {
  const now = Date.now();
  const initialStep = createStepState('WAITING_PLAYERS_READY');
  const defaultGameConfig = buildGameConfig({
  playerCount: 4,
  difficulty: 'REGULAR',
});

  return {
    meta: { roomId, rev: 0, updatedAt: now, createdAt: now },
    phase: GAME_PHASE.LOBBY,
    gameLog: [],
    gameResult: null,
    players: [],
    flow: {
      round: 0,
      turn: 0,
      allTurnsCounter: 0,
      currentPlayerId: null,
      blockedUntil: null,
      crisisRoundCounter: 0,
      step: initialStep,
    },
    deck: {
      drawPile: [],
      discardPile: [],
    },
    log: { lastEvent: null },
    system: {
      healthState: SYSTEM_HEALTH_STATES.HEALTHY,
      isCrisisRound: false,
      pendingCrisisRound: false,
    },
    decisionState: {
      available: [],
      appliedTotals: {
        DONATE_POINTS: 0,
        HOLD_POINTS: 0,
      },
      validationError: null,
    },
    cardState: {
      lastDrawId: 0,
      cardsRemainingInTurn: 0,
      current: null,
    },
    components: {},
    absorbedBugs: [],
    gameConfig: defaultGameConfig,
  };
}
