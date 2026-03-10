export function applyAction(state, action, ctx = {}) {
  const now = Date.now();
  const next = structuredClone(state); // Node 18+ (Render geralmente usa)

  switch (action?.type) {
    case "END_TURN": {
      next.flow.turn += 1;
      next.meta.rev += 1;
      next.meta.updatedAt = now;
      next.log.lastEvent = { type: "END_TURN", by: ctx.playerId ?? null, at: now };
      return next;
    }

    case "SET_PHASE": {
      next.phase = action.phase;
      next.meta.rev += 1;
      next.meta.updatedAt = now;
      next.log.lastEvent = { type: "SET_PHASE", by: ctx.playerId ?? null, at: now, data: { phase: action.phase } };
      return next;
    }

    default:
      throw new Error("Unknown action type");
  }
}