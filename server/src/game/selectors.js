export {
  getPlayerObject,
  getTotalPlayersPoints,
  isGameReadyToStart,
  getNodeById,
  getNodesByIds,
  getNodeIdsByType,
  getSaturatedNodesIdsByType,
  componentIdHasAbsorbedBug,
};

function getPlayerObject(playerId, playersArray) {
  return playersArray.find((player) => player.id === playerId);
}

function getTotalPlayersPoints(player) {
  return player.handPoints + player.bankPoints;
}

function isGameReadyToStart(currentState, desiredPhase, playerDesiredStatus) {
  const hasValidNumberOfPlayers =
  currentState.players.length >= currentState.gameConfig.minPlayers &&
  currentState.players.length <= currentState.gameConfig.maxPlayers;
  const isCorrectPhase = currentState.phase === desiredPhase;
  const allPlayersCorrectStatus = currentState.players.every(
    (player) => player.status === playerDesiredStatus
  );
  return hasValidNumberOfPlayers && isCorrectPhase && allPlayersCorrectStatus;
}

function getNodeById(components, nodeId) {
  return components.nodes[nodeId];
}

function getNodesByIds(components, nodeIdArray) {
  return nodeIdArray.map((id) => components.nodes[id]);
}

function getNodeIdsByType(components, type) {
  const requestNodeIds = components.byType[type];
  return requestNodeIds;
}

function getSaturatedNodesIdsByType(components, type) {
  const requestNodeIds = getNodeIdsByType(components, type);
  const SaturatedRequestsIds = requestNodeIds.filter((nodeId) => {
    const node = components.nodes[nodeId];
    return node.saturated && node.bugAmount >= node.saturationLimit;
  });
  return SaturatedRequestsIds;
}

function componentIdHasAbsorbedBug(absorbedBugsArray, componentId) {
  return absorbedBugsArray.includes(componentId);
}
