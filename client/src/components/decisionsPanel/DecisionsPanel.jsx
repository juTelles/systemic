// eslint-disable-next-line no-unused-vars
// import react, { Children, useEffect, useState } from 'react';
import DecisionButton from '../decisionButton/DecisionButton';
import styles from './DecisionsPanel.module.css';
import { decisions as decisionsDefinitions } from '../../../../shared/src/definitions/decisions.js';
import { decisionsTxt as txt } from '../../texts/decisionsTxt.js';

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
        const instructionKey = decisionUI.instructionKey;

        const cost = costs[regularDecisionId];
        const costLabel = txt(cost)?.[decisionUIId]?.costLabel?.pt ?? null;
        const isRegularDecisionAvailable = availableSet.has(regularDecisionId);

        const costTested = costs[testedDecisionId] ?? null;
        const costTestedLabel =
          costTested != null
            ? txt(costTested)?.[decisionUIId]?.costTestedLabel?.pt ?? null
            : null;
        const isTestedDecisionAvailable = availableSet.has(testedDecisionId);

        const isChosen = selectedDecisionUIId === decisionUIId ? true : false;
        console.log(
          'Decisão disponível:',
          decisionUIId,
          selectedDecisionUIId,
          isChosen
        );
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
            label={txt()?.[decisionUIId]?.label?.pt ?? ''}
            categoryColor={txt()?.[decisionUIId]?.categoryColor}
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
