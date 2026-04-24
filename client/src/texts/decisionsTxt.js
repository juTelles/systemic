export function getDecisionTxt(decisionKey, cost = 0, txtType, lang = 'pt') {
  const decisionTxt = buildDecisionTxt({ decisionKey, cost, lang });

  return txtType ? (decisionTxt?.[txtType] ?? null) : decisionTxt;
}

const buildDecisionTxt = ({ decisionKey, cost, lang = 'pt' }) => ({
  label: decisionsTxt[decisionKey]?.label?.[lang] ?? '',
  costLabel: decisionsTxt[decisionKey]?.costLabel?.[lang]?.(cost) ?? null,
  costTestedLabel:
    decisionsTxt[decisionKey]?.costTestedLabel?.[lang]?.(cost) ?? null,
  categoryColor: decisionsTxt[decisionKey]?.categoryColor ?? '#00ccff',
  object: decisionsTxt[decisionKey] ?? null,
});

const decisionsTxt = {
  LOCAL: {
    label: {
      pt: `Bug Local\n`,
      en: `Local Bug\n`,
    },
    costLabel: {
      pt: (cost) => `${cost} Pontos`,
      en: (cost) => `${cost} Points`,
    },
    costTestedLabel: {
      pt: (cost) => `\nTestado: ${cost} Pontos`,
      en: (cost) => `\nTested: ${cost} Points`,
    },
    categoryColor: '#FDE047',
  },
  STRUCTURAL: {
    label: {
      pt: `Bug Estrutural\n`,
      en: `Structural Bug\n`,
    },
    costLabel: {
      pt: (cost) => `${cost} Pontos`,
      en: (cost) => `${cost} Points`,
    },
    costTestedLabel: {
      pt: (cost) => `\nTestado: ${cost} Pontos`,
      en: (cost) => `\nTested: ${cost} Points`,
    },
    categoryColor: '#FF8A00',
  },
  REQUESTS: {
    label: {
      pt: `Bug de Requisições\n`,
      en: `Requests Bug\n`,
    },
    costLabel: {
      pt: (cost) => `${cost} Pontos`,
      en: (cost) => `${cost} Points`,
    },
    costTestedLabel: {
      pt: (cost) => `\nTestado: ${cost} Pontos`,
      en: (cost) => `\nTested: ${cost} Points`,
    },
    categoryColor: '#FF0055',
  },
  DONATE_POINTS: {
    label: {
      pt: `Doar Pontos \n `,
      en: `Donate Points \n`,
    },
    costLabel: {
      pt: (cost) => `Limite: ${cost} Pontos`,
      en: (cost) => `${cost} Points`,
    },
    categoryColor: '#22d3ee',
  },
  HOLD_POINTS: {
    label: {
      pt: `Guardar Pontos\n`,
      en: `Hold Points \n`,
    },
    costLabel: {
      pt: (cost) => ` Limite: ${cost} Pontos`,
      en: (cost) => `${cost} Points`,
    },
    categoryColor: '#22d3ee',
  },
  DEVELOP_TESTS: {
    label: {
      pt: `Desenvolver Testes\n`,
      en: `Develop Tests\n`,
    },
    costLabel: {
      pt: (cost) => `${cost} Pontos`,
      en: (cost) => `${cost} Points`,
    },
    categoryColor: '#00FF9F',
  },
};
