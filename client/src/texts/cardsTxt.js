import { getComponentName } from './componentsTxt';

export function getCardText(
  currentCard = null,
  textType = 'title',
  lang = 'pt',
) {
  const textGetter = getCardTextGetters?.[currentCard?.type];
  if (!textGetter) return 'Text not found for this card type';

  return textGetter(currentCard, textType, lang);
}

const getCardTextGetters = {
  LOCAL: getRegularCardText,
  STRUCTURAL: getRegularCardText,
  REQUESTS: getRegularCardText,
  POINTS: getRegularCardText,
  EVENT: getEventCardText,
};

function getRegularCardText(currentCard, textType, lang) {
  const { type, effect } = currentCard || {};

  if (textType === 'description') {
    const argument =
      type === 'POINTS' ? effect.amount : effect.componentsAffected[0];

    if (textType === 'description' && argument === null)
      return `A argument is required for description text of ${type} cards`;

    return (
      cardsTxt?.regularCards?.[type]?.[textType]?.[lang](argument) ||
      'Text not found for this card type'
    );
  } else {
    return (
      cardsTxt?.regularCards?.[type]?.[textType]?.[lang] ||
      'Text not found for this card type'
    );
  }
}

function getEventCardText(currentCard, textType, lang) {
  const { eventId } = currentCard || {};

  if (eventId === null) return 'eventId is required for text of Event cards';

  return (
    cardsTxt?.specialCards?.[eventId]?.[textType]?.[lang] ||
    'Text not found for this event card'
  );
}

export const cardsTxt = {
  regularCards: {
    LOCAL: {
      title: {
        pt: 'Bug Local',
        en: 'Local Bug',
      },
      description: {
        pt: (componentId) => getComponentName(componentId, 'pt'),
        en: (componentId) => getComponentName(componentId, 'en'),
      },
    },
    STRUCTURAL: {
      title: {
        pt: 'Bug Estrutural',
        en: 'Structural Bug',
      },
      description: {
        pt: (componentId) => getComponentName(componentId, 'pt'),
        en: (componentId) => getComponentName(componentId, 'en'),
      },
    },
    REQUESTS: {
      title: {
        pt: 'Bug de Requisições',
        en: 'Requests Bug',
      },
      description: {
        pt: (componentId) => getComponentName(componentId, 'pt'),
        en: (componentId) => getComponentName(componentId, 'en'),
      },
    },
    POINTS: {
      title: {
        pt: 'Pontos de Tarefa',
        en: 'TaskPoints',
      },
      description: {
        pt: (amount) =>
          `Você ganhou ${Number(amount) === 1 ? '1 ponto' : Number(amount) > 1 ? `${amount} pontos` : 'pontos'} de tarefa!`,
        en: (amount) =>
          `You gained ${Number(amount) === 1 ? '1 point' : Number(amount) > 1 ? `${amount} points` : 'points'} task points!`,
      },
    },
  },
  specialCards: {
    EVENT_HACKER_ATTACK: {
      title: {
        pt: 'Ataque Hacker',
        en: 'Hacker Attack',
      },
      description: {
        pt: 'Aplique 3 Bugs em Requisições de Aplicação e Requisições de Dados',
        en: 'Apply 3 Bugs to Application Requests and Data Requests',
      },
    },

    EVENT_REQUEST_OVERLOAD: {
      title: {
        pt: 'Sobrecarga de Requisições',
        en: 'Request Overload',
      },
      description: {
        pt: 'Aplique 3 Bugs em Requisições de Aplicação e Requisições de Dados',
        en: 'Apply 3 Bugs to Application Requests and Data Requests',
      },
    },

    EVENT_VULNERABLE_AUTH_LIBRARY: {
      title: {
        pt: 'Biblioteca de Autenticação Vulnerável',
        en: 'Vulnerable Authentication Library',
      },
      description: {
        pt: 'Aplique 3 Bugs em Requisições de Aplicação e Requisições de Dados',
        en: 'Apply 3 Bugs to Application Requests and Data Requests',
      },
    },

    EVENT_COMMUNICATION_BREAKDOWN: {
      title: {
        pt: 'Falha de Comunicação',
        en: 'Communication Breakdown',
      },
      description: {
        pt: 'Aplique 2 Bugs em Requisições de Aplicação e Requisições de Dados',
        en: 'Apply 2 Bugs to Application Requests and Data Requests',
      },
    },

    EVENT_RACE_CONDITIONS: {
      title: {
        pt: 'Condições de Corrida',
        en: 'Race Conditions',
      },
      description: {
        pt: 'Aplique 3 Bugs no Componente de Requisições de Aplicação',
        en: 'Apply 3 Bugs to Application Requests component',
      },
    },

    EVENT_API_CONGESTION: {
      title: {
        pt: 'API em Colapso',
        en: 'API Congestion',
      },
      description: {
        pt: 'Aplique 3 Bugs no Componente de Requisições de Dados',
        en: 'Apply 3 Bugs to Data Requests component',
      },
    },

    EVENT_ARCHITECTURE_STRAIN: {
      title: {
        pt: 'Pressão na Arquitetura',
        en: 'Architecture Strain',
      },
      description: {
        pt: 'Aplique 2 Bugs em Banco de Dados, Back-end e Front-end',
        en: 'Apply 2 Bugs to Database, Backend and Frontend components',
      },
    },

    EVENT_BACKEND_CORE_REGRESSION: {
      title: {
        pt: 'Regressão no Núcleo do Backend',
        en: 'Backend Core Regression',
      },
      description: {
        pt: 'Aplique 2 Bugs em Backend, Lógica e Integrações',
        en: 'Apply 2 Bugs to Backend, Logic and Integrations components',
      },
    },

    EVENT_FORGOT_WHERE_CLAUSE: {
      title: {
        pt: 'O estagiário esqueceu o WHERE',
        en: 'The Intern Forgot WHERE Clause',
      },
      description: {
        pt: 'Aplique 2 Bugs em Banco de Dados, Estrutura e Dados',
        en: 'Apply 2 Bugs to Database, Structure and Data components',
      },
    },

    EVENT_FRONTEND_INSTABILITY: {
      title: {
        pt: 'Instabilidade no Frontend',
        en: 'Frontend Instability',
      },
      description: {
        pt: 'Aplique 2 Bugs em Frontend, Interação e Interface',
        en: 'Apply 2 Bugs to Frontend, Interaction, and Interface components',
      },
    },
  },
};

// pt: (componentIds, amount) => `Aplique ${amount} Bugs aos componentes: ${componentIds.map(nodeId => getComponentName(nodeId, 'pt')).join(', ')}.`,
// en: (componentIds, amount) => `Apply ${amount} Bugs to following components: ${componentIds.map(nodeId => getComponentName(nodeId, 'en')).join(', ')}.`,
