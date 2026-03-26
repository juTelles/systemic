export function createRunGameLoop({ rooms }) {
  return function runGameLoop(
    currentRoomState,
    currentRoomId,
    playerAction = null,
    senderId = 'SYSTEM'
  ) {
    let iterations = 0;
    const MAX_ITERATIONS = 10;
    let state = structuredClone(currentRoomState);
    const now = Date.now();

    const currenteStepProgType = state.flow.step.progression?.trigger;

    if (
      playerAction &&
      (!state.flow.blockedUntil || now >= state.flow.blockedUntil) &&
      currenteStepProgType === 'PLAYER_INPUT'
    ) {
      state = rooms.applyRoomAction(currentRoomId, playerAction, senderId);
    }

    while (iterations < MAX_ITERATIONS) {
      if (state.flow.blockedUntil && now < state.flow.blockedUntil) break;

      const autoAction = getActionForNextStep(state.flow.step);

      if (!autoAction?.type) break;

      state = rooms.applyRoomAction(currentRoomId, autoAction, senderId);
      iterations++;
    }
    return state;
  };
}
function getActionForNextStep(step) {
  if (!step || !step.progression) return null;
  if (step.progression.triggerNext === 'PLAYER_INPUT') {
    return null;
  } else {
    return { type: step.next };
  }
}
