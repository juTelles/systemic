export function buildSystemHealthChangeInstruction(
  {
    systemHealthChangeKey,
    bugSaturationLimit,
    playerPerCrisisRound,
    playersCount,
    isCrisisRound,
  },
  textType,
  lang = 'pt',
) {

  const instruction = systemHealthChangeInstructionsTxt[systemHealthChangeKey];
  if (!instruction) {
    return '';
  }
  if (textType === 'title') {
    return instruction.title[lang];
  }
  return instruction.description[lang]({
    bugSaturationLimit,
    playerPerCrisisRound,
    playersCount,
    isCrisisRound,
}) || '';
}

export const systemHealthChangeInstructionsTxt = {
  HEALTHY_TO_WARNING: {
    title: {
      pt: `Sistema em Estado de ALERTA!`,
      en: `System in WARNING State!`,
    },
    description: {
      pt: ({ bugSaturationLimit, isCrisisRound }) =>
        `ALERTA: Um dos Componentes de Requisições ultrapassou o limite de saturação (${bugSaturationLimit} Bugs).\nSe não sair de ALERTA até o final da rodada, Componentes de Requisições saturados propagarão Bugs aos seus Componentes filhos.\n\nCUIDADO: Se todos os Componentes de Requisições ficarem saturados, entrará em Estado CRÍTICO,${!isCrisisRound ? ' iniciando uma Rodada de Crise imediatamente e colocando o Time em risco de derrota' : ''}.\n\nAcompanhe o Estado atual do Sistema no painel de Estados ao lado.`,
      en: ({ bugSaturationLimit, isCrisisRound }) =>
        `WARNING: One of the Request Components has exceeded the saturation limit (${bugSaturationLimit} Bugs).\nIf the System does not get out of the WARNING State by the end of the round, Saturated Request Components will propagate Bugs to their Child Components.\n\nBE CAREFUL: If all Request Components become saturated, will enter CRITICAL state,${!isCrisisRound ? ' immediately starting a Crisis Round and putting the Team at risk of defeat' : ''}.\n\nKeep track of the current State of the System in the Status panel on the side.`,
      },
  },
  HEALTHY_TO_CRITICAL: {
    title: {
      pt: `Estado CRÍTICO!!! Rodada de Crise será iniciada`,
      en: `CRITICAL State! Crisis Round will be initiated`,
    },
    description: {
      pt: ({ bugSaturationLimit, isCrisisRound }) =>
        `PERIGO: Todos os Componentes de Requisições ultrapassaram o limite de saturação (${bugSaturationLimit} Bugs).\n\n${!isCrisisRound? `Esta rodada será encerrada imediatamente, e uma Rodada de Crise será iniciada. O Time tem até o final dela` : `CUIDADO: Time tem até o final da Rodada de Crise`} para recuperar o Sistema; caso contrário, perde o jogo.\n\nLembre-se: Componentes de Requisições saturados propagam Bugs aos Componentes filhos imediatos ao final da rodada.\n\nAcompanhe o Estado atual do Sistema no painel de Estados ao lado.`,
      en: ({ bugSaturationLimit, isCrisisRound }) =>
        `DANGER: All Request Components have exceeded the saturation limit (${bugSaturationLimit} Bugs).\n\n${!isCrisisRound? `This round will end immediately, and a Crisis Round will begin. The Team has until the end of it` : `BE CAREFUL: The Team has until the end of the Crisis Round`} to recover the System; otherwise, they lose the game.\n\nRemember: Saturated Request Components propagate Bugs to their immediate child Components at the end of the round.\n\nKeep track of the current State of the System in the Status panel on the side.`,
      },
  },
  WARNING_TO_HEALTHY: {
    title: {
      pt: `Sistema em Estado SAUDÁVEL!`,
      en: `System in HEALTHY State!`,
    },
    description: {
      pt: `Parabéns! O Time conseguiu restaurar o Sistema ao Estado SAUDÁVEL!`,
      en: `Congratulations! The Team managed to restore the System to a HEALTHY State!`,
    },
  },
  WARNING_TO_CRITICAL: {
    title: {
      pt: `Sistema em Estado CRÍTICO!`,
      en: `System in CRITICAL State!`,
    },
    description: {
      pt: ({ bugSaturationLimit, isCrisisRound }) =>
        `PERIGO: Todos os Componentes de Requisições ultrapassaram o limite de saturação (${bugSaturationLimit} Bugs).\n\n${!isCrisisRound? `Esta rodada será encerrada imediatamente, e uma Rodada de Crise será iniciada. O Time tem até o final dela` : `CUIDADO: Time tem até o final da Rodada de Crise`} para recuperar o Sistema; caso contrário, perde o jogo.\n\nLembre-se: Componentes de Requisições saturados propagam Bugs aos Componentes filhos imediatos ao final da rodada.\n\nAcompanhe o Estado atual do Sistema no painel de Estados ao lado.`,
      en: ({ bugSaturationLimit, isCrisisRound }) =>
        `DANGER: All Request Components have exceeded the saturation limit (${bugSaturationLimit} Bugs).\n\n${isCrisisRound? `This round will end immediately, and a Crisis Round will begin. The Team has until the end of it` : `BE CAREFUL: The Team has until the end of the Crisis Round`} to recover the System; otherwise, they lose the game.\n\nRemember: Saturated Request Components propagate Bugs to their immediate child Components at the end of the round.\n\nKeep track of the current State of the System in the Status panel on the side.`,
    },
  },
  CRITICAL_TO_HEALTHY: {
    title: {
      pt: `Sistema em Estado SAUDÁVEL!`,
      en: `System in HEALTHY State!`,
    },
    description: {
      pt: `Parabéns! O Time conseguiu restaurar o Sistema ao Estado SAUDÁVEL!\n\nSe não voltar a CRÍTICO até o final da partida, o Time vai sobreviver à Rodada de Crise!`,
      en: `Congratulations! The Team managed to restore the System to a HEALTHY State!\n\nIf it does not return to CRITICAL by the end of the game, the Team will survive the Crisis Round!`,
    },
  },
  CRITICAL_TO_WARNING: {
    title: {
      pt: `Sistema em Estado de ALERTA!`,
      en: `System in WARNING State!`,
    },
    description: {
      pt: `Parabéns! O Time conseguiu reverter o Estado CRÍTICO.\n\nSe não voltar a CRÍTICO até o final da partida, o Time vai sobreviver à Rodada de Crise!`,
      en: `Congratulations! The Team managed to reverse the CRITICAL State.\n\nIf it does not return to CRITICAL by the end of the game, the Team will survive the Crisis Round!`,
    },
  },
};