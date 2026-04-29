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
  const currentPlayer = roomState?.players?.find(
    (p) => p.id === roomState.flow.currentPlayerId,
  );
  const currentPlayerHandPoints = currentPlayer?.handPoints ?? 0;
  const currentPlayerBankPoints = currentPlayer?.bankPoints ?? 0;
  const currentPlayerTotalPoints =
    currentPlayerHandPoints + currentPlayerBankPoints;

  return (
    <div className={styles.decisionsContainer}>
      {Object.entries(decisionsUI).map(([decisionUIId, decisionUI]) => {
        const regularDecisionId = decisionUI.regularDecisionId;
        const testedDecisionId = decisionUI.testedDecisionId;
        const instructionKey = decisionUIId;

        const cost = costs[regularDecisionId];
        const costLabel =
          getDecisionTxt(decisionUIId, cost, 'costLabel', 'pt') ?? null;
        const isRegularDecisionAvailable = availableSet.has(regularDecisionId);

        const costTested = costs[testedDecisionId] ?? null;
        const costTestedLabel =
          costTested != null
            ? getDecisionTxt(decisionUIId, costTested, 'costTestedLabel', 'pt')
            : null;
        const isTestedDecisionAvailable = availableSet.has(testedDecisionId);

        const isChosen = selectedDecisionUIId === decisionUIId ? true : false;

        const isAvailable = decisionUI.decisionIds.some((id) =>
          availableSet.has(id),
        );
        
        const canAfford =
          cost != null ? currentPlayerTotalPoints >= cost : true;
        const canAffordTested =
          costTested != null ? currentPlayerTotalPoints >= costTested : true;

        const title =
          decisionUIId === 'DONATE_POINTS'
            ? `Doar para o banco de outro jogador\nLimite: até ${cost} pontos por turno\n${isAvailable ? '' : canAfford ? '(Passou do limite)' : '(Não tem Pontos para Doar)'}`
            : decisionUIId === 'HOLD_POINTS'
              ? `Guardar pontosde mão no seu banco\nLimite: até ${cost} pontos por turno\n${isAvailable ? '' : canAfford ? '(Passou do limite)' : '(Não tem pontos de mão para guardar no banco)'}`
              : decisionUIId === 'DEVELOP_TESTS'
                ? `Desenvolver testes em um componente\nCusto: ${cost} pontos ${isAvailable ? '' : canAfford ? '(INDISPONÍVEL)\n\nTestes só podem ser desenvolvidos em\nComponentes sem Bugs cujo todos os\ncomponentes filhos já possuem Testes' : '(Faltam Pontos)'}`
                : `Resolver ${getDecisionTxt(decisionUIId, null, 'label', 'pt')}Custo sem Testes: ${cost} ${isAvailable ? '' : canAfford ? `(Sem Componentes com Bugs)` : '(Faltam Pontos)'} ${costTested != null ? `\nCusto com Testes: ${costTested} ${isTestedDecisionAvailable ? '' : canAffordTested ? '(Sem Componentes Testados com Bugs)' : '(Faltam Pontos)'}` : ''}`;

        const readOnlyClick = () => {
          return null;
        };

        return (
          <DecisionButton
            key={decisionUIId}
            id={decisionUIId}
            title={title}
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

// TODO: Change categoryColor to be defined in the color css variables, and
// then use the variable name in the decisionsTxt, instead of the hex color
// directly. This way we can keep all colors in one place and make it easier
//  to update them in the future.
