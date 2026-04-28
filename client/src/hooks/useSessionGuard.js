import { useEffect, useRef } from 'react';

const DEFAULT_MAX_FAILURES_AFTER_CONFIRMED_SESSION = 3;
const DEFAULT_MAX_FAILURES_BEFORE_CONFIRMED_SESSION = 1;

export function useRoomSessionGuard({
  isLoading,
  errorCode,
  roomState,
  localPlayerId,
  onSessionInvalid,
  maxFailuresAfterConfirmedSession = DEFAULT_MAX_FAILURES_AFTER_CONFIRMED_SESSION,
  maxFailuresBeforeConfirmedSession = DEFAULT_MAX_FAILURES_BEFORE_CONFIRMED_SESSION,
}) {
  const roomNotFoundCountRef = useRef(0);
  const playerNotFoundCountRef = useRef(0);
  const hasConfirmedSessionRef = useRef(false);

  useEffect(() => {
    if (isLoading) return;

    if (!localPlayerId) return;

    if (errorCode === 'INTERNAL_ERROR') {
      console.warn('Polling returned INTERNAL_ERROR. Session preserved.', {
        localPlayerId,
      });

      return;
    }

    if (errorCode === 'ROOM_NOT_FOUND') {
      roomNotFoundCountRef.current += 1;

      const maxFailures = hasConfirmedSessionRef.current
        ? maxFailuresAfterConfirmedSession
        : maxFailuresBeforeConfirmedSession;

      console.warn('ROOM_NOT_FOUND received.', {
        attempts: roomNotFoundCountRef.current,
        maxFailures,
        hasConfirmedSession: hasConfirmedSessionRef.current,
        localPlayerId,
      });

      if (roomNotFoundCountRef.current >= maxFailures) {
        onSessionInvalid();
      }

      return;
    }

    if (errorCode) {
      console.warn('Polling returned unexpected error. Session preserved.', {
        errorCode,
        localPlayerId,
      });

      return;
    }

    if (!roomState?.players) return;

    roomNotFoundCountRef.current = 0;

    const playerExists = roomState.players.some(
      (player) => player.id === localPlayerId,
    );

    if (!playerExists) {
      playerNotFoundCountRef.current += 1;

      const maxFailures = hasConfirmedSessionRef.current
        ? maxFailuresAfterConfirmedSession
        : maxFailuresBeforeConfirmedSession;

      console.warn('Local player not found in room state.', {
        attempts: playerNotFoundCountRef.current,
        maxFailures,
        hasConfirmedSession: hasConfirmedSessionRef.current,
        localPlayerId,
        players: roomState.players.map((player) => ({
          id: player.id,
          nickname: player.nickname,
        })),
        roomId: roomState.roomId,
        rev: roomState.meta?.rev,
      });

      if (playerNotFoundCountRef.current >= maxFailures) {
        onSessionInvalid('session_guard_confirmed_invalid');
      }

      return;
    }

    hasConfirmedSessionRef.current = true;
    playerNotFoundCountRef.current = 0;
  }, [
    isLoading,
    errorCode,
    roomState,
    localPlayerId,
    onSessionInvalid,
    maxFailuresAfterConfirmedSession,
    maxFailuresBeforeConfirmedSession,
  ]);
}