import { isPlayerActionValid, isAutoActionValid } from './actionValidators.js';

export function createRunGameLoop({ rooms }) {
  return function runGameLoop(
    currentRoomState,
    currentRoomId,
    playerAction = null,
  ) {
    let state = structuredClone(currentRoomState);

    if (isPlayerActionValid(state, playerAction)) {
      state = rooms.applyRoomAction(currentRoomId, playerAction);
    }

    let iterations = 0;
    const MAX_ITERATIONS = 10;
    while (iterations < MAX_ITERATIONS) {
      const nextAction = state?.flow?.step?.flowControl?.nextTransition ?? null;


      if (!isAutoActionValid(state, nextAction))
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
// TODO: Analize:
// Add schema validation for each action type (e.g., with Zod/Yup/Joi)
// Add idempotency control for actions (actionId or hash in backend)
// (Optional) Implement state versioning to avoid concurrency issues in multiplayer actions
// Add unit tests for validation functions