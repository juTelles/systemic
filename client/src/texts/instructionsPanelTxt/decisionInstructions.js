import { decisions } from '../../../../shared/src/definitions/decisions.js';

export function buildDecisionInstruction(
  { instructionKey, playerNickname, gameConfig },
  textType,
  lang = 'pt',
) {

  if (!instructionKey) return null;
  const instruction = decisionInstructionTxt[instructionKey];
  if (!instruction) return null;

  if (textType === 'title') {
    return instruction.title?.[lang] ?? null;
  }

  if (textType === 'description') {
    const testedKey = decisions.forUI[instructionKey]?.testedDecisionId ?? 0;
    const regularKey = decisions.forUI[instructionKey]?.regularDecisionId ?? 0;
    const regularCost = gameConfig?.decisionCosts?.[regularKey] ?? 0;
    const testedCost = gameConfig?.decisionCosts?.[testedKey] ?? 0;

    const donateLimit = gameConfig?.taskPoints?.maxDonationPerPlayer ?? 0;
    const holdLimit = gameConfig?.taskPoints?.maxHoldPerPlayer ?? 0;
    const maxPlayerPoints = gameConfig?.taskPoints?.maxPlayerPoints ?? 0;

    return (
      instruction.description?.[lang]?.({
        playerNickname,
        maxPlayerPoints,
        holdLimit,
        donateLimit,
        regularCost,
        testedCost,
      }) ?? null
    );
  }

  return null;
}

export const decisionInstructionTxt = {
  LOCAL: {
    title: {
      pt: `Resolver Bug local`,
      en: `Fix Local Bug`,
    },
    description: {
      pt: ({ playerNickname, regularCost, testedCost }) =>
        `${playerNickname}, escolha no tabuleiro qual Componente Local deseja tratar.\n\nResolver Bug em Componente Local custa: ${regularCost} ponto(s).\nResolver Bug em Componente Local com Testes custa: ${testedCost} ponto(s).\n\nComponentes desabilitados não podem ser afetados pela decisão selecionada.`,
      en: ({ playerNickname, regularCost, testedCost }) =>
        `${playerNickname}, choose on the board which Local Component you want to fix.\n\nFixing a Bug in a Local Component costs: ${regularCost} point(s).\nFixing a Bug in a Local Component with Tests costs: ${testedCost} point(s).\n\nDisabled components cannot be affected by the selected decision.`,
    },
  },
  STRUCTURAL: {
    title: {
      pt: `Resolver Bug Estrutural`,
      en: `Fix Structural Bug`,
    },
    description: {
      pt: ({ playerNickname, regularCost, testedCost }) =>
        `${playerNickname}, escolha no tabuleiro qual Componente Estrutural deseja tratar.\n\nResolver Bug em Componente Estrutural custa: ${regularCost} ponto(s).\nResolver Bug em Componente Estrutural com Testes custa: ${testedCost} ponto(s).\n\nComponentes desabilitados não podem ser afetados pela decisão selecionada.`,
      en: ({ playerNickname, regularCost, testedCost }) =>
        `${playerNickname}, choose on the board which Structural Component you want to fix.\n\nFixing a Bug in a Structural Component costs: ${regularCost} point(s).\nFixing a Bug in a Structural Component with Tests costs: ${testedCost} point(s).\n\nDisabled components cannot be affected by the selected decision.`,
    },
  },
  REQUESTS: {
    title: {
      pt: `Resolver Bug de Requisições`,
      en: `Fix Request Bug`,
    },
    description: {
      pt: ({ playerNickname, regularCost, testedCost }) =>
        `${playerNickname}, escolha no tabuleiro qual Componente de Requisições deseja tratar.\n\nResolver Bug em Componente de Requisições custa: ${regularCost} ponto(s).\nResolver Bug em Componente de Requisições com Testes custa: ${testedCost} ponto(s).\n\nComponentes desabilitados não podem ser afetados pela decisão selecionada.`,
      en: ({ playerNickname, regularCost, testedCost }) =>
        `${playerNickname}, choose on the board which Request Component you want to fix.\n\nFixing a Bug in a Request Component costs: ${regularCost} point(s).\nFixing a Bug in a Request Component with Tests costs: ${testedCost} point(s).\n\nDisabled components cannot be affected by the selected decision.`,
    },
  },
  DONATE_POINTS: {
    title: {
      pt: `Doar Pontos`,
      en: `Donate Points`,
    },
    description: {
      pt: ({ playerNickname, maxPlayerPoints, holdLimit, donateLimit }) =>
        `${playerNickname}, no painel de Pontos ao lado, escolha o membro do Time para doar, informe quantos pontos e clique no botão de confirmação.\n\nLembre-se: Você pode guardar até ${holdLimit} pontos e doar até ${donateLimit} pontos por turno.\nCada membro do Time pode ter no máximo ${maxPlayerPoints} pontos no total (mão + banco).\nPontos não utilizados serão descartados no final da etapa de decisões.`,
      en: ({ playerNickname, maxPlayerPoints, holdLimit, donateLimit }) =>
        `${playerNickname}, in the Points panel on the side, choose the Team member to donate to, enter how many points and click the check to confirm.\n\nRemember: You can save up to ${holdLimit} points and donate up to ${donateLimit} points per turn.\nEach Team member can have a maximum of ${maxPlayerPoints} points in total (hand + bank).\nPoints that are not used will be discarded at the end of the decision phase.`,
    },
  },
  HOLD_POINTS: {
    title: {
      pt: `Guardar Pontos`,
      en: `Save Points`,
    },
    description: {
      pt: ({ playerNickname, maxPlayerPoints, holdLimit, donateLimit }) =>
        `${playerNickname}, no painel de Pontos ao lado, informe quantos pontos deseja guardar e clique no botão de confirmação.\n\nLembre-se: Você pode guardar até ${holdLimit} pontos e doar até ${donateLimit} pontos por turno.\nCada membro do Time pode ter no máximo ${maxPlayerPoints} pontos no total (mão + banco).\nPontos não utilizados serão descartados no final da etapa de decisões.`,
      en: ({ playerNickname, maxPlayerPoints, holdLimit, donateLimit }) =>
        `${playerNickname}, in the Points panel on the side, enter how many points you want to save and click the check to confirm.\n\nRemember: You can save up to ${holdLimit} points and donate up to ${donateLimit} points per turn.\nEach Team member can have a maximum of ${maxPlayerPoints} points in total (hand + bank).\nPoints that are not used will be discarded at the end of the decision phase.`,
    },
  },
  DEVELOP_TESTS: {
    title: {
      pt: `Desenvolver Testes`,
      en: `Develop Tests`,
    },
    description: {
      pt: ({ playerNickname, regularCost }) =>
        `${playerNickname}, escolha no tabuleiro em qual Componente deseja desenvolver Testes.\n\nDesenvolver Testes, em qualquer Componente, custa: ${regularCost} ponto(s).\n\nLembre-se: Testes só podem ser desenvolvidos em Componentes sem Bugs e cujos subcomponentes já estejam testados.\nPor exemplo: Front-end só pode receber Testes se Interface e Interação já possuírem.\nComponentes desabilitados não podem ser escolhidos porque ainda não atendem as condições.`,
      en: ({ playerNickname, regularCost }) =>
        `${playerNickname}, choose on the board which Component you want to develop Tests for.\n\nDeveloping Tests, in any Component, costs: ${regularCost} point(s).\n\nRemember: Tests can only be developed in Components without Bugs and whose subcomponents are already tested.\nFor example: Front-end can only receive Tests if Interface and Interaction already have them.\nDisabled components cannot be chosen because they do not yet meet the conditions.`,
    },
  },
};
