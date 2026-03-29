import { sendAction } from '../api/roomsApi';
import { ACTION_TYPES } from '../../../shared/src/constants/actionsTypes';

export function useRoomActions(roomId, localPlayerId) {

  async function setReady() {
    return sendAction(roomId, ACTION_TYPES.SET_READY, { senderId: localPlayerId });
  }

  async function setPhase(phase) {
    return sendAction(roomId, localPlayerId, ACTION_TYPES.SET_PHASE, { phase });
  }

  async function endTurn() {
    return sendAction(roomId, localPlayerId, ACTION_TYPES.FINISH_TURN);
  }

  return {
    setReady,
    setPhase,
    endTurn,
  };
}
