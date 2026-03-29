export function getPlayerObject(playerId, playersArray) {
  return playersArray.find((player) => player.id === playerId);
}

export  function getTotalPlayersPoints(player) {
  return player.handPoints + player.bankPoints;
}

export function isGameReadyToStart(currentState, desiredPhase, playerDesiredStatus) {
  const hasValidNumberOfPlayers =
  currentState.players.length >= currentState.gameConfig.minPlayers &&
  currentState.players.length <= currentState.gameConfig.maxPlayers;
  const isCorrectPhase = currentState.phase === desiredPhase;
  const allPlayersCorrectStatus = currentState.players.every(
    (player) => player.status === playerDesiredStatus
  );
  return hasValidNumberOfPlayers && isCorrectPhase && allPlayersCorrectStatus;
}
export function getActionForNextStep(gameState) {
}
