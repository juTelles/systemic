import { sendAction } from '../api/roomsApi';
import { ACTION_TYPES } from '../../../shared/src/constants/actionsTypes';

export function useRoomActions(roomId, localPlayerId) {

  async function setReady() {
    return sendAction(roomId, ACTION_TYPES.SET_READY, {
      senderId: localPlayerId,
    });
  }

  async function unsetReady() {
    return sendAction(roomId, ACTION_TYPES.UNSET_READY, {
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

  async function applyCard() {
    return sendAction(roomId, ACTION_TYPES.APPLY_CARD_EFFECT, {
      senderId: localPlayerId,
    });
  }

  async function returnToLobby() {
    return sendAction(roomId, ACTION_TYPES.RETURN_TO_LOBBY, {
      senderId: localPlayerId,
    });
  }

  return {
    setReady,
    unsetReady,
    submitDecision,
    endDecision,
    returnToLobby,
    drawCard,
    applyCard,
  };
}
