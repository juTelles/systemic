import { getComponentName } from './componentsTxt';

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
        pt: 'Aplique 3 bugs nos componentes de Requisições de Aplicação e Requisições de Dados.',
        en: 'Apply 3 bugs to the Application Requests and Data Requests components.',
      },
    },

    EVENT_REQUEST_OVERLOAD: {
      title: {
        pt: 'Sobrecarga de Requisições',
        en: 'Request Overload',
      },
      description: {
        pt: 'Aplique 3 bugs nos componentes de Requisições de Aplicação e Requisições de Dados.',
        en: 'Apply 3 bugs to the Application Requests and Data Requests components.',
      },
    },

    EVENT_VULNERABLE_AUTH_LIBRARY: {
      title: {
        pt: 'Biblioteca de Autenticação Vulnerável',
        en: 'Vulnerable Authentication Library',
      },
      description: {
        pt: 'Aplique 3 bugs nos componentes de Requisições de Aplicação e Requisições de Dados.',
        en: 'Apply 3 bugs to the Application Requests and Data Requests components.',
      },
    },

    EVENT_COMMUNICATION_BREAKDOWN: {
      title: {
        pt: 'Falha de Comunicação',
        en: 'Communication Breakdown',
      },
      description: {
        pt: 'Aplique 2 bugs nos componentes de Requisições de Aplicação e Requisições de Dados.',
        en: 'Apply 2 bugs to the Application Requests and Data Requests components.',
      },
    },

    EVENT_RACE_CONDITIONS: {
      title: {
        pt: 'Condições de Corrida',
        en: 'Race Conditions',
      },
      description: {
        pt: 'Aplique 3 bugs no componente de Requisições de Aplicação.',
        en: 'Apply 3 bugs to the Application Requests component.',
      },
    },

    EVENT_API_CONGESTION: {
      title: {
        pt: 'Congestionamento de API',
        en: 'API Congestion',
      },
      description: {
        pt: 'Aplique 3 bugs no componente de Requisições de Dados.',
        en: 'Apply 3 bugs to the Data Requests component.',
      },
    },

    EVENT_ARCHITECTURE_STRAIN: {
      title: {
        pt: 'Pressão na Arquitetura',
        en: 'Architecture Strain',
      },
      description: {
        pt: 'Aplique 2 bugs nos componentes Banco de Dados, Back-end e Front-end.',
        en: 'Apply 2 bugs to the Database, Backend, and Frontend components.',
      },
    },

    EVENT_BACKEND_CORE_REGRESSION: {
      title: {
        pt: 'Regressão no Núcleo do Backend',
        en: 'Backend Core Regression',
      },
      description: {
        pt: 'Aplique 2 bugs nos componentes Backend, Lógica e Integrações.',
        en: 'Apply 2 bugs to the Backend, Logic, and Integrations components.',
      },
    },

    EVENT_FORGOT_WHERE_CLAUSE: {
      title: {
        pt: 'O estagiário esqueceu o WHERE',
        en: 'The Intern Forgot the WHERE Clause',
      },
      description: {
        pt: 'Aplique 2 bugs nos componentes Banco de Dados, Dados e Estrutura.',
        en: 'A database operation affected more data than expected. Apply 2 bugs to the Database, Data, and Structure components.',
      },
    },

    EVENT_FRONTEND_INSTABILITY: {
      title: {
        pt: 'Instabilidade no Frontend',
        en: 'Frontend Instability',
      },
      description: {
        pt: 'Aplique 2 bugs nos componentes Frontend, Interação e Interface.',
        en: ' Apply 2 bugs to the Frontend, Interaction, and Interface components.',
      },
    },
  },
};

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

  if (eventId === null)
    return 'eventId is required for text of Event cards';

  return (
    cardsTxt?.specialCards?.[eventId]?.[textType]?.[lang] ||
    'Text not found for this event card'
  );
}

// pt: (componentIds, amount) => `Aplique ${amount} bugs aos componentes: ${componentIds.map(nodeId => getComponentName(nodeId, 'pt')).join(', ')}.`,
// en: (componentIds, amount) => `Apply ${amount} bugs to the following components: ${componentIds.map(nodeId => getComponentName(nodeId, 'en')).join(', ')}.`,