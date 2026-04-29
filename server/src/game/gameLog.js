export function addGameLog(state, event) {
  if (!state.gameLog) {
    state.gameLog = [];
  }
  state.gameLog.push({
    id: crypto.randomUUID(),
    at: new Date().toISOString(),
    rev: state.meta?.rev ?? null,
    step: state.flow?.step?.name ?? null,
    roomId: state.meta?.roomId,
    ...event,
  });

  // evita o state crescer infinito durante testes longos
  if (state.gameLog.length > 300) {
    state.gameLog = state.gameLog.slice(-300);
  }
  return state.gameLog;
}