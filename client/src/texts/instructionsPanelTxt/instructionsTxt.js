import { buildCardInstruction } from './cardInstructions.js';
// import { buildCardEffectInstruction } from './cardEffectInstructions.js';
import { buildSystemHealthChangeInstruction } from './systemHealthChangeInstructions.js';
import { buildDecisionInstruction } from './decisionInstructions.js';

export const instructionsTxt = (ctx) => {
  return {
    DECISION_INSTRUCTION_KEY: {
      title: {
        pt: buildDecisionInstruction(ctx, 'title', 'pt') ?? '',
        en: buildDecisionInstruction(ctx, 'title', 'en') ?? '',
      },
      description: {
        pt: buildDecisionInstruction(ctx, 'description', 'pt') ?? '',
        en: buildDecisionInstruction(ctx, 'description', 'en') ?? '',
      },
    },
    WAITING_PLAYERS_READY: {
      title: {
        pt: 'Bem-vindos ao Systemic!',
        en: 'Welcome to Systemic!',
      },
      description: {
        pt: `Todos devem clicar em "PRONTO" para iniciar o jogo!\n\nEnquanto isso, aproveite para se familiarizar com o tabuleiro, painéis e conhecer as regras do jogo, localizadas no topo direito da tela, identificadas pelo botão '?'.`,
        en: `All players must click the "READY" button to start the game!\n\nIn the meantime, take the opportunity to familiarize yourself with the board, panels, and get to know the game rules, located at the top right of the screen, identified by the '?' button.`,
      },
    },
    GAME_START: {
      title: {
        pt: 'Início do Jogo',
        en: 'Game Start',
      },
      description: {
        pt: `Jogo iniciado! O objetivo do Time é manter o Sistema funcionando e implementar testes em todos os seus Componentes. As regras estão no canto superior direito da tela.\n\nBoa sorte!`,
        en: `Game started! The team's objective is to keep the system running and implement tests in all its components. The rules are in the upper right corner of the screen.\n\nGood luck!`,
      },
    },
    ROUND_START: {
      title: {
        pt: 'Início da Rodada',
        en: 'Round Start',
      },
      description: {
        pt: (ctx) =>
          `O Time recebe ${ctx.startRoundPoints} Pontos de Tarefa divididos igualmente entre o Time, para gastarem em Decisões Técnicas.`,
        en: (ctx) =>
          `The team receives ${ctx.startRoundPoints} Task Points to be divided equally among the players to spend on Technical Decisions.`,
      },
    },
    CRISIS_ROUND_START: {
      title: {
        pt: 'Início da Rodada de Crise',
        en: 'Crisis Round Start',
      },
      description: {
        pt: (ctx) =>
          `Perigo: A Rodada de Crise vai começar! Além dos ${ctx.startRoundPoints} Pontos de Tarefa habituais, o Time receberá ${ctx.startRoundCrisesPoints} Pontos de Crise extras, divididos igualmente entre o Time, para usarem em Decisões Técnicas.\n\nLembre-se: O Time tem até o final da rodada para tirar o Sistema do Estado Crítico, caso contrário, o jogo termina com a derrota do Time!`,
        en: (ctx) =>
          `Danger: The Crisis Round is about to start! In addition to the usual ${ctx.startRoundPoints} Task Points, the Team will receive ${ctx.startRoundCrisesPoints} extra Crisis Points, to be divided equally among the Team members, to be used in Technical Decisions.\n\nRemember: The Team has until the end of the round to get the System out of the Critical State, otherwise, the game ends with the Team's defeat!`,
      },
    },
    TURN_START: {
      title: {
        pt: (ctx) => `É a vez de: ${ctx.playerNickname}`,
        en: (ctx) => `Player Turn: ${ctx.playerNickname}`,
      },
      description: {
        pt: (ctx) =>
          `Agora é a a vez de ${ctx.playerNickname}! Gaste seus pontos em uma das possíveis decisões no painel de decisões!`,
        en: (ctx) =>
          `It's ${ctx.playerNickname}'s turn! Spend your points on one of the possible decisions in the decision panel!`,
      },
    },
    AWAIT_DECISION: {
      title: {
        pt: 'Escolha uma Decisão Técnica',
        en: 'Make your Technical Decision',
      },
      description: {
        pt: (ctx) =>
          `${ctx.playerNickname}, escolha entre resolver Bugs, desenvolver Testes, guardar pontos ou doá-los a outro membro do Time.\n\nPressione PULAR quando não quiser mais realizar decisões.\n\nLembre-se: Ao final do turno, os pontos da mão que não forem utilizados serão descartados.\nCada membro do Time pode ter no máximo ${ctx.maxPlayerPoints} pontos no total (mão + banco).`,
        en: (ctx) =>
          `${ctx.playerNickname}, choose between fixing Bugs, developing Tests, holding points, or donating them to another Team member.\n\nPress SKIP when you don't want to make more decisions.\n\nRemember: At the end of the turn, any points in hand that are not used will be discarded.\nEach Team member can have a maximum of ${ctx.maxPlayerPoints} points in total (hand + bank).`,
      },
    },
    AWAIT_CARD_DRAW: {
      title: {
        pt: 'Compre uma Carta',
        en: 'Draw a Card',
      },
      description: {
        pt: (ctx) =>
          `${ctx.playerNickname}, clique no baralho para comprar uma carta!\n\nAs cartas podem ser de três tipos: Pontos, Bugs ou Eventos, e cada uma possui um efeito diferente.`,
        en: (ctx) =>
          `${ctx.playerNickname}, click on the deck to draw a card!\n\nCards can be of three types: Points, Bugs, or Events, and each has a different effect.`,
      },
    },
    SHOWING_CARD: {
      title: {
        pt: buildCardInstruction(ctx, 'title', 'pt') ?? '',
        en: buildCardInstruction(ctx, 'title', 'en') ?? '',
      },
      description: {
        pt: buildCardInstruction(ctx, 'description', 'pt') ?? '',
        en: buildCardInstruction(ctx, 'description', 'en') ?? '',
      },
    },
    // PROCESSING_CARD: {
    //   title: {
    //     pt: buildCardEffectInstruction(ctx, 'title', 'pt') ?? '',
    //     en: buildCardEffectInstruction(ctx, 'title', 'en') ?? '',
    //   },
    //   description: {
    //     pt: buildCardEffectInstruction(ctx, 'description', 'pt') ?? '',
    //     en: buildCardEffectInstruction(ctx, 'description', 'en') ?? '',
    //   },
    // },
    PROCESSING_SYSTEM_HEALTH: {
      title: {
        pt: buildSystemHealthChangeInstruction(ctx, 'title', 'pt') ?? '',
        en: buildSystemHealthChangeInstruction(ctx, 'title', 'en') ?? '',
      },
      description: {
        pt: buildSystemHealthChangeInstruction(ctx, 'description', 'pt') ?? '',
        en: buildSystemHealthChangeInstruction(ctx, 'description', 'en') ?? '',
      },
    },
    END_ROUND: {
      title: {
        pt: 'Final da Rodada',
        en: 'End of Round',
      },
      description: {
        pt: `A Rodada terminou!\n\nLembre-se: Componentes de Requisições saturados propagam Bugs para os seus filhos no final da rodada. Se o Sistema atingir o Estado Crítico, a Rodada de Crise começará imediatamente!\n\nPrepare-se para a próxima rodada!`,
        en: `The Round has ended!\n\nRemember: Saturated Request Components propagate Bugs to Child Components at the end of the round. If the System reaches the Critical State, the Crisis Round will start immediately!\n\nGet ready for the next round!`,
      },
    },
    END_GAME: {
      title: {
        pt: (ctx) => `${ctx.endGame === 'WIN' ? 'Vitória!' : 'Game Over'}`,
        en: (ctx) => `${ctx.endGame === 'WIN' ? 'Victory!' : 'Game Over'}`,
      },
      description: {
        pt: (ctx) =>
          `${ctx.endGame === 'WIN' ? 'Parabéns, o time conseguiu testar todos os componentes do Sistema!' : 'Infelizmente, o Sistema está Paralisado! O Time perdeu o jogo. Tente novamente!'}`,
        en: (ctx) =>
          `${ctx.endGame === 'WIN' ? 'Congratulations, the team managed to test all the System components!' : 'Unfortunately, the System is paralyzed! The Team lost the game. Try again!'}`,
      },
    },
  };
};
