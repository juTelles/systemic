import { sendAction } from '../api/roomsApi';
import { ACTION_TYPES } from '../../../shared/src/constants/actionsTypes';

export function useRoomActions(roomId, localPlayerId) {
  async function setReady() {
    return sendAction(roomId, ACTION_TYPES.SET_READY, {
      senderId: localPlayerId,
    });
  }

  async function setDecisonChosen(decision) {
    return sendAction(roomId, ACTION_TYPES.APPLY_DECISION, {
      senderId: localPlayerId,
      chosen: decision.chosen,
      target: decision.target,
      selectedAmount: decision.selectedAmount,
    });
  }

  async function setEndDecision() {
    return sendAction(roomId, ACTION_TYPES.DRAW_CARD, {
    });
  }

  return {
    setReady,
    setDecisonChosen,
    setEndDecision
  };
}
