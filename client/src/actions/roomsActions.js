import { sendAction } from '../api/roomsApi';
import { ACTION_TYPES } from '../../../shared/src/constants/actionsTypes';

export function useRoomActions(roomId, localPlayerId) {

  async function setReady() {
    return sendAction(roomId, ACTION_TYPES.SET_READY, {
      senderId: localPlayerId,
    });
  }

  async function submitDecision(decision) {
    return sendAction(roomId, ACTION_TYPES.SUBMIT_DECISION, {
      senderId: localPlayerId,
      chosen: decision.chosen,
      target: decision.target,
      selectedAmount: decision.selectedAmount,
    });
  }

  async function endDecision() {
    return sendAction(roomId, ACTION_TYPES.PROCEED_TO_CARD_DRAW, {
      senderId: localPlayerId,
    });
  }

  async function drawCard() {
    return sendAction(roomId, ACTION_TYPES.DRAW_CARD, {
      senderId: localPlayerId,
    });
  }

  return {
    setReady,
    submitDecision,
    endDecision,
    drawCard
  };
}
