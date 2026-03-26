import {
  addPointsToPlayerBankByDonation,
  addPointsToPlayerBankByHolding,
  resolveBug,
  applyTest,
  subtractPointsToPlayer,
} from '../gameHelpers.js';
import { getPlayerObject } from '../selectors.js';


export const decisionHandlers = {
  RESOLVE_BUG: handleResolveBugDecision,
  DONATE_POINTS: handleDonatePointsDecision,
  HOLD_POINTS: handleHoldPointsDecision,
  DEVELOP_TESTS: handleDevelopTestsDecision,
};

export function handleResolveBugDecision({
  next,
  currentPlayer,
  component,
  componentId,
  decisionDefinition,
}) {
  if (!component) return next;

  const updatedComponent = resolveBug(component);

  const cost = next.gameConfig.decisionCosts[decisionDefinition.costType];
  const updatedCurrentPlayer = subtractPointsToPlayer(currentPlayer, cost);

  next.components.nodes[componentId] = updatedComponent;
  next.players = next.players.map((player) =>
    player.id === currentPlayer.id ? updatedCurrentPlayer : player
  );

  return next;
}

export function handleDonatePointsDecision({
  next,
  currentPlayer,
  amount,
  target,
}) {
  const targetPlayer = getPlayerObject(target, next.players);
  if (!targetPlayer) return next;

  const updatedTargetPlayer = addPointsToPlayerBankByDonation(
    targetPlayer,
    amount,
    next.gameConfig.maxPlayerPoints
  );
  const updatedCurrentPlayer = subtractPointsToPlayer(currentPlayer, amount);

  next.players = next.players.map((player) =>
    player.id === currentPlayer.id ? updatedCurrentPlayer : player
  );
  next.players = next.players.map((player) =>
    player.id === targetPlayer.id ? updatedTargetPlayer : player
  );

  return next;
}

export function handleHoldPointsDecision({ next, currentPlayer, amount }) {
  const updatedCurrentPlayer = addPointsToPlayerBankByHolding(
    currentPlayer,
    amount
  );

  next.players = next.players.map((player) =>
    player.id === currentPlayer.id ? updatedCurrentPlayer : player
  );

  return next;
}

export function handleDevelopTestsDecision({
  next,
  currentPlayer,
  component,
  componentId,
  decisionDefinition,
}) {
  if (!component) return next;

  const updatedComponent = applyTest(component);

  const cost = next.gameConfig.decisionCosts[decisionDefinition.costType];
  const updatedCurrentPlayer = subtractPointsToPlayer(currentPlayer, cost);

  next.components.nodes[componentId] = updatedComponent;
  next.players = next.players.map((player) =>
    player.id === currentPlayer.id ? updatedCurrentPlayer : player
  );

  return next;
}
