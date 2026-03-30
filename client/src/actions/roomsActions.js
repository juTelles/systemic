import { sendAction } from '../api/roomsApi';
import { ACTION_TYPES } from '../../../shared/src/constants/actionsTypes';

export function useRoomActions(roomId, localPlayerId) {

  async function setReady() {
    return sendAction(roomId, ACTION_TYPES.SET_READY, { senderId: localPlayerId });
  }

  return {
    setReady,
  };
}
