// eslint-disable-next-line no-unused-vars
// import react, { Children, useEffect, useState } from 'react';
import DecisionButton from './decisionButton/DecisionButton.jsx';
import styles from './DecisionsPanel.module.css';
import { decisions as decisionsDefinitions } from '../../../../shared/src/definitions/decisions.js';
import { getDecisionTxt } from '../../texts/decisionsTxt.js';

function DecisionsPanel({
  roomState,
  isPreGame,
  localPlayerId,
  handleDecisionUISelect,
  selectedDecisionUIId,
  isReadOnly,
}) {
  const costs = roomState?.gameConfig?.decisionCosts;
  if (!costs) return null;
  const decisionsAvailable = roomState?.decisionState?.available ?? [];
  const availableSet = new Set(decisionsAvailable);
  const decisionsUI = decisionsDefinitions.forUI;

  return (
    <div className={styles.decisionsContainer}>
      {Object.entries(decisionsUI).map(([decisionUIId, decisionUI]) => {
        const regularDecisionId = decisionUI.regularDecisionId;
        const testedDecisionId = decisionUI.testedDecisionId;
        const instructionKey = decisionUIId;

        const cost = costs[regularDecisionId];
        const costLabel = getDecisionTxt(decisionUIId, cost, 'costLabel', 'pt')?? null;
        const isRegularDecisionAvailable = availableSet.has(regularDecisionId);

        const costTested = costs[testedDecisionId] ?? null;
        const costTestedLabel =
          costTested != null
            ? getDecisionTxt(decisionUIId, costTested, 'costTestedLabel', 'pt')
            : null;
        const isTestedDecisionAvailable = availableSet.has(testedDecisionId);

        const isChosen = selectedDecisionUIId === decisionUIId ? true : false;

        const isAvailable = decisionUI.decisionIds.some((id) =>
          availableSet.has(id)
        );

        const readOnlyClick = () => {
          return null;
        };

        return (
          <DecisionButton
            key={decisionUIId}
            id={decisionUIId}
            decisionIds={decisionUI.decisionIds}
            label={getDecisionTxt(decisionUIId, null, 'label', 'pt') ?? ''}
            categoryColor={getDecisionTxt(decisionUIId, null, 'categoryColor')}
            localPlayerId={localPlayerId}
            isDisabled={!isAvailable && !isPreGame}
            costLabel={costLabel}
            isRegularDecisionAvailable={isRegularDecisionAvailable}
            costTestedLabel={costTestedLabel}
            isTestedDecisionAvailable={isTestedDecisionAvailable}
            isChosen={isChosen}
            isReadOnly={isReadOnly}
            instructionKey={instructionKey}
            isPreGame={isPreGame}
            handleDecisionUISelect={
              isReadOnly ? readOnlyClick : handleDecisionUISelect
            }
          />
        );
      })}
    </div>
  );
}
export default DecisionsPanel;

// TODO: Change categoryColor to be defined in the color css variables, and then use the variable name in the decisionsTxt, instead of the hex color directly. This way we can keep all colors in one place and make it easier to update them in the future.
