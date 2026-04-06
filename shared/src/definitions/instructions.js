export const instructions = (state) => {
  const playerPerRound = state?.gameConfig?.taskPoints?.playerPerRound || 0;
  const maxPlayerPoints = state?.gameConfig?.taskPoints?.maxPlayerPoints || 0;
  const DONATE_POINTS = state?.gameConfig?.decisionCosts?.DONATE_POINTS || 0;
  const HOLD_POINTS = state?.gameConfig?.decisionCosts?.HOLD_POINTS || 0;
  const playerNickname =
    state?.players?.find((p) => p.id === state.currentPlayerId)?.nickname || 'Player';
  const cardType = state?.currentCard?.type || '';
  const cardDescription = state?.currentCard?.description || '';

  return {
    WAITING_PLAYERS_READY: {
      title: 'Ready Up',
      description: {
        pt: `Bem-vindos ao Systemic! \nTodos os jogadores devem clicar no botão "Pronto" para iniciar o jogo!\n Enquanto isso, aproveite para se familiarizar com o tabuleiro, paineis e conhecer a regras do jogo, localizadas no topo direito da tela, indentificadas pelo botão '?'.`,
        in: `Welcome to Systemic! \nAll players must click the "Ready" button to start the game!\n In the meantime, take the opportunity to familiarize yourself with the board, panels, and get to know the game rules, located at the top right of the screen, identified by the '?' button.`,
      },
    },
    GAME_START: {
      title: 'instructions',
      description: {
        pt: `Jogo iniciado! O objetivo do Time é manter o sistema funcionando e implementar testes em todos os seus componentes. As regras estão no canto superior direito da tela.\n\nA cada rodada, o Time recebe ${playerPerRound} Pontos de Tarefa, divididos igualmente entre os jogadores como pontos na mão. Esses pontos, junto com os pontos guardados no banco de cada jogador, podem ser usados para realizar Decisões Técnicas.\n\nOs pontos na mão que não forem usados no turno de cada jogador serão descartados. Cada jogador pode ter no máximo ${maxPlayerPoints} pontos no total (mão + banco). Qualquer ponto que ultrapassar esse limite também será descartado.\n\nBoa sorte!`,
        in: `Game started! The team's objective is to keep the system running and implement tests in all its components. The rules are in the upper right corner of the screen.\n\nEach round, the team receives ${playerPerRound} Task Points, divided equally among the players as points in hand. These points, along with the points saved in each player's bank, can be used to make Technical Decisions.\n\nUnused points in each player's turn will be discarded. Each player can have a maximum of ${maxPlayerPoints} points in total (hand + bank). Any points that exceed this limit will also be discarded.\n\nGood luck!`,
      },
    },
    ROUND_START: {
      title: 'Start of Turn',
      description: {
        pt: `Inicio do turno! O Time recebe ${playerPerRound} Pontos de Tarefa a serem divididos igualmente entre os jogadores para gastar em Decisões Tecnicas.`,
        in: `Start of turn! The team receives ${playerPerRound} "Task Points" to be divided equally among the players to spend on Technical Decisions.`,
      },
    },
    TURN_START: {
      title: 'Player Turn',
      description: {
        pt: `É a vez do jogador ${playerNickname}!`,
        in: `It's ${playerNickname}'s turn! Spend your points on one of the possible decisions in the decision panel!`,
      },
    },
    AWAIT_DECISION: {
      title: 'Valid Decisions',
      description: {
        pt: `Você possui Pontos de Tarefa para gastar. Escolha uma Decisão Técnica para resolver bugs, desenvolver testes, guardar pontos ou doá-los a outro jogador. Ao final do turno, os pontos que continuarem na mão e não forem guardados ou doados serão descartados. Cada jogador pode ter no máximo ${maxPlayerPoints} pontos no total (mão + banco).`,
        in: `You have Task Points to spend. Choose a Technical Decision to fix bugs, develop tests, save points, or donate them to another player. At the end of the round, points that remain in hand and are not saved or donated will be discarded. Each player can have a maximum of ${maxPlayerPoints} points in total (hand + bank).`,
      },
      additionalDescriptions: {
        decriptionChoseToResolveBug: {
          pt: `Você escolheu resolver um bug. Agora, clique no tabuleiro no componente em que deseja tratá-lo. Cada decisão permite resolver apenas um bug.\n\nResolver bugs em componentes que já possuem testes custa metade dos pontos.\n\nOs componentes desabilitados não podem ser escolhidos porque não podem ser afetados pela decisão selecionada.`,
          in: `You chose to fix a bug. Now, click on the board on the component you want to fix it. Each decision allows you to fix only one bug.\n\nFixing bugs in components that already have tests costs half the points.\n\nDisabled components cannot be chosen because they cannot be affected by the selected decision.`,
        },
        descriptionChoseToDonatePoints: {
          pt: `Você escolheu doar pontos. Agora, clique no nome do jogador no painel para escolher para quem deseja doar. Em seguida, informe a quantidade de pontos e clique no check da coluna Enviar.\n\nVocê só pode doar para outros jogadores. Se quiser manter pontos para si, escolha a decisão Guardar pontos.\n\nLembre-se: você pode doar até ${DONATE_POINTS} pontos por turno e guardar até ${HOLD_POINTS} pontos por turno. Cada jogador pode ter no máximo ${maxPlayerPoints} pontos no total (mão + banco). Pontos que não forem doados nem guardados serão descartados ao final do turno.`,
          in: `You chose to donate points. Now, click on the player's name in the panel to choose who you want to donate to. Then, enter the amount of points and click the check in the Send column.\n\nYou can only donate to other players. If you want to keep points for yourself, choose the Save Points decision.\n\nRemember: you can donate up to ${DONATE_POINTS} points per turn and save up to ${HOLD_POINTS} points per turn. Each player can have a maximum of ${maxPlayerPoints} points in total (hand + bank). Points that are not donated or saved will be discarded at the end of the turn.`,
        },
        descriptionChoseToHoldPoints: {
          pt: `Você escolheu guardar pontos. Agora, informe quantos pontos deseja guardar e clique no check da coluna Enviar.\n\nSe quiser transferir pontos para outro jogador, escolha a decisão Doar pontos.\n\nLembre-se: você pode guardar até ${HOLD_POINTS} pontos por turno e doar até ${DONATE_POINTS} pontos por turno. Cada jogador pode ter no máximo ${maxPlayerPoints} pontos no total (mão + banco). Pontos que não forem guardados nem doados serão descartados ao final do turno.`,
          in: `You chose to save points. Now, enter how many points you want to save and click the check in the Send column.\n\nIf you want to transfer points to another player, choose the Donate Points decision.\n\nRemember: you can save up to ${HOLD_POINTS} points per turn and donate up to ${DONATE_POINTS} points per turn. Each player can have a maximum of ${maxPlayerPoints} points in total (hand + bank). Points that are not saved or donated will be discarded at the end of the turn.`,
        },
        descriptionChoseToDevelopTest: {
          pt: `Você escolheu desenvolver testes. Agora, clique no componente do tabuleiro em que deseja implementá-los.\n\nTestes só podem ser desenvolvidos em componentes que não possuem bugs e cujos subcomponentes já estejam testados. Por exemplo, o Front-end só pode receber testes se Interface e Interação já possuírem testes.\n\nOs componentes desabilitados não podem ser escolhidos porque ainda não atendem a essas condições.`,
          in: `You chose to develop tests. Now, click on the board component where you want to implement them.\n\nTests can only be developed on components that have no bugs and whose subcomponents are already tested. For example, the Front-end can only receive tests if Interface and Interaction already have tests.\n\nDisabled components cannot be chosen because they do not yet meet these conditions.`,
        },
      },
    },
    AWAIT_CARD_DRAW: {
      title: 'Draw Card',
      description: {
        pt: 'Click no deque para retirar uma carta! As cartas podem ser de 3 tipos: Pontos, Bugs ou Eventos. Cada carta tem um efeito diferente!',
        in: 'Click on the deck to draw a card! Cards can be of 3 types: Points, Bugs, or Events. Each card has a different effect!',
      },
    },
    PROCESSING_CARD: {
      title: 'Card Effects',
      description: {
        pt: `Você comprou uma carta de ${cardType}! ${cardDescription}`,
        in: `You drew a ${cardType} card! ${cardDescription}`,
      },
    },
  };
};
