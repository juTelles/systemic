// eslint-disable-next-line no-unused-vars
// import react, { Children, useEffect, useState } from 'react';
import DecisionButton from '../decisionButton/DecisionButton';
import styles from './DecisionsPanel.module.css';

function DecisionsPanel() {

  const decisionsOptions = [
    { optionDescription: 'Bug Local', cost: 10, type:'localBug', index: 1, categoryColor: '#FDE047' },
    { optionDescription: 'Bug Estrutural', cost: 20, type:'strucuturalBug', index: 2, categoryColor: '#FF8A00' },
    { optionDescription: 'Bug de Requisição', cost: 15, type:'requsitionsBug', index: 3, categoryColor: '#FF0055' },
    { optionDescription: 'Desenvolver Testes', cost: 5, type: 'tests', index: 4, categoryColor: '#00FF9F' },
    { optionDescription: 'Bug Local com Testes', cost: 10, type:'localBug', index: 7, categoryColor: '#FDE047' },
    { optionDescription: 'Bug Estrutural com Testes', cost: 20, type:'strucuturalBug', index: 8, categoryColor: '#FF8A00'},
    { optionDescription: 'Bug de Requisição com Testes', cost: 15, type:'requsitionsBug', index: 9, categoryColor: '#FF0055' },
    { optionDescription: 'Doar / Guardar', type: 'giveOrHoldPoints', cost: 2, index: 5, categoryColor: '#22d3ee'},
  ];

  return (
    <div className={styles.decisionsPanelWrapper}>
      <div className={styles.decisionsContainer}>
        {decisionsOptions.map((option) => (
          <DecisionButton
            key={option.index}
            optionDescription={option.optionDescription}
            cost={option.cost}
            type={option.type}
            categoryColor={option.categoryColor}
          />
        ))}
      </div>
    </div>
  );
}

export default DecisionsPanel;