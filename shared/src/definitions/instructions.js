import { getCardText } from '../../../client/src/texts/cardsTxt';

export const instructions = (state) => {
  const playerPerRound = state?.gameConfig?.taskPoints?.playerPerRound || 0;
  const maxPlayerPoints = state?.gameConfig?.taskPoints?.maxPlayerPoints || 0;
  const DONATE_POINTS = state?.gameConfig?.decisionCosts?.DONATE_POINTS || 0;
  const HOLD_POINTS = state?.gameConfig?.decisionCosts?.HOLD_POINTS || 0;
  const currentCard = state?.cardState?.current || null;
  const playerNickname =
    state?.players?.find((p) => p.id === state.flow.currentPlayerId)
      ?.nickname || '';


  return {
    WAITING_PLAYERS_READY: {
      title: 'Ready Up',
      description: {
        pt: `Bem-vindos ao Systemic! \nTodos os jogadores devem clicar no botão "Pronto" para iniciar o jogo!\n Enquanto isso, aproveite para se familiarizar com o tabuleiro, paineis e conhecer a regras do jogo, localizadas no topo direito da tela, identificadas pelo botão '?'.`,
        en: `Welcome to Systemic! \nAll players must click the "Ready" button to start the game!\n In the meantime, take the opportunity to familiarize yourself with the board, panels, and get to know the game rules, located at the top right of the screen, identified by the '?' button.`,
      },
    },
    GAME_START: {
      title: 'instructions',
      description: {
        pt: `Jogo iniciado! O objetivo do Time é manter o sistema funcionando e implementar testes em todos os seus componentes. As regras estão no canto superior direito da tela.\n\nBoa sorte!`,
        en: `Game started! The team's objective is to keep the system running and implement tests in all its components. The rules are in the upper right corner of the screen.\n\nGood luck!`,
      },
    },
    ROUND_START: {
      title: 'Start of Turn',
      description: {
        pt: `Inicio da rodada!\n\n O Time recebe ${playerPerRound * state?.players?.length} Pontos de Tarefa a serem divididos igualmente entre os jogadores para gastar em Decisões Tecnicas.`,
        en: `Start of turn!\n\n The team receives ${playerPerRound * state?.players?.length} "Task Points" to be divided equally among the players to spend on Technical Decisions.`,
      },
    },
    TURN_START: {
      title: 'Player Turn',
      description: {
        pt: `É a vez do jogador ${playerNickname}!\n\n Gaste seus pontos em uma das possíveis decisões no painel de decisões!`,
        en: `It's ${playerNickname}'s turn!\n\n Spend your points on one of the possible decisions in the decision panel!`,
      },
    },
    AWAIT_DECISION: {
      title: 'Valid Decisions',
      description: {
        pt: `${playerNickname} você possui Pontos de Tarefa para gastar.\n Escolha uma Decisão Técnica para resolver bugs, desenvolver testes, guardar pontos ou doá-los a outro jogador. Ao final do turno, os pontos que continuarem na mão e não forem guardados ou doados serão descartados. Cada jogador pode ter no máximo ${maxPlayerPoints} pontos no total (mão + banco).`,
        en: `${playerNickname} you have Task Points to spend.\n Choose a Technical Decision to fix bugs, develop tests, save points, or donate them to another player. At the end of the round, points that remain in hand and are not saved or donated will be discarded. Each player can have a maximum of ${maxPlayerPoints} points in total (hand + bank).`,
      },
      additionalDescriptions: {
        descriptionChoseToResolveBug: {
          pt: `${playerNickname} você escolheu resolver um bug.\n Agora, clique no tabuleiro no componente em que deseja tratá-lo. Cada decisão permite resolver apenas um bug.\nResolver bugs em componentes que já possuem testes custa metade dos pontos.\nOs componentes desabilitados não podem ser escolhidos porque não podem ser afetados pela decisão selecionada.`,
          en: `${playerNickname} you chose to fix a bug.\n Now, click on the board on the component you want to fix it. Each decision allows you to fix only one bug.\nFixing bugs in components that already have tests costs half the points.\nDisabled components cannot be chosen because they cannot be affected by the selected decision.`,
        },
        descriptionChoseToDonatePoints: {
          pt: `${playerNickname} você escolheu doar pontos.\n Agora, clique no nome do jogador no painel para escolher para quem deseja doar. Em seguida, informe a quantidade de pontos e clique no check da coluna Enviar.\n\nVocê só pode doar para outros jogadores. Se quiser manter pontos para si, escolha a decisão Guardar pontos.\n\nLembre-se: você pode doar até ${DONATE_POINTS} pontos por turno e guardar até ${HOLD_POINTS} pontos por turno. Cada jogador pode ter no máximo ${maxPlayerPoints} pontos no total (mão + banco). Pontos que não forem doados nem guardados serão descartados ao final do turno.`,
          en: `${playerNickname} you chose to donate points.\n Now, click on the player's name in the panel to choose who you want to donate to. Then, enter the amount of points and click the check in the Send column.\n\nYou can only donate to other players. If you want to keep points for yourself, choose the Save Points decision.\n\nRemember: you can donate up to ${DONATE_POINTS} points per turn and save up to ${HOLD_POINTS} points per turn. Each player can have a maximum of ${maxPlayerPoints} points in total (hand + bank). Points that are not donated or saved will be discarded at the end of the turn.`,
        },
        descriptionChoseToHoldPoints: {
          pt: `${playerNickname} você escolheu guardar pontos.\n Agora, informe quantos pontos deseja guardar e clique no check da coluna Enviar.\nSe quiser transferir pontos para outro jogador, escolha a decisão Doar pontos.\nLembre-se: você pode guardar até ${HOLD_POINTS} pontos por turno e doar até ${DONATE_POINTS} pontos por turno. Cada jogador pode ter no máximo ${maxPlayerPoints} pontos no total (mão + banco). Pontos que não forem guardados nem doados serão descartados ao final do turno.`,
          en: `${playerNickname} you chose to save points.\n Now, enter how many points you want to save and click the check in the Send column.\nIf you want to transfer points to another player, choose the Donate Points decision.\n\nRemember: you can save up to ${HOLD_POINTS} points per turn and donate up to ${DONATE_POINTS} points per turn. Each player can have a maximum of ${maxPlayerPoints} points in total (hand + bank). Points that are not saved or donated will be discarded at the end of the turn.`,
        },
        descriptionChoseToDevelopTest: {
          pt: `${playerNickname} você escolheu desenvolver testes.\n Agora, clique no componente do tabuleiro em que deseja implementá-los.\nTestes só podem ser desenvolvidos em componentes que não possuem bugs e cujos subcomponentes já estejam testados. Por exemplo, o Front-end só pode receber testes se Interface e Interação já possuírem testes.\nOs componentes desabilitados não podem ser escolhidos porque ainda não atendem a essas condições.`,
          en: `${playerNickname} you chose to develop tests.\n Now, click on the board component where you want to implement them.\nTests can only be developed on components that have no bugs and whose subcomponents are already tested. For example, the Front-end can only receive tests if Interface and Interaction already have tests.\nDisabled components cannot be chosen because they do not yet meet these conditions.`,
        },
      },
    },
    AWAIT_CARD_DRAW: {
      title: 'Draw Card',
      description: {
        pt: `${playerNickname}, retire uma carta.\n Clique no deque para comprar uma carta! As cartas podem ser de três tipos: Pontos, Bugs ou Eventos, e cada uma possui um efeito diferente.`,
        en: `${playerNickname}, draw a card.\n Click on the deck to draw a card! Cards can be of three types: Points, Bugs, or Events, and each has a different effect.`,
      },
    },
    SHOWING_CARD: {
      title: 'Card drawn',
      description: {
        pt: cardInstructionBuilder(currentCard, playerNickname, 'pt') ?? '',
        en: cardInstructionBuilder(currentCard, playerNickname, 'en') ?? '',
      },
    },
    PROCESSING_CARD: {
      title: 'Card Effects',
      description: {
        pt: cardInstructionBuilder(currentCard, playerNickname, 'pt') ?? '',
        en: cardInstructionBuilder(currentCard, playerNickname, 'en') ?? '',
      },
    },
  };
};

