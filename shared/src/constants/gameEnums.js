export const PLAYER_STATUS = Object.freeze({
  WAITING: "WAITING",
  READY: "READY",
  PLAYING: "PLAYING",
});

export const SYSTEM_HEALTH_STATES = Object.freeze({
  HEALTHY: 'HEALTHY',
  WARNING: 'WARNING',
  CRITICAL: 'CRITICAL',
});

export const GAME_PHASE = Object.freeze({
  LOBBY: 'LOBBY',
  IN_GAME: 'IN_GAME',
  END_GAME: 'END_GAME',
});

export const GAME_RESULT = Object.freeze({
  GAME_WIN: 'GAME_WIN',
  GAME_OVER: 'GAME_OVER',
});

export const COMPONENT_TYPE = Object.freeze({
  LOCAL: 'LOCAL',
  STRUCTURAL: 'STRUCTURAL',
  REQUESTS: 'REQUESTS',
});
