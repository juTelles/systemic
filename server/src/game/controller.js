export function createRunGameLoop({ rooms }) {
  return function runGameLoop(
    currentRoomState,
    currentRoomId,
    playerAction = null
  ) {
    let state = structuredClone(currentRoomState);

    let currentStepAcceptionRule =
      state?.flow?.step?.flowControl?.current?.accepts ?? null;

    if (
      playerAction &&
      !isBlockedState(state) &&
      currentStepAcceptionRule === 'PLAYER_INPUT'
    ) {
      state = rooms.applyRoomAction(currentRoomId, playerAction);
    }

    let iterations = 0;
    const MAX_ITERATIONS = 10;
    while (iterations < MAX_ITERATIONS) {
      const nextAction = state?.flow?.step?.flowControl?.nextTransition ?? null;

      if (
        isBlockedState(state) === true ||
        !nextAction?.actionType ||
        nextAction.trigger !== 'AUTO'
      )
        break;

      state = rooms.applyRoomAction(currentRoomId, {
        type: nextAction.actionType,
        payload: { senderId: 'SYSTEM' },
      });
      iterations++;
    }
    return state;
  };
}

function isBlockedState(state) {
  const now = Date.now();
  return !!state.flow?.blockedUntil && now < state.flow.blockedUntil;
}