function cardInstructionBuilder(currentCard, playerNickname, lang = 'pt') {

  const instructionBuilders = {
    LOCAL: bugCardInstructionBuilder,
    STRUCTURAL: bugCardInstructionBuilder,
    REQUESTS: bugCardInstructionBuilder,
    POINTS: pointsCardInstructionBuilder,
    EVENT: eventsCardInstructionBuilder
  };
  const builder = instructionBuilders[currentCard?.type];
  if (!builder) {
    return 'No instruction builder found for this card type';
  }

  return builder(playerNickname, currentCard, lang);
}

function bugCardInstructionBuilder(playerNickname, currentCard, lang) {
  const cardTitle = getCardText(currentCard, 'title', lang);
  const cardComponent = getCardText(currentCard, 'description', lang);
  const cardInstruction = {
    pt: `${playerNickname}, você comprou uma carta de Bug: ${cardTitle} no componente ${cardComponent}.\n Esta carta aplica 1 bug ao componente ${cardComponent}.`,
    en: `${playerNickname}, you drew a Bug card: ${cardTitle} in the ${cardComponent} component.\n This card applies 1 bug to the ${cardComponent} component.`
  };
  return cardInstruction[lang];
}

function pointsCardInstructionBuilder(playerNickname, currentCard, lang) {
  const { effect } = currentCard;
  const cardInstruction = {
    pt: `${playerNickname}, você comprou uma carta de Pontos de Tarefa.\n Você ganhou ${Number(effect.amount) === 1 ? '1 ponto' : Number(effect.amount) > 1 ? `${effect.amount} pontos` : 'pontos'} de banco.`,
    en: `${playerNickname}, you drew a Task Points card.\n You gained ${Number(effect.amount) === 1 ? '1 point' : Number(effect.amount) > 1 ? `${effect.amount} points` : 'points'} in the bank.`
  };
  return cardInstruction[lang];
}

function eventsCardInstructionBuilder(playerNickname, currentCard, lang) {
  const cardTitle = getCardText(currentCard, 'title', lang);
  const cardDescription = getCardText(currentCard, 'description', lang);
  const cardInstruction = {
    pt: `${playerNickname}, você comprou uma carta de Evento: ${cardTitle}\n ${cardDescription}`,
    en: `${playerNickname}, you drew an Event card: ${cardTitle}\n ${cardDescription}`
  };
  return cardInstruction[lang];
}
