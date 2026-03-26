// eslint-disable-next-line no-unused-vars
import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import ComponentNode from '../componentNode/ComponentNode';
import styles from './Board.module.css';

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

function Board({ roomState }) {
  const boardRef = useRef(null);
  const nodeRefs = useRef({});
  const [lines, setLines] = useState([]);

  const nodes = roomState?.components.nodes;

  const registerNode = (id) => (el) => {
    if (el) nodeRefs.current[id] = el;
  };

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
    // Atualiza quando a janela redimensiona
    window.addEventListener('resize', computeLines);

    // Atualiza quando o board muda de tamanho (mais robusto que só resize)
    const ro = new ResizeObserver(() => computeLines());
    if (boardRef.current) ro.observe(boardRef.current);

    return () => {
      window.removeEventListener('resize', computeLines);
      ro.disconnect();
    };
  }, []);

  return (
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
        <div className={styles.interface}>
          <ComponentNode
            id={'interface'}
            anchorRef={registerNode('L1')}
            label="Interface"
            type="local"
            bugAmount={nodes?.interface?.bugAmount}
            hasTests={nodes?.interface?.hasTests}
            hasBug={nodes?.interface?.bugAmount > 0}
          />
        </div>
        <div className={styles.frontend}>
          <ComponentNode
            id={'frontend'}
            anchorRef={registerNode('S1')}
            label="Frontend"
            type="structural"
            bugAmount={nodes?.frontend?.bugAmount}
            hasTests={nodes?.frontend?.hasTests}
            hasBug={nodes?.frontend?.bugAmount > 0}
          />
        </div>
        <div className={styles.interaction}>
          <ComponentNode
            id={'interaction'}
            anchorRef={registerNode('L2')}
            label="Interação"
            type="local"
            bugAmount={nodes?.interaction?.bugAmount}
            hasTests={false}
            hasBug={true}
          />
        </div>
        <div className={styles.applicationRequests}>
          <ComponentNode
            id={'applicationRequests'}
            anchorRef={registerNode('R1')}
            label="Requisiçoes de Aplicação"
            type="requests"
            bugAmount={nodes?.applicationRequests?.bugAmount}
            hasTests={nodes?.applicationRequests?.hasTests}
            hasBug={nodes?.applicationRequests?.bugAmount > 0}
          />
        </div>
        <div className={styles.logic}>
          <ComponentNode
            id={'logic'}
            anchorRef={registerNode('L3')}
            label="Lógica"
            type="local"
            bugAmount={nodes?.logic?.bugAmount}
            hasTests={nodes?.logic?.hasTests}
            hasBug={nodes?.logic?.bugAmount > 0}
          />
        </div>
        <div className={styles.backend}>
          <ComponentNode
            id={'backend'}
            anchorRef={registerNode('S2')}
            label="Backend"
            type="structural"
            bugAmount={nodes?.backend?.bugAmount}
            hasTests={nodes?.backend?.hasTests}
            hasBug={nodes?.backend?.bugAmount > 0}
          />
        </div>
        <div className={styles.integrations}>
          <ComponentNode
            id={'integrations'}
            anchorRef={registerNode('L4')}
            label="Integrações"
            type="local"
            bugAmount={nodes?.integrations?.bugAmount}
            hasTests={nodes?.integrations?.hasTests}
            hasBug={nodes?.integrations?.bugAmount > 0}
          />
        </div>
        <div className={styles.dataRequests}>
          <ComponentNode
            id={'dataRequests'}
            anchorRef={registerNode('R2')}
            label="Requisiçoes de Dados"
            type="requests"
            bugAmount={nodes?.dataRequests?.bugAmount}
            hasTests={nodes?.dataRequests?.hasTests}
            hasBug={nodes?.dataRequests?.bugAmount > 0}
          />
        </div>
        <div className={styles.data}>
          <ComponentNode
            id={'data'}
            anchorRef={registerNode('L5')}
            label="Dados"
            type="local"
            bugAmount={nodes?.data?.bugAmount}
            hasTests={nodes?.data?.hasTests}
            hasBug={nodes?.data?.bugAmount > 0}
          />
        </div>
        <div className={styles.database}>
          <ComponentNode
            id={'database'}
            anchorRef={registerNode('S3')}
            label="Banco de Dados"
            type="structural"
            bugAmount={nodes?.database?.bugAmount}
            hasTests={nodes?.database?.hasTests}
            hasBug={nodes?.database?.bugAmount > 0}
          />
        </div>
        <div className={styles.structure}>
          <ComponentNode
            id={'structure'}
            anchorRef={registerNode('L6')}
            label="Estrutura"
            type="local"
            bugAmount={nodes?.structure?.bugAmount}
            hasTests={nodes?.structure?.hasTests}
            hasBug={nodes?.structure?.bugAmount > 0}
          />
        </div>
      </div>
    </div>
  );
}

export default Board;
