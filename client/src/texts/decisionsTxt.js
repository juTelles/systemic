export const decisionsTxt = (cost = 0) => ({
  LOCAL: {
    label: {
      pt: `Bug Local\n`,
      en: `Local Bug\n`,
    },
    costLabel: {
      pt: `${cost} Pontos`,
      en: `${cost} Points`,
    },
    costTestedLabel: {
      pt: `\nTestado: ${cost} Pontos`,
      en: `\nTested: ${cost} Points`,
    },
    categoryColor: '#FDE047',
  },
  STRUCTURAL: {
    label: {
      pt: `Bug Estrutural\n`,
      en: `Structural Bug\n`,
    },
    costLabel: {
      pt: `${cost} Pontos`,
      en: `${cost} Points`,
    },
    costTestedLabel: {
      pt: `\nTestado: ${cost} Pontos`,
      en: `\nTested: ${cost} Points`,
    },
    categoryColor: '#FF8A00',
  },
  REQUESTS: {
    label: {
      pt: `Bug de Requisições\n`,
      en: `Requests Bug\n`,
    },
    costLabel: {
      pt: `${cost} Pontos`,
      en: `${cost} Points`,
    },
    costTestedLabel: {
      pt: `\nTestado: ${cost} Pontos`,
      en: `\nTested: ${cost} Points`,
    },
    categoryColor: '#FF0055',
  },
  DONATE_POINTS: {
    label: {
      pt: `Doar Pontos \n `,
      en: `Donate Points \n Limit: ${cost} Points`,
    },
    costLabel: {
      pt: `Limite: ${cost} Pontos`,
      en: `${cost} Points`,
    },
    categoryColor: '#22d3ee',
  },
  HOLD_POINTS: {
    label: {
      pt: `Guardar Pontos\n`,
      en: `Hold Points \n Limit: ${cost} Points`,
    },
    costLabel: {
      pt: ` Limite: ${cost} Pontos`,
      en: `${cost} Points`,
    },
    categoryColor: '#22d3ee',
  },
  DEVELOP_TESTS: {
    label: {
      pt: `Desenvolver Testes\n`,
      en: `Develop Tests\n`,
    },
    costLabel: {
      pt: `${cost} Pontos`,
      en: `${cost} Points`,
    },
    categoryColor: '#00FF9F',
  },
});