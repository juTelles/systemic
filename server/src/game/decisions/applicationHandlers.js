import { isComponentEligibleForTests } from '../../../../shared/src/game/helpers.js';
import { getPlayerObject } from '../selectors.js';
import {
  addPointsToPlayerBankByDonation,
  addPointsToPlayerBankByHolding,
  resolveBug,
  applyTest,
  subtractPointsToPlayer,
} from '../gameHelpers.js';

export const decisionHandlers = {
  RESOLVE_BUG: handleResolveBugDecision,
  DONATE_POINTS: handleDonatePointsDecision,
  HOLD_POINTS: handleHoldPointsDecision,
  DEVELOP_TESTS: handleDevelopTestsDecision,
};

export function handleResolveBugDecision(next, context, decisionDefinition) {
  const { currentPlayer, component } = context;

  if (!component) return next;

  const updatedComponent = resolveBug(component);

  const cost = next.gameConfig.decisionCosts[decisionDefinition.id];
  const updatedCurrentPlayer = subtractPointsToPlayer(currentPlayer, cost);

  next.components.nodes[component.id] = updatedComponent;
  next.players = next.players.map((player) =>
    player.id === currentPlayer.id ? updatedCurrentPlayer : player
  );

  return next;
}

export function handleDonatePointsDecision(next, context) {
  const { currentPlayer, amount, target } = context;

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

export function handleHoldPointsDecision(next, context) {
  const { currentPlayer, amount } = context;

  const updatedCurrentPlayer = addPointsToPlayerBankByHolding(
    currentPlayer,
    amount
  );

  next.players = next.players.map((player) =>
    player.id === currentPlayer.id ? updatedCurrentPlayer : player
  );

  return next;
}

export function handleDevelopTestsDecision(next, context, decisionDefinition) {
  const { currentPlayer, component } = context;

  if (!component) return next;

  checkForChildren = component.type === 'LOCAL' ? true : false;

  if (!isComponentEligibleForTests(component, next.components)) return next;

  const updatedComponent = applyTest(component);

  const cost = next.gameConfig.decisionCosts[decisionDefinition.id];
  const updatedCurrentPlayer = subtractPointsToPlayer(currentPlayer, cost);

  next.components.nodes[component.id] = updatedComponent;
  next.players = next.players.map((player) =>
    player.id === currentPlayer.id ? updatedCurrentPlayer : player
  );

  return next;
}
