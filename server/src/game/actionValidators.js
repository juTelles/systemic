import { createError } from '../utils/createErrors.js';
import { ERRORS } from '../../../shared/src/constants/errors.js';
import {
  ACTION_TRIGGER,
  ACTION_TYPES,
} from '../../../shared/src/constants/actionsTypes.js';
import {
  PLAYER_ACTIONS_REQUIRING_CURRENT_PLAYER,
  PLAYER_ACTIONS_ALLOWED_OUTSIDE_TURN,
} from '../../../shared/src/validations/actionAccessRules.js';

export function isPlayerActionValid(state, action) {
  if (action?.type === ACTION_TYPES.LEAVE_ROOM) {
    return leaveRoomActionValidation(state, action);
  }
  return (
    !isBlockedState(state) &&
    validatePlayerAction(action, state?.flow?.currentPlayerId) &&
    validatePlayerActionStep(state?.flow?.step, action?.type)
  );
}

export function isAutoActionValid(state, nextAction) {
  if (!nextAction?.actionType) return false;
  return (
    !isBlockedState(state) &&
    validateAutoActionStep(state?.flow?.step, nextAction)
  );
}

function isBlockedState(state) {
  const now = Date.now();
  return !!state.flow?.blockedUntil && now < state.flow.blockedUntil;
}

function validateAutoActionStep(step, nextAction) {
  const stepAcceptanceRule =
    (nextAction?.trigger ?? null) === ACTION_TRIGGER.AUTO;
  const isActionAllowedInStep =
    step?.flowControl?.current?.allowedActions?.includes(
      nextAction.actionType,
    ) ?? null;

  return stepAcceptanceRule && isActionAllowedInStep;
}

function validatePlayerActionStep(step, actionType) {
  const stepAcceptanceRule =
    step?.flowControl?.current?.accepts === ACTION_TRIGGER.PLAYER_INPUT ?? null;
  const isActionAllowedInStep =
    step?.flowControl?.current?.allowedActions?.includes(actionType) ?? null;

  return stepAcceptanceRule && isActionAllowedInStep;
}

function validatePlayerAction(playerAction, currentPlayerId) {
  if (!!playerAction === false) return false;

  const isCurrentPlayerAction =
    currentPlayerId === playerAction?.payload?.senderId;
  const isPlayerActionAllowedOutsideTurn =
    PLAYER_ACTIONS_ALLOWED_OUTSIDE_TURN.includes(playerAction.type);
  const isPlayerActionRequiringCurrentPlayer =
    PLAYER_ACTIONS_REQUIRING_CURRENT_PLAYER.includes(playerAction.type);

  return (
    (isCurrentPlayerAction && isPlayerActionRequiringCurrentPlayer) ||
    isPlayerActionAllowedOutsideTurn
  );
}

function leaveRoomActionValidation(state, action) {
  const localPlayerId = action.payload?.senderId;
  const player = state.players.find((p) => p.id === localPlayerId);
  const currentPlayerId = state.flow?.currentPlayerId;
  if (!player) {
    throw createError(ERRORS.PLAYER_NOT_FOUND, 404);
  }
  if (localPlayerId === currentPlayerId && state.players.length > 1) {
    throw createError(ERRORS.CANNOT_LEAVE_DURING_OWN_TURN, 400);
  }
  return player;
}
