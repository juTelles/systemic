export const instructions = ({
  points,
  playerNickname,
  cardType,
  cardDescription,
} = {}) => ({
  GAME_START: {
    title: 'instructions',
    description: {
      pt: 'Jogo iniciado! O objetivo do Time é manter e testar todos os componentes do sistema! As regras estão no topo esquerdo da tela. Boa sorte!',
      in: "The game has started! The team's goal is to maintain and test all system components!",
    },
  },
  TURN_START: {
    title: 'Start of Turn',
    description: {
      pt: `Inicio do turno! O Time recebe ${points} Pontos de Tarefa a serem dividos igualmente entre os jogadores para gastar em Decisões Tecnicas.`,
      in: `Start of turn! The team receives ${points} "Task Points" to be divided equally among the players to spend on Technical Decisions.`,
    },
  },
  PLAYER_TURN: {
    title: 'Player Turn',
    description: {
      pt: `É a vez do jogador ${playerNickname}!`,
      in: `It's ${playerNickname}'s turn! Spend your points on one of the possible decisions in the decision panel!`,
    },
  },
  CHOOSE_DECISION: {
    title: 'Valid Decisions',
    description: {
      pt: 'Você possui Pontos de Tarefa para gastar. Escolha uma decisão, pontos restantes que não forem guardados ou doados serão perdidos ao final do turno.',
      in: 'You still have Task Points to spend on available Technical Decisions. Choose a decision, remaining points will be lost at the end of the turn.',
    },
  },
  DRAW_CARD: {
    title: 'Draw Card',
    description: {
      pt: 'Click no deque para retirar uma carta! As cartas podem ser de 3 tipos: Pontos, Bugs ou Eventos. Cada carta tem um efeito diferente!',
      in: 'Click on the deck to draw a card! Cards can be of 3 types: Points, Bugs, or Events. Each card has a different effect!',
    },
  },
  RESOLV_CARD: {
    title: 'Card Effects',
    description: {
      pt: `Você comprou uma carta de ${cardType}! ${cardDescription}`,
      in: `You drew a ${cardType} card! ${cardDescription}`,
    },
  },
});
