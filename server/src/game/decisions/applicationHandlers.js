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

export function handleResolveBugDecision(next, context) {
  const {
    currentPlayer,
    selectedComponent,
    decisionDefinition,
  } = context;

  if (!selectedComponent) return next;

  const updatedComponent = resolveBug(selectedComponent);

  const cost = next.gameConfig.decisionCosts[decisionDefinition.id];
  const updatedCurrentPlayer = subtractPointsToPlayer(currentPlayer, cost);

  next.components.nodes[selectedComponent.id] = updatedComponent;
  next.players = next.players.map((player) =>
    player.id === currentPlayer.id ? updatedCurrentPlayer : player
  );

  return next;
}

export function handleDonatePointsDecision(next, context) {
  const { currentPlayer, selectedAmount, selectedTarget } = context;

  const targetPlayer = getPlayerObject(selectedTarget, next.players);
  if (!targetPlayer) return next;

  const updatedTargetPlayer = addPointsToPlayerBankByDonation(
    targetPlayer,
    selectedAmount,
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
  const { currentPlayer, selectedAmount } = context;

  const updatedCurrentPlayer = addPointsToPlayerBankByHolding(
    currentPlayer,
    selectedAmount
  );

  next.players = next.players.map((player) =>
    player.id === currentPlayer.id ? updatedCurrentPlayer : player
  );

  return next;
}

export function handleDevelopTestsDecision(next, context) {
  const {
    currentPlayer,
    selectedComponent,
    decisionDefinition,
  } = context;

  if (!component) return next;

  checkForChildren = selectedComponent.type === 'LOCAL' ? true : false;

  if (!isComponentEligibleForTests(selectedComponent, next.components))
    return next;

  const updatedComponent = applyTest(selectedComponent);

  const cost = next.gameConfig.decisionCosts[decisionDefinition.id];
  const updatedCurrentPlayer = subtractPointsToPlayer(currentPlayer, cost);

  next.components.nodes[selectedComponent.id] = updatedComponent;
  next.players = next.players.map((player) =>
    player.id === currentPlayer.id ? updatedCurrentPlayer : player
  );

  return next;
}
