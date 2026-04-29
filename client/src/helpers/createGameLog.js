export function downloadGameLog(roomState) {
  const summary = createGameSummary(roomState);
  const data = {
    roomId: roomState?.roomId,
    gameLog: roomState?.gameLog,
    summary: summary,
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `systemic-game-log-${roomState?.roomId}.json`;
  link.click();

  URL.revokeObjectURL(url);
}

export function createGameSummary(state) {
  const log = state?.gameLog ?? [];
  const actionsApplied = log.filter((event) => event.type === '[ACTION_RECEIVED]');
  const decisionsApplied = log.filter((event) => event.type === '[DECISION_APPLIED]');

  const decisionResolveBug = decisionsApplied.filter((decision) => decision.decisionType === 'RESOLVE_BUG');
  const decisionResolveLocalBug = decisionResolveBug.filter((decision) => decision.chosen === 'RESOLVE_LOCAL_BUG');
  const decisionResolveStructuralBug = decisionResolveBug.filter((decision) => decision.chosen === 'RESOLVE_STRUCTURAL_BUG');
  const decisionsResolveRequestBug = decisionResolveBug.filter((decision) => decision.chosen === 'RESOLVE_REQUEST_BUG');
  const decisionResolveTestedLocalBug = decisionResolveBug.filter((decision) => decision.chosen === 'RESOLVE_LOCAL_BUG_TESTED');
  const decisionResolveTestedStructuralBug = decisionResolveBug.filter((decision) => decision.chosen === 'RESOLVE_STRUCTURAL_BUG_TESTED');
  const decisionResolveTestedRequestBug = decisionResolveBug.filter((decision) => decision.chosen === 'RESOLVE_REQUEST_BUG_TESTED');

  const totalDecisionResolveNonTestedBugs = decisionResolveLocalBug.length + decisionResolveStructuralBug.length + decisionsResolveRequestBug.length;
  const totalDecisionResolveTestedBugs = decisionResolveTestedLocalBug.length + decisionResolveTestedStructuralBug.length + decisionResolveTestedRequestBug.length;

  const decisionPointsHeld = decisionsApplied.filter((decision) => decision.decisionType === 'HOLD_POINTS');
  const totalPointsHeld = decisionPointsHeld.reduce((sum, decision) => sum + (decision.amount ?? 0), 0);

  const decisionsPointsDonated = decisionsApplied.filter((decision) => decision.decisionType === 'DONATE_POINTS');
  const totalPointsDonated = decisionsPointsDonated.reduce((sum, decision) => sum + (decision.amount ?? 0), 0);

  const decisionsDevelopTests = decisionsApplied.filter((decision) => decision.decisionType === 'DEVELOP_TESTS');
  const totalPointsSpentInDevelopTests = decisionsDevelopTests.reduce((sum, decision) => sum + (decision.cost ?? 0), 0);

  const totalPointsSpentInResolveBugs = decisionResolveBug.reduce((sum, decision) => sum + (decision.cost ?? 0), 0);

  const totalPointsSpentLocalBug = decisionResolveLocalBug.reduce((sum, decision) => sum + (decision.cost ?? 0), 0);
  const totalPointsSpentStructuralBug = decisionResolveStructuralBug.reduce((sum, decision) => sum + (decision.cost ?? 0), 0);
  const totalPointsSpentRequestBug = decisionsResolveRequestBug.reduce((sum, decision) => sum + (decision.cost ?? 0), 0);
  const totalPointsSpentInNonTestedBugs = totalPointsSpentLocalBug + totalPointsSpentStructuralBug + totalPointsSpentRequestBug;
  const totalPointsSpentLocalBugTested = decisionResolveTestedLocalBug.reduce((sum, decision) => sum + (decision.cost ?? 0), 0);
  const totalPointsSpentStructuralBugTested = decisionResolveTestedStructuralBug.reduce((sum, decision) => sum + (decision.cost ?? 0), 0);
  const totalPointsSpentRequestBugTested = decisionResolveTestedRequestBug.reduce((sum, decision) => sum + (decision.cost ?? 0), 0);
  const totalPointsSpentInTestedBugs = totalPointsSpentLocalBugTested + totalPointsSpentStructuralBugTested + totalPointsSpentRequestBugTested;

  const totalPointsSpent = totalPointsSpentInResolveBugs + totalPointsSpentInDevelopTests;

  const totalPointsGainedRoundCrisis = log.filter((event) => event.type === '[POINTS_APPLIED]' && event.reason === 'CRISIS_ROUND_START').reduce((sum, event) => sum + (event.amount * state.players.length), 0);
  const totalPointsGainedRegularRounds = log.filter((event) => event.type === '[POINTS_APPLIED]' && event.reason === 'ROUND_START').reduce((sum, event) => sum + (event.amount * state.players.length), 0);
  const totalPointsGainedRound = totalPointsGainedRoundCrisis + totalPointsGainedRegularRounds;

  const totalPointsGainedPointsCards = log.filter((event) => event.type === '[POINTS_APPLIED]' && event.reason === 'POINTS_CARD_EFFECT').reduce((sum, event) => sum + (event.amount * state.players.length), 0);
  const totalPointsGainedInGame = totalPointsGainedRound + totalPointsGainedPointsCards;

  const cardsApplied = log.filter((event) => event.type === '[APPLIED_CARD]');
  const eventCardsApplied = cardsApplied.filter((event) => event?.cardType === 'EVENT');
  const pointsCardApllied = cardsApplied.filter((event) => event?.cardType === 'POINTS');

  const requestsBugCards = cardsApplied.filter((card) => card.cardType === 'REQUESTS');
  const localBugCards = cardsApplied.filter((card) => card.cardType === 'LOCAL');
  const structuralBugCards = cardsApplied.filter((card) => card.cardType === 'STRUCTURAL');
  const totalBugCardsApplied = cardsApplied.length + structuralBugCards.length + requestsBugCards.length;

  const bugsApplied = log.filter((event) => event.type === '[BUGS_APPLIED]');
  const totalBugsApplied = bugsApplied.reduce((sum, event) => sum + (event.appliedBugs?.length ?? 0), 0);

  const bugsAppliedBecauseOfStartGame = bugsApplied.filter((event) => event?.reason === 'GAME_START').flatMap((event) => event.appliedBugs) ?? [];
  const totalLocalBugsAppliedBecauseOfStartGame = bugsAppliedBecauseOfStartGame.filter((bug) => bug?.type === 'LOCAL').length;
  const totalRequestBugsAppliedBecauseOfStartGame = bugsAppliedBecauseOfStartGame.filter((bug) => bug?.type === 'REQUESTS').length;
  const totalStructuralBugsAppliedBecauseOfStartGame = bugsAppliedBecauseOfStartGame.filter((bug) => bug?.type === 'STRUCTURAL').length;

  const bugsAppliedBecauseOfBugCards = bugsApplied.filter((event) => event?.reason === 'BUG_CARD_EFFECT').flatMap((event) => event.appliedBugs) ?? [];
  const totalRequestBugsAppliedBecauseOfBugCards = bugsAppliedBecauseOfBugCards.filter((bug) => bug?.type === 'REQUESTS').length;
  const totalLocalBugsAppliedBecauseOfBugCards = bugsAppliedBecauseOfBugCards.filter((bug) => bug?.type === 'LOCAL').length;
  const totalStructuralBugsAppliedBecauseOfBugCards = bugsAppliedBecauseOfBugCards.filter((bug) => bug?.type === 'STRUCTURAL').length;

  const bugsAppliedBecauseOfEventCards = bugsApplied.filter((event) => event?.reason === 'EVENT_CARD_EFFECT').flatMap((event) => event.appliedBugs) ?? [];
  const totalLocalBugsAppliedBecauseOfEventCards = bugsAppliedBecauseOfEventCards.filter((bug) => bug?.type === 'LOCAL').length;
  const totalRequestBugsAppliedBecauseOfEventCards = bugsAppliedBecauseOfEventCards.filter((bug) => bug?.type === 'REQUESTS').length;
  const totalStructuralBugsAppliedBecauseOfEventCards = bugsAppliedBecauseOfEventCards.filter((bug) => bug?.type === 'STRUCTURAL').length;

  const totalBugsAppliedBecauseOfRoundPropagation = bugsApplied.filter((event) => event?.reason === 'REQUESTS_PROPAGATION').reduce((acc, event) => acc + event.appliedBugs.length, 0);
  const totalLocalBugsAppliedBecauseOfRoundPropagation = bugsApplied.filter((event) => event?.reason === 'REQUESTS_PROPAGATION').reduce((acc, event) => acc + event.appliedBugs.filter((bug) => bug.type === 'LOCAL').length, 0);
  const totalRequestBugsAppliedBecauseOfRoundPropagation = bugsApplied.filter((event) => event?.reason === 'REQUESTS_PROPAGATION').reduce((acc, event) => acc + event.appliedBugs.filter((bug) => bug.type === 'REQUESTS').length, 0);
  const totalStructuralBugsAppliedBecauseOfRoundPropagation = bugsApplied.filter((event) => event?.reason === 'REQUESTS_PROPAGATION').reduce((acc, event) => acc + event.appliedBugs.filter((bug) => bug.type === 'STRUCTURAL').length, 0);

  const totalAbsorbedBugs = log.filter((event) => event.type === 'ABSORBED_BUGS' && event.absorbed).length;

  const totalHealthStateChanges = log.filter((event) => event.type === '[SYSTEM_HEALTH_CHANGE]').length;
  const totalHealthStateChangesToCritical = log.filter((event) => event.type === '[SYSTEM_HEALTH_CHANGE]' && event.newHealthState === 'CRITICAL').length;
  const totalHealthStateChangesToWarning = log.filter((event) => event.type === '[SYSTEM_HEALTH_CHANGE]' && event.newHealthState === 'WARNING').length;

  const totalBugsPropagated = log.filter((event) => event.type === '[BUGS_APPLIED]').reduce((sum, event) => sum + (event.propagated?.length ?? 0), 0);
  return {
    roomId: state?.roomId,
    result: state?.gameResult ?? null,
    startedAt: state?.startedAt ?? null,
    finishedAt: state?.event?.type === '[GAME_FINISHED]' ? new Date().toISOString() : null,
    endedAt: new Date().toISOString(),
    gameResult: state?.gameResult,
    gameconfig: state?.gameconfig ?? null,
    deck: state?.deck ?? null,
    roundsPlayed: state?.flow?.round,
    turnsPlayed: state?.flow?.allTurnsCounter,
    crisisRoundsPlayed: state?.flow?.crisisRoundCounter,

    totalActionsApplied: actionsApplied.length,

    totalDecisionsApplied: decisionsApplied.length,
    totaldecisionResolveLocalBug: decisionResolveLocalBug.length,
    totaldecisionResolveStructuralBug: decisionResolveStructuralBug.length,
    totalDecisionsResolveRequestBug: decisionsResolveRequestBug.length,
    totalDecisionResolveTestedLocalBug: decisionResolveTestedLocalBug.length,
    totalDecisionResolveTestedStructuralBug: decisionResolveTestedStructuralBug.length,
    totalDecisionResolveTestedRequestBug: decisionResolveTestedRequestBug.length,
    totalDecisionsPointsHeld: decisionPointsHeld.length,
    totalDecisionsPointsDonated: decisionsPointsDonated.length,
    totalDevelopTestsDecisions: decisionsDevelopTests.length,

    totalDecisionResolveNonTestedBugs: totalDecisionResolveNonTestedBugs,
    totalDecisionResolveTestedBugs: totalDecisionResolveTestedBugs,

    totalPointsDonated: totalPointsDonated,
    totalPointsHeld: totalPointsHeld,
    totalPointsSpent: totalPointsSpent,

    totalPointsSpentInResolveBugs: totalPointsSpentInResolveBugs,
    totalPointsSpentLocalBug: totalPointsSpentLocalBug,
    totalPointsSpentStructuralBug: totalPointsSpentStructuralBug,
    totalPointsSpentRequestBug: totalPointsSpentRequestBug,
    totalPointsSpentLocalBugTested: totalPointsSpentLocalBugTested,
    totalPointsSpentStructuralBugTested: totalPointsSpentStructuralBugTested,
    totalPointsSpentRequestBugTested: totalPointsSpentRequestBugTested,
    totalPointsSpentInDevelopTests: totalPointsSpentInDevelopTests,

    totalPointsSpentInNonTestedBugs: totalPointsSpentInNonTestedBugs,
    totalPointsSpentInTestedBugs: totalPointsSpentInTestedBugs,

    totalPointsGainedInGame: totalPointsGainedInGame,

    totalPointsGainedFromAllRounds: totalPointsGainedRound,
    totalPointsGainedRegularRounds: totalPointsGainedRegularRounds,
    totalPointsGainedCrisisRounds: totalPointsGainedRoundCrisis,
    totalPointsGainedFromPointsCards: totalPointsGainedPointsCards,

    totalCardsApplied: cardsApplied.length,

    totalEventCardsApplied: eventCardsApplied.length,
    totalPointsCardsApplied: pointsCardApllied.length,
    totalBugCardsApplied: totalBugCardsApplied,

    totalRequestBugCards: requestsBugCards.length,
    totalLocalBugCards: localBugCards.length,
    totalStructuralBugCards: structuralBugCards.length,

    totalBugsApplied: totalBugsApplied,

    totalBugsAppliedBecauseOfStartGame: bugsAppliedBecauseOfStartGame.length,
    totalLocalBugsAppliedBecauseOfStartGame: totalLocalBugsAppliedBecauseOfStartGame,
    totalRequestBugsAppliedBecauseOfStartGame: totalRequestBugsAppliedBecauseOfStartGame,
    totalStructuralBugsAppliedBecauseOfStartGame: totalStructuralBugsAppliedBecauseOfStartGame,

    totalBugsAppliedBecauseOfRoundPropagation: totalBugsAppliedBecauseOfRoundPropagation,
    totalRequestBugsAppliedBecauseOfRoundPropagation: totalRequestBugsAppliedBecauseOfRoundPropagation,
    totalLocalBugsAppliedBecauseOfRoundPropagation: totalLocalBugsAppliedBecauseOfRoundPropagation,
    totalStructuralBugsAppliedBecauseOfRoundPropagation: totalStructuralBugsAppliedBecauseOfRoundPropagation,

    totalBugsAppliedBecauseOfBugCards: bugsAppliedBecauseOfBugCards.length,
    totalLocalBugsAppliedBecauseOfBugCards: totalLocalBugsAppliedBecauseOfBugCards,
    totalRequestBugsAppliedBecauseOfBugCards: totalRequestBugsAppliedBecauseOfBugCards,
    totalStructuralBugsAppliedBecauseOfBugCards: totalStructuralBugsAppliedBecauseOfBugCards,

    totalBugsAppliedBecauseOfEventCards: bugsAppliedBecauseOfEventCards.length,
    totalRequestBugsAppliedBecauseOfEventCards: totalRequestBugsAppliedBecauseOfEventCards,
    totalLocalBugsAppliedBecauseOfEventCards: totalLocalBugsAppliedBecauseOfEventCards,
    totalStructuralBugsAppliedBecauseOfEventCards: totalStructuralBugsAppliedBecauseOfEventCards,

    totalRequestBugsApplied: totalRequestBugsAppliedBecauseOfBugCards + totalRequestBugsAppliedBecauseOfEventCards + totalRequestBugsAppliedBecauseOfRoundPropagation + totalRequestBugsAppliedBecauseOfStartGame,
    totalLocalBugsApplied: totalLocalBugsAppliedBecauseOfBugCards + totalLocalBugsAppliedBecauseOfEventCards + totalLocalBugsAppliedBecauseOfRoundPropagation + totalLocalBugsAppliedBecauseOfStartGame,
    totalStructuralBugsApplied: totalStructuralBugsAppliedBecauseOfBugCards + totalStructuralBugsAppliedBecauseOfEventCards + totalStructuralBugsAppliedBecauseOfRoundPropagation + totalStructuralBugsAppliedBecauseOfStartGame,

    totalAbsorbedBugs: totalAbsorbedBugs,
    totalBugsPropagated: totalBugsPropagated,

    totalHealthStateChanges: totalHealthStateChanges,
    totalHealthStateChangesToCritical: totalHealthStateChangesToCritical,
    totalHealthStateChangesToWarning: totalHealthStateChangesToWarning,
  };
}