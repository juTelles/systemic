import { instructionsTxt } from './instructionsTxt.js';

export function resolveInstructionTxt(
  state,
  decisionInstructionKey = null,
  typeTxt = 'title',
  lang = 'pt',
) {
  const key = decisionInstructionKey
    ? 'DECISION_INSTRUCTION_KEY'
    : state?.flow?.step?.name;

  const contextsByStep = getContext(state, decisionInstructionKey);
  const context = contextsByStep[key] ?? {};
  const template = instructionsTxt(context)?.[key]?.[typeTxt]?.[lang];
  if (typeof template === 'function') {
    return template(context);
  }
  console.log('Resolving instruction text with context:', template);

  return template ?? '';
}

const getContext = (state, decisionInstructionKey = null) => {
  return {
    DECISION_INSTRUCTION_KEY: getDecisionInstructionKeyCtx(
      state,
      decisionInstructionKey,
    ),
    WAITING_PLAYERS_READY: null,
    GAME_START: null,
    ROUND_START: getRoundStartCtx(state),
    CRISIS_ROUND_START: getCrisisRoundStartCtx(state),
    TURN_START: getTurnStartCtx(state),
    AWAIT_DECISION: getAwaitDecisionCtx(state),
    AWAIT_CARD_DRAW: getAwaitDrawCardCtx(state),
    SHOWING_CARD: getCardCtx(state),
    PROCESSING_SYSTEM_HEALTH: getProcessingSystemHealthCtx(state),
    END_ROUND: getEndRoundCtx(state),
    END_GAME: getEndGameCtx(state),
  };
};

const getRoundStartCtx = (state) => {
  const startRoundPoints =
    state?.gameConfig?.taskPoints?.playerPerRound * state?.players?.length || 0;
  return {
    startRoundPoints,
  };
};

const getCrisisRoundStartCtx = (state) => {
  const startRoundPoints = state?.gameConfig?.taskPoints?.playerPerRound *
        state?.players?.length || 0;
  const startRoundCrisesPoints = state?.gameConfig?.taskPoints?.playerPerCrisisRound *
        state?.players?.length || 0;
  return {
    startRoundPoints,
    startRoundCrisesPoints,
  };
};

const getTurnStartCtx = (state) => {
  return {
    maxPlayerPoints: state?.gameConfig?.taskPoints?.maxPlayerPoints || 0,
    playerNickname:
      state?.players?.find((p) => p.id === state?.flow?.currentPlayerId)
        ?.nickname || '',
  };
};

const getAwaitDecisionCtx = (state) => {
  return {
    playerNickname:
      state?.players?.find((p) => p.id === state?.flow?.currentPlayerId)
        ?.nickname || '',
    maxPlayerPoints: state?.gameConfig?.taskPoints?.maxPlayerPoints || 0,
  };
};

const getDecisionInstructionKeyCtx = (state, decisionInstructionKey) => {
  return {
    instructionKey: decisionInstructionKey,
    playerNickname:
      state?.players?.find((p) => p.id === state?.flow?.currentPlayerId)
        ?.nickname || '',
    gameConfig: state?.gameConfig || null,
  };
};

const getAwaitDrawCardCtx = (state) => {
  return {
    playerNickname:
      state?.players?.find((p) => p.id === state?.flow?.currentPlayerId)
        ?.nickname || '',
  };
};

const getCardCtx = (state) => {
  return {
    playerNickname:
      state?.players?.find((p) => p.id === state?.flow?.currentPlayerId)
        ?.nickname || '',
    currentCard: state?.cardState?.current || null,
    saturationLimit: state?.gameConfig?.bugSaturationLimit || null,
    maxPointsPerPlayer: state?.gameConfig?.taskPoints?.maxPlayerPoints || null,
  };
};
// const getProcessingCardCtx = (state) => {
//   return {
//     playerNickname:
//       state?.players?.find((p) => p.id === state?.flow?.currentPlayerId)
//         ?.nickname || '',
//     currentCard: state?.cardState?.current || null,
//     amount: state?.cardState?.current?.effect?.amount || null,
//     saturationLimit: state?.gameConfig?.bugSaturationLimit || null,
//     maxPointsPerPlayer: state?.gameConfig?.taskPoints?.maxPlayerPoints || null,
//     affectedComponents: state?.cardState?.current?.effect?.componentsAffected || null,
//   };
// };

const getProcessingSystemHealthCtx = (state) => {
  return {
    systemHealthChangeKey: state?.flow?.step?.stepInstructionKey,
    bugSaturationLimit: state?.gameConfig?.bugSaturationLimit || 0,
    playerPerCrisisRound:
      state?.gameConfig?.taskPoints?.playerPerCrisisRound || 0,
    playersCount: state?.players?.length || 0,
    isCrisisRound: state?.system?.isCrisisRound || false,
  };
};

const getEndRoundCtx = (state) => {
  return {
    systemHealthChangeKey: state?.flow?.step?.stepInstructionKey,
    bugSaturationLimit: state?.gameConfig?.bugSaturationLimit || 0,
    playerPerCrisisRound:
      state?.gameConfig?.taskPoints?.playerPerCrisisRound || 0,
    playersCount: state?.players?.length || 0,
  };
};

const getEndGameCtx = (state) => {
  return {
    endGame: state?.system?.endGame
  };
}
