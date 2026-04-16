// eslint-disable-next-line no-unused-vars
import { useEffect, useRef, useState, useLayoutEffect, useMemo } from 'react';
import { decisions as decisionsDefinitions } from '../../../../shared/src/definitions/decisions.js';
import ComponentNode from './ComponentNode.jsx';
import { components as componentsDefinitions } from '../../../../shared/src/definitions/components.js';
import styles from './Board.module.css';
import { isBoardNodeDisabled } from '../../helpers/boardTargetRules.js';
import { componentsTxt as txt } from '../../texts/componentsTxt.js';
import { resolveDecision } from '../../helpers/decisionResolver.js';

const EDGES = [
  ['L1', 'S1'],
  ['L2', 'S1'],
  ['L3', 'S2'],
  ['L4', 'S2'],
  ['L5', 'S3'],
  ['L6', 'S3'],
  ['S1', 'R1'],
  ['S2', 'R1'],
  ['S2', 'R2'],
  ['S3', 'R2'],
];

function Board({
  roomState,
  isPreGame,
  selectedDecisionUIId,
  handleDecisionSubmit,
}) {
  const boardRef = useRef(null);
  const nodeRefs = useRef({});
  const [lines, setLines] = useState([]);
  const [prevDecisionUIId, setPrevDecisionUIId] = useState(null);
  const [error, setError] = useState(null);

  const nodes = useMemo(
    () =>
      isPreGame
        ? componentsDefinitions.nodes
        : (roomState?.components?.nodes ?? {}),
    [isPreGame, roomState?.components?.nodes],
  );

  const decisionUI = decisionsDefinitions?.forUI[selectedDecisionUIId];
  const decisionsAvailable = roomState?.decisionState?.available ?? [];
  const chosenButtonDecisionIds = decisionUI?.decisionIds ?? [];
  const availableChosen = chosenButtonDecisionIds.filter((id) =>
    decisionsAvailable?.includes(id),
  );

  if (prevDecisionUIId !== selectedDecisionUIId) {
    setPrevDecisionUIId(selectedDecisionUIId);
    setError(null);
  }

  function registerNode(id) {
    return (el) => {
      if (el) nodeRefs.current[id] = el;
    };
  }

  const computeLines = () => {
    const boardEl = boardRef.current;
    if (!boardEl) return;

    const boardRect = boardEl.getBoundingClientRect();

    const next = [];
    for (const [a, b] of EDGES) {
      const elA = nodeRefs.current[a];
      const elB = nodeRefs.current[b];
      if (!elA || !elB) continue;

      const rA = elA.getBoundingClientRect();
      const rB = elB.getBoundingClientRect();

      const x1 = rA.left - boardRect.left + rA.width / 2;
      const y1 = rA.top - boardRect.top + rA.height / 2;
      const x2 = rB.left - boardRect.left + rB.width / 2;
      const y2 = rB.top - boardRect.top + rB.height / 2;

      next.push({ key: `${a}-${b}`, x1, y1, x2, y2 });
    }
    setLines(next);
  };

  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(computeLines);
    });
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => computeLines());
  }, [nodes, availableChosen, selectedDecisionUIId]);

  useEffect(() => {
    // Updates when the window resizes
    window.addEventListener('resize', computeLines);

    // Updates when the board changes size (more robust than just resize)
    const ro =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => computeLines())
        : null;

    if (ro && boardRef.current) ro.observe(boardRef.current);

    return () => {
      window.removeEventListener('resize', computeLines);
      ro?.disconnect();
    };
  }, []);

  const handleSubmit = (roomState, decisionUIId, target, amount = null) => {
    const decision = resolveDecision(roomState, decisionUIId, target, amount);
    if (!decision.ok) {
      setError(decision.errorMessage);
      return;
    }
    handleDecisionSubmit(decision.action);
    setError(null);
  };

  return (
    <div className={styles.boardContainer}>
      <div ref={boardRef} className={styles.board}>
        <svg className={styles.connectionsLayer}>
          {lines.map((ln) => (
            <line
              key={ln.key}
              x1={ln.x1}
              y1={ln.y1}
              x2={ln.x2}
              y2={ln.y2}
              stroke="white"
              strokeWidth="5"
              opacity="0.7"
            />
          ))}
        </svg>

        <div className={styles.nodesLayer}>
          {Object.entries(nodes).map(([nodeId, node]) => {
            const isDisabled = isBoardNodeDisabled(
              nodeId,
              availableChosen,
              roomState,
            );
            return (
              <div key={nodeId} className={styles[nodeId]}>
                <ComponentNode
                  id={nodeId}
                  anchorRef={registerNode(node.anchorNode)}
                  label={txt[nodeId].label.pt}
                  type={node?.type}
                  bugAmount={node?.bugAmount}
                  hasTests={node?.hasTests}
                  hasBug={node?.bugAmount}
                  isDisabled={isDisabled}
                  handleSubmit={() =>
                    handleSubmit(roomState, selectedDecisionUIId, node)
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}

export default Board;
