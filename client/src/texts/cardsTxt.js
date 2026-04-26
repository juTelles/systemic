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
  const { eventId, effect } = currentCard || {};

  if (textType === 'description') {
    const argument = effect.amount;

    if (textType === 'description' && argument === null)
      return `A argument is required for description text of event cards`;

    return (
      cardsTxt?.specialCards?.[eventId]?.[textType]?.[lang](
        argument,
      ) || 'Text not found for this card type'
    );
  } else {
    return (
      cardsTxt?.specialCards?.[eventId]?.[textType]?.[lang] ||
      'Text not found for this card type'
    );
  }
}
//TODO: Refactor getCardText function to be more scalable and maintainable,
// avoiding hardcoded checks for card types and text types. Consider using a
// more dynamic approach to retrieve the appropriate text based on the card's
//  properties.
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
          `Ganhou ${Number(amount) === 1 ? '1 ponto' : Number(amount) > 1 ? `${amount} pontos` : 'pontos'} de Tarefa!`,
        en: (amount) =>
          `Gained ${Number(amount) === 1 ? '1 point' : Number(amount) > 1 ? `${amount} points` : 'points'} of Task Points!`,
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
        pt: (amount) =>
          `Aplique ${Number(amount) === 1 ? '1 bug' : Number(amount) > 1 ? `${amount} bugs` : 'bugs'} em Requisições de Aplicação e Requisições de Dados`,
        en: (amount) =>
          `Apply ${Number(amount) === 1 ? '1 bug' : Number(amount) > 1 ? `${amount} bugs` : 'bugs'} to Application Requests and Data Requests`,
      },
    },

    EVENT_REQUEST_OVERLOAD: {
      title: {
        pt: 'Sobrecarga de Requisições',
        en: 'Request Overload',
      },
      description: {
        pt: (amount) =>
          `Aplique ${Number(amount) === 1 ? '1 bug' : Number(amount) > 1 ? `${amount} bugs` : 'bugs'} em Requisições de Aplicação e Requisições de Dados`,
        en: (amount) =>
          `Apply ${Number(amount) === 1 ? '1 bug' : Number(amount) > 1 ? `${amount} bugs` : 'bugs'} to Application Requests and Data Requests`,
      },
    },

    EVENT_VULNERABLE_AUTH_LIBRARY: {
      title: {
        pt: 'Biblioteca de Autenticação Vulnerável',
        en: 'Vulnerable Authentication Library',
      },
      description: {
        pt: (amount) =>
          `Aplique ${Number(amount) === 1 ? '1 bug' : Number(amount) > 1 ? `${amount} bugs` : 'bugs'} em Requisições de Aplicação e Requisições de Dados`,
        en: (amount) =>
          `Apply ${Number(amount) === 1 ? '1 bug' : Number(amount) > 1 ? `${amount} bugs` : 'bugs'} to Application Requests and Data Requests`,
      },
    },

    EVENT_COMMUNICATION_BREAKDOWN: {
      title: {
        pt: 'Falha de Comunicação',
        en: 'Communication Breakdown',
      },
      description: {
        pt: (amount) =>
          `Aplique ${Number(amount) === 1 ? '1 bug' : Number(amount) > 1 ? `${amount} bugs` : 'bugs'} em Requisições de Aplicação e Requisições de Dados`,
        en: (amount) =>
          `Apply ${Number(amount) === 1 ? '1 bug' : Number(amount) > 1 ? `${amount} bugs` : 'bugs'} to Application Requests and Data Requests`,
      },
    },

    EVENT_RACE_CONDITIONS: {
      title: {
        pt: 'Condições de Corrida',
        en: 'Race Conditions',
      },
      description: {
        pt: (amount) =>
          `Aplique ${Number(amount) === 1 ? '1 bug' : Number(amount) > 1 ? `${amount} bugs` : 'bugs'} no Componente de Requisições de Aplicação`,
        en: (amount) =>
          `Apply ${Number(amount) === 1 ? '1 bug' : Number(amount) > 1 ? `${amount} bugs` : 'bugs'} to Application Requests component`,
      },
    },

    EVENT_API_CONGESTION: {
      title: {
        pt: 'API em Colapso',
        en: 'API Congestion',
      },
      description: {
        pt: (amount) =>
          `Aplique ${Number(amount) === 1 ? '1 bug' : Number(amount) > 1 ? `${amount} bugs` : 'bugs'} no Componente de Requisições de Dados`,
        en: (amount) =>
          `Apply ${Number(amount) === 1 ? '1 bug' : Number(amount) > 1 ? `${amount} bugs` : 'bugs'} to Data Requests component`,
      },
    },

    EVENT_ARCHITECTURE_STRAIN: {
      title: {
        pt: 'Pressão na Arquitetura',
        en: 'Architecture Strain',
      },
      description: {
        pt: (amount) =>
          `Aplique ${Number(amount) === 1 ? '1 bug' : Number(amount) > 1 ? `${amount} bugs` : 'bugs'} em Banco de Dados, Back-end e Front-end`,
        en: (amount) =>
          `Apply ${Number(amount) === 1 ? '1 bug' : Number(amount) > 1 ? `${amount} bugs` : 'bugs'} to Database, Backend and Frontend components`,
      },
    },

    EVENT_BACKEND_CORE_REGRESSION: {
      title: {
        pt: 'Regressão no Núcleo do Backend',
        en: 'Backend Core Regression',
      },
      description: {
        pt: (amount) =>
          `Aplique ${Number(amount) === 1 ? '1 bug' : Number(amount) > 1 ? `${amount} bugs` : 'bugs'} em Backend, Lógica e Integrações`,
        en: (amount) =>
          `Apply ${Number(amount) === 1 ? '1 bug' : Number(amount) > 1 ? `${amount} bugs` : 'bugs'} to Backend, Logic and Integrations components`,
      },
    },

    EVENT_FORGOT_WHERE_CLAUSE: {
      title: {
        pt: 'O estagiário esqueceu o WHERE',
        en: 'The Intern Forgot WHERE Clause',
      },
      description: {
        pt: (amount) =>
          `Aplique ${Number(amount) === 1 ? '1 bug' : Number(amount) > 1 ? `${amount} bugs` : 'bugs'} em Banco de Dados, Estrutura e Dados`,
        en: (amount) =>
          `Apply ${Number(amount) === 1 ? '1 bug' : Number(amount) > 1 ? `${amount} bugs` : 'bugs'} to Database, Structure and Data components`,
      },
    },

    EVENT_FRONTEND_INSTABILITY: {
      title: {
        pt: 'Instabilidade no Frontend',
        en: 'Frontend Instability',
      },
      description: {
        pt: (amount) =>
          `Aplique ${Number(amount) === 1 ? '1 bug' : Number(amount) > 1 ? `${amount} bugs` : 'bugs'} em Frontend, Interação e Interface`,
        en: (amount) =>
          `Apply ${Number(amount) === 1 ? '1 bug' : Number(amount) > 1 ? `${amount} bugs` : 'bugs'} to Frontend, Interaction, and Interface components`,
      },
    },
  },
};

// pt: (componentIds, amount) => `Aplique ${amount} Bugs aos componentes: ${componentIds.map(nodeId => getComponentName(nodeId, 'pt')).join(', ')}.`,
// en: (componentIds, amount) => `Apply ${amount} Bugs to following components: ${componentIds.map(nodeId => getComponentName(nodeId, 'en')).join(', ')}.`,
