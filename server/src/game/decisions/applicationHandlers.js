import { ERRORS } from '../../../../shared/src/constants/errors.js';
import { isComponentEligibleForTests } from '../../../../shared/src/game/helpers.js';
import {
  addPointsToPlayerBank,
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

  if (!component)
    throw new Error(ERRORS.COMPONENT_NOT_FOUND);

  const updatedComponent = resolveBug(component);

  const cost = next.gameConfig.decisionCosts[decisionDefinition.id];
  const updatedCurrentPlayer = subtractPointsToPlayer(currentPlayer, cost);

  next.components.nodes[component.id] = updatedComponent;
  next.players = next.players.map((player) =>
    player.id === currentPlayer.id ? updatedCurrentPlayer : player,
  );

  return next;
}

export function handleDonatePointsDecision(next, context) {
  const { currentPlayer, amount, targetPlayer } = context;

  if (!targetPlayer)
    throw new Error(ERRORS.PLAYER_NOT_FOUND);

  const updatedTargetPlayer = addPointsToPlayerBank(
    targetPlayer,
    amount,
    next.gameConfig.taskPoints.maxPlayerPoints,
  );
  const updatedCurrentPlayer = subtractPointsToPlayer(currentPlayer, amount);

  next.players = next.players.map((player) =>
    player.id === currentPlayer.id ? updatedCurrentPlayer : player,
  );
  next.players = next.players.map((player) =>
    player.id === targetPlayer.id ? updatedTargetPlayer : player,
  );
  next.decisionState.appliedTotals.DONATE_POINTS += amount;

  return next;
}

export function handleHoldPointsDecision(next, context) {
  const { currentPlayer, amount } = context;

  const updatedCurrentPlayer = addPointsToPlayerBankByHolding(
    currentPlayer,
    amount,
  );

  next.players = next.players.map((player) =>
    player.id === currentPlayer.id ? updatedCurrentPlayer : player,
  );
  next.decisionState.appliedTotals.HOLD_POINTS += amount;

  return next;
}

export function handleDevelopTestsDecision(next, context, decisionDefinition) {
  const { currentPlayer, component } = context;

  if (!component)
    throw new Error(ERRORS.COMPONENT_NOT_FOUND);

  if (!isComponentEligibleForTests(component, next.components))
    throw new Error(ERRORS.COMPONENT_NOT_ELIGIBLE_FOR_TESTS);

  const updatedComponent = applyTest(component);

  const cost = next.gameConfig.decisionCosts[decisionDefinition.id];
  const updatedCurrentPlayer = subtractPointsToPlayer(currentPlayer, cost);

  next.components.nodes[component.id] = updatedComponent;
  next.players = next.players.map((player) =>
    player.id === currentPlayer.id ? updatedCurrentPlayer : player,
  );

  return next;
}
