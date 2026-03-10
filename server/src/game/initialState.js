export function createInitialState({ roomId }) {
  const now = Date.now();

  return {
    meta: { roomId, rev: 0, updatedAt: now, createdAt: now },
    phase: "LOBBY",
    players: [],
    flow: { round: 1, turn: 1, currentPlayerId: null },
    economy: { taskPoints: 0 },

    // por enquanto placeholder; depois você coloca seu grafo real aqui
    system: { globalStatus: "HEALTHY" },

    log: { lastEvent: null }
  };
}
