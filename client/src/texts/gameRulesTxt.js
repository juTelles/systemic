import { buildGameConfig } from '../../../shared/src/definitions/gameConfigOptions.js';

export function getGameObjectRulesTxt(playerCount, difficulty) {
  const gameConfig = buildGameConfig({ playerCount, difficulty });
  const { bugSaturationLimit, taskPoints } = gameConfig;

  const playerPerRound = taskPoints.playerPerRound;
  const maxHoldPerPlayer = taskPoints.maxHoldPerPlayer;
  const maxDonationPerPlayer = taskPoints.maxDonationPerPlayer;
  const maxPlayerPoints = taskPoints.maxPlayerPoints;
  const playerPerCrisisRound = taskPoints.playerPerCrisisRound;

  return gameRulesTxt(
    playerPerRound,
    maxHoldPerPlayer,
    bugSaturationLimit,
    maxDonationPerPlayer,
    maxPlayerPoints,
    playerPerCrisisRound,
  );
}

export const gameRulesTxt = (
  playerPerRound,
  maxHoldPerPlayer,
  bugSaturationLimit,
  maxDonationPerPlayer,
  maxPlayerPoints,
  playerPerCrisisRound,
) => {
  return {
    OVERVIEW: {
      id: 'OVERVIEW',
      title: {
        pt: `Visão Geral`,
        en: `Overview`,
      },
      description: {
        pt: `Systemic é um jogo cooperativo em que o Time precisa manter um Sistema funcionando enquanto desenvolve Testes em todos os Componentes.\n\nBugs afetam Componentes, acumulam-se e podem se propagar para outras partes do Sistema.\n\nO objetivo do Time é implementar Testes em todos os Componentes antes que o Sistema entre em Paralisação.`,
        en: `Systemic is a cooperative game where the Team must keep a System running while developing Tests for all Components.\n\nBugs affect Components, accumulate, and may propagate across the System.\n\nThe goal is to add Tests to all Components before the System enters Paralysis.`,
      },
    },

    SYSTEM_COMPONENTS: {
      id: 'SYSTEM_COMPONENTS',
      title: {
        pt: `Componentes do Sistema`,
        en: `System Components`,
      },
      description: {
        pt: `Componentes representam as partes do Sistema que precisam ser mantidas e testadas.\n\nO Sistema possui três níveis:\n\nCOMPONENTES LOCAIS:\nPartes internas dos Componentes Estruturais, como Interface, Lógica, Dados e Integrações.\n\nCOMPONENTES ESTRUTURAIS:\nFormam a base do Sistema: Front-end, Back-end e Banco de Dados.\n\nCOMPONENTES DE REQUISIÇÕES:\nConectam os Componentes Estruturais e representam a comunicação entre eles. Se falharem, o Sistema fica em risco.`,
        en: `Components represent the parts of the System that must be maintained and tested.\n\nThe System has three levels:\n\nLOCAL COMPONENTS:\nInternal parts of Structural Components, such as Interface, Logic, Data, and Integrations.\n\nSTRUCTURAL COMPONENTS:\nForm the base of the System: Front-end, Back-end, and Database.\n\nREQUEST COMPONENTS:\nConnect Structural Components and represent communication between them. If they fail, the System is at risk.`,
      },
    },

    CARDS: {
      id: 'CARDS',
      title: {
        pt: `Cartas`,
        en: `Cards`,
      },
      description: {
        pt: `Cartas representam eventos que afetam o Sistema.\n\nCARTAS DE BUG:\nAdicionam Bugs ao Componente indicado.\nComponentes testados absorvem o Bug da primeira carta de Bug comprada, Bugs absorvidos estão listados no painel de Bugs absorvidos.\n\nCARTAS DE EVENTO:\nRepresentam eventos inesperados que aumentam a pressão sobre o Sistema.\nBugs de Cartas de Evento não são absorvidos por Testes.\n\nCARTAS DE PONTOS:\nConcedem Pontos de Tarefa adicionais.\nOs Pontos são aplicados respeitando o limite total de Pontos do jogador.`,
        en: `Cards represent events that affect the System.\n\nBUG CARDS:\nAdd Bugs to the indicated Component.\nTested Components absorb the Bug from the first drawn Bug card, absorbed Bugs are listed in the absorbed Bugs panel.\n\nEVENT CARDS:\nRepresent unexpected events that increase pressure on the System.\nBugs from Event Cards are not absorbed by Tests.\n\nPOINT CARDS:\nGrant additional Task Points.\nPoints are applied respecting the player's total Point limit.`,
      },
    },

    BUGS_AND_PROPAGATION: {
      id: 'BUGS_AND_PROPAGATION',
      title: {
        pt: `Bugs e Propagação`,
        en: `Bugs and Propagation`,
      },
      description: {
        pt: `Bugs representam falhas acumuladas nos Componentes.\n\nBUG LOCAL:\nAfeta um Componente Local. Ao atingir o limite de saturação de ${bugSaturationLimit} Bugs, propaga 1 Bug para o Componente Estrutural pai e o Componente Local é zerado.\n\nBUG ESTRUTURAL:\nAfeta Front-end, Back-end ou Banco de Dados. Ao atingir o limite de saturação de ${bugSaturationLimit} Bugs, propaga 1 Bug para os Componentes de Requisições conectados e o Componente Estrutural é zerado.\n\nBUG DE REQUISIÇÕES:\nAfeta os Componentes de Requisições. Ao atingir o limite de saturação de ${bugSaturationLimit} Bugs, o Componente entra em propagação e o Sistema entra em ALERTA. Enquanto continuar saturado, ele propaga Bugs para seus Componentes filhos ao final da rodada.`,
        en: `Bugs represent accumulated failures in Components.\n\nLOCAL BUG:\nAffects a Local Component. Upon reaching the saturation limit of ${bugSaturationLimit} Bugs, it propagates 1 Bug to the parent Structural Component and the Local Component is reset.\n\nSTRUCTURAL BUG:\nAffects Front-end, Back-end, or Database. Upon reaching the saturation limit of ${bugSaturationLimit} Bugs, it propagates 1 Bug to connected Request Components and the Structural Component is reset.\n\nREQUEST BUG:\nAffects Request Components. Upon reaching the saturation limit of ${bugSaturationLimit} Bugs, the Component enters propagation and the System enters WARNING. While it remains saturated, it propagates Bugs to its child Components at the end of the round.`,
      },
    },

    SYSTEM_STATES: {
      id: 'SYSTEM_STATES',
      title: {
        pt: `Estados do Sistema`,
        en: `System States`,
      },
      description: {
        pt: `SAUDÁVEL:\nNenhum Componente de Requisições está saturado.\n\nALERTA:\nPelo menos um Componente de Requisições está saturado.\n\nCRÍTICO:\nTodos os Componentes de Requisições estão saturados. Quando isso acontece, a rodada atual é interrompida e uma Rodada de Crise começa.`,
        en: `HEALTHY:\nNo Request Component is saturated.\n\nWARNING:\nAt least one Request Component is saturated.\n\nCRITICAL:\nAll Request Components are saturated. When this happens, the current round is interrupted and a Crisis Round begins.`,
      },
    },

    TASK_POINTS: {
      id: 'TASK_POINTS',
      title: {
        pt: `Pontos de Tarefa`,
        en: `Task Points`,
      },
      description: {
        pt: `Pontos de Tarefa são usados para executar Decisões Técnicas.\n\nTIPOS DE PONTOS:\n- Pontos na mão: recebidos na rodada e usados no turno atual.\n- Pontos no banco: Pontos guardados para uso futuro.\n\nREGRAS:\n- Pontos da rodada entram na mão.\n- Pontos não de mão não usados ao final da etapa de decisão são descartados.\n- É possível guardar até ${maxHoldPerPlayer} Pontos da mão no banco por turno.\n- É possível doar até ${maxDonationPerPlayer} Pontos por turno (mão ou banco) - Pontos doados vão para o banco do jogador escolhido.\n- Cada jogador pode ter no máximo ${maxPlayerPoints} Pontos no total (mão + banco).\n\nUSO DOS PONTOS:\n- Custos de Decisões são pagos primeiro com Pontos da mão.\n- Se necessário, Pontos do banco são usados para completar o custo.`,
        en: `Task Points are used to perform Technical Decisions.\n\nPOINT TYPES:\n- Hand Points: received at the start of the round and used during the current turn.\n- Bank Points: Points held for future use.\n\nRULES:\n- Round Points enter the hand.\n- Non-hand Points not used by the end of the decision phase are discarded.\n- You can hold up to ${maxHoldPerPlayer} hand Points in the bank per turn.\n- You can donate up to ${maxDonationPerPlayer} Points per turn (hand or bank) - Donated Points go to the chosen player's bank.\n- Each player can have a maximum of ${maxPlayerPoints} total Points (hand + bank).\n\nPOINT USAGE:\n- Decision costs are paid first with hand Points.\n- If necessary, bank Points are used to cover the remaining cost.`,
      },
    },

    DECISIONS: {
      id: 'DECISIONS',
      title: {
        pt: `Decisões Técnicas`,
        en: `Technical Decisions`,
      },
      description: {
        pt: `Durante o turno, o jogador pode executar Decisões Técnicas.\n\nRESOLVER BUGS:\nRemove Bugs de um Componente.\nO custo depende do tipo de Bug e é reduzido se o Componente possuir Testes.\n\nDESENVOLVER TESTES:\nAdiciona cobertura de Testes a um Componente.\nSó é possível desenvolver Testes em Componentes sem Bugs e que tenham todos os seus components filhos já testados.\n\nGUARDAR PONTOS:\nMove Pontos da mão para o banco, respeitando o limite do turno e o limite total de Pontos do jogador.\n\nDOAR PONTOS:\nTransfere Pontos para o banco de outro jogador, respeitando o limite de doação do turno e o limite total de Pontos do jogador que recebe.`,
        en: `During the turn, the player can perform Technical Decisions.\n\nFIX BUGS:\nRemove Bugs from a Component.\nThe cost depends on the Bug type and may be reduced if the Component has Tests.\n\nDEVELOP TESTS:\nAdd Test coverage to a Component.\nTests can only be developed in Components without Bugs and that meet the coverage conditions.\n\nHOLD POINTS:\nMove Points from hand to the bank, respecting the turn limit and the player's total Point limit.\n\nDONATE POINTS:\nTransfer bank Points to another player, respecting the turn donation limit and the receiving player's total Point limit.`,
      },
    },

    TESTS: {
      id: 'TESTS',
      title: {
        pt: `Testes e Bugs Absorvidos`,
        en: `Tests and Absorbed Bugs`,
      },
      description: {
        pt: `Testes reduzem o custo de resolver Bugs e ajudam a proteger Componentes.\n\nREGRAS:\n- Um Componente só pode receber Testes se não possuir Bugs.\n Um componente só pode receber Testes se todos os seus Componentes filhos já tiverem Testes. Por exemplo: Requisições de Aplicação só pode receber Testes se Backend e Frontend já possuirem Testes, e Frontend só pode receber Testes se Interação e Interface já possuirem Testes.\n\nEFEITOS:\n- O custo de resolução de Bugs é reduzido pela metade.\n- A primeira Carta de Bug do Componente tem seu efeito absorvido.\n- O Bug só é aplicado se uma segunda Carta de Bug do mesmo Componente for comprada.\n- Bugs gerados por Cartas de Evento não são absorvidos por Testes.\n\nBugs Absorvidos ficam registrados no painel abaixo do deque.`,
        en: `Tests reduce the cost of fixing Bugs and help protect Components.\n\nRULES:\n- A Component can only receive Tests if it has no Bugs.\nA Component can only receive Tests if all its child Components already have Tests. For example: Application Requests can only receive Tests if Backend and Frontend already have Tests, and Frontend can only receive Tests if Interaction and Interface already have Tests.\n\nEFFECTS:\n- The cost of fixing Bugs is halved.\n- The first Bug Card for the Component has its effect absorbed.\n- The Bug is only applied if a second Bug Card for the same Component is drawn.\n- Bugs from Event Cards are not absorbed by Tests.\n\nAbsorbed Bugs are recorded in the panel below the deck`,
      },
    },

    WIN_CONDITION: {
      id: 'WIN_CONDITION',
      title: {
        pt: `Condição de Vitória`,
        en: `Win Condition`,
      },
      description: {
        pt: `O Time vence quando todos os Componentes Locais, Estruturais e de Requisições possuem Testes.\n\nA vitória pode ocorrer mesmo que ainda existam Bugs no Sistema.`,
        en: `The Team wins when all Local, Structural, and Request Components have Tests.\n\nVictory can happen even if there are still Bugs in the System.`,
      },
    },

    LOSE_CONDITION: {
      id: 'LOSE_CONDITION',
      title: {
        pt: `Condição de Derrota`,
        en: `Lose Condition`,
      },
      description: {
        pt: `O Time perde se o Sistema permanecer em Estado CRÍTICO até o final da Rodada de Crise.\n\nNesse caso, o Sistema entra em Paralisação.`,
        en: `The Team loses if the System remains in a CRITICAL State until the end of the Crisis Round.\n\nIn this case, the System enters Paralysis.`,
      },
    },

    ROUND_FLOW: {
      id: 'ROUND_FLOW',
      title: {
        pt: `Fluxo da Rodada`,
        en: `Round Flow`,
      },
      description: {
        pt: `1. O Time recebe Pontos de Tarefa.\n2. Cada participante joga seu turno.\n3. Durante o turno, pode resolver Bugs, desenvolver Testes, guardar Pontos e/ou doar Pontos.\n4. O jogador pode clicar em PULAR para encerrar suas decisões.\n5. O jogador compra uma carta no deque.\n6. O jogador aplica o efeito da carta comprada.\n7. O jogador compra cartas adicionais conforme a configuração escolhida.\n8. Após todos jogarem, Bugs de Requisições saturados propagam.\n9. O Estado do Sistema é atualizado.\n10. Uma nova rodada começa.`,
        en: `1. The Team receives Task Points.\n2. Each participant takes their turn.\n3. During the turn, they can fix Bugs, develop Tests, hold Points, and/or donate Points.\n4. The player can click SKIP to end their decisions.\n5. The player draws a card from the deck.\n6. The player applies the drawn card effect.\n7. The player draws additional cards according to the selected configuration.\n8. After everyone has played, saturated Request Bugs propagate.\n9. The System State is updated.\n10. A new round begins.`,
      },
    },

    CRISIS_ROUND: {
      id: 'CRISIS_ROUND',
      title: {
        pt: `Rodada de Crise`,
        en: `Crisis Round`,
      },
      description: {
        pt: `A Rodada de Crise começa quando o Sistema entra em Estado CRÍTICO.\n\nQuando isso acontece:\n- a rodada atual é encerrada;\n- cada participante recebe ${playerPerCrisisRound} Pontos de Tarefa adicionais;\n- o Time tem até o final da Rodada de Crise para tirar o Sistema do Estado CRÍTICO.\n\nSe conseguir, o jogo continua normalmente.\nSe não conseguir, o Sistema entra em Paralisação e o Time perde.\n\nSe a Rodada de Crise começar no meio de uma rodada, os Pontos dos jogadores que ainda não jogaram são guardados automaticamente, respeitando o limite de guarda do turno e o limite máximo de Pontos por jogador.`,
        en: `The Crisis Round begins when the System enters a CRITICAL State.\n\nWhen this happens:\n- the current round ends;\n- each participant receives ${playerPerCrisisRound} additional Task Points;\n- the Team has until the end of the Crisis Round to remove the System from the CRITICAL State.\n\nIf they succeed, the game continues normally.\nIf they fail, the System enters Paralysis and the Team loses.\n\nIf the Crisis Round starts in the middle of a round, Points from players who have not played yet are automatically held, respecting the turn hold limit and the player's maximum Point limit.`,
      },
    },
  };
};
