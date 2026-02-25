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

function Board() {
  const boardRef = useRef(null);
  const nodeRefs = useRef({});
  const [lines, setLines] = useState([]);

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
    console.log(
      'board?',
      !!boardRef.current,
      'refs:',
      Object.keys(nodeRefs.current)
    );
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
            strokeWidth="4"
            opacity="0.7"
          />
        ))}
      </svg>

      <div className={styles.nodesLayer}>
        <div className={styles.frontend}>
          <ComponentNode
            anchorRef={registerNode('L1')}
            label="Interface"
            type="local"
            bugQtn="2"
            hasTests={true}
            hasBug={true}
          />
          <ComponentNode
            anchorRef={registerNode('L2')}
            label="Interação"
            type="local"
            bugQtn={3}
            hasTests={false}
            hasBug={true}
          />
          <div className={styles.structural}>
            <ComponentNode
              anchorRef={registerNode('S1')}
              label="Frontend"
              type="structural"
              bugQtn={1}
              hasTests={false}
              hasBug={true}
            />
          </div>
        </div>
        <div className={styles.appRequisition}>
          <ComponentNode
            anchorRef={registerNode('R1')}
            label="Requisiçoes de Aplicação"
            type="requisitions"
            bugQtn={1}
            hasTests={false}
            hasBug={true}
          />
        </div>
        <div className={styles.backend}>
          <ComponentNode
            anchorRef={registerNode('L3')}
            label="Lógica"
            type="local"
            bugQtn={0}
            hasTests={true}
            hasBug={false}
          />
          <ComponentNode
            anchorRef={registerNode('L4')}
            label="Integrações"
            type="local"
            bugQtn={0}
            hasTests={true}
            hasBug={false}
          />
          <div className={styles.structural}>
            <ComponentNode
              anchorRef={registerNode('S2')}
              label="Backend"
              type="structural"
              bugQtn={2}
              hasTests={true}
              hasBug={true}
            />
          </div>
        </div>
        <div className={styles.dataRequisition}>
          <ComponentNode
            anchorRef={registerNode('R2')}
            label="Requisiçoes de Dados"
            type="requisitions"
            bugQtn={0}
            hasTests={true}
            hasBug={false}
          />
        </div>
        <div className={styles.database}>
          <ComponentNode
            anchorRef={registerNode('L5')}
            label="Dados"
            type="local"
            bugQtn={2}
            hasTests={false}
            hasBug={true}
          />
          <ComponentNode
            anchorRef={registerNode('L6')}
            label="Estrutura"
            type="local"
          />
          <div className={styles.structural}>
            <ComponentNode
              anchorRef={registerNode('S3')}
              label="Banco de Dados"
              type="structural"
              bugQtn={0}
              hasTests={false}
              hasBug={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Board;
