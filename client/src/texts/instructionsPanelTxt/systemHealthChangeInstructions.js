export function buildSystemHealthChangeInstruction(
  {
    systemHealthChangeKey,
    bugSaturationLimit,
    playerPerCrisisRound,
    playersCount,
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
}) || '';
}

const systemHealthChangeInstructionsTxt = {
  HEALTHY_TO_WARNING: {
    title: {
      pt: `Atenção: Sistema em estado de Alerta`,
      en: `Alert: System in Warning State`,
    },
    description: {
      pt: ({bugSaturationLimit}) =>
        `O sistema entrou em estado de alerta: Algum dos Componentes de Requisições ultrapassou o limite de Saturação de ${bugSaturationLimit} Bugs.\nSe até o final dessa rodada o Time não conseguir sair do Estado de Alerta componentes de Requisições saturados irão propagar bugs para todos os seus componentes filhos imediatos!\n\nCuidado, se todos os componentes de requisição ficarem saturados o Sistema entra em Estado de Crise, iniciando uma rodada de crise e colocando o Time em risco de derrota!`,
      en: ({bugSaturationLimit}) =>
        `The system has entered a warning state: Some of the Request Components have exceeded the Saturation limit of ${bugSaturationLimit} Bugs.\nIf by the end of this round the Team cannot get out of the Warning State, saturated Request components will propagate bugs to all their immediate child components!\n\nBe careful, if all request components become saturated the System enters a Crisis State, starting a crisis round and putting the Team at risk of defeat!`,
    },
  },
  HEALTHY_TO_CRITICAL: {
    title: {
      pt: `Perigo: Sistema em estado Crítico! Rodada de Crise será iniciada`,
      en: `Danger: System in Critical State! Crisis Round will be initiated`,
    },
    description: {
      pt: ({bugSaturationLimit}) =>
        `O sistema entrou em Estado de Crítico! Todos os Componentes de Requisições ultrapassarão o limite de Saturação de ${bugSaturationLimit} Bugs.\n Essa rodada será finalizada imediatamenta e uma rodada de crise será iniciada, o Time tem até o final da Rodada de Crise para recuperar o sistema, caso contrário, o jogo termina com a derrota do Time!\n\n Lembre-se: Componentes de Requisições saturados propagam bugs para seus componentes filhos imediatos! `,
      en: ({bugSaturationLimit}) =>
        `The system has entered a Critical State! All Request Components will exceed the Saturation limit of ${bugSaturationLimit} Bugs.\n This round will end immediately and a crisis round will begin, the Team has until the end of the Crisis Round to recover the system, otherwise, the game ends with the Team's defeat!\n\n Remember: Saturated Request components propagate bugs to their immediate child components!`,
    },
  },
  WARNING_TO_HEALTHY: {
    title: {
      pt: `O sistema voltou a um estado saudável!`,
      en: `The system has returned to a healthy state!`,
    },
    description: {
      pt: `Parabens! O time consegui normalizar o Sistema a um Estado Saudável!`,
      en: `Congratulations! The team managed to normalize the System to a Healthy State!`,
    },
  },
  WARNING_TO_CRITICAL: {
    title: {
      pt: `Perigo: Sistema em estado Crítico! Rodada de Crise será iniciada`,
      en: `Danger: System in Critical State! Crisis Round will be initiated`,
    },
    description: {
      pt: ({bugSaturationLimit}) =>
        `O sistema entrou em Estado de Crítico! Todos os Componentes de Requisições ultrapassarão o limite de Saturação de ${bugSaturationLimit} Bugs.\n Essa rodada será finalizada imediatamenta e uma rodada de crise será iniciada, o Time tem até o final da Rodada de Crise para recuperar o sistema, caso contrário, o jogo termina com a derrota do Time!\n\n Lembre-se: Componentes de Requisições saturados propagam bugs para seus componentes filhos imediatos! `,
      en: ({bugSaturationLimit}) =>
        `The system has entered a Critical State! All Request Components will exceed the Saturation limit of ${bugSaturationLimit} Bugs.\n This round will end immediately and a crisis round will begin, the Team has until the end of the Crisis Round to recover the system, otherwise, the game ends with the Team's defeat!\n\n Remember: Saturated Request components propagate bugs to their immediate child components!`,
    },
  },
  CRITICAL_TO_HEALTHY: {
    title: {
      pt: `O sistema voltou a um estado saudável!`,
      en: `The system has returned to a healthy state!`,
    },
    description: {
      pt: `Parabens! O time consegui normalizar o Sistema a um Estado Saudável!\nSe o sistem não voltar ao Estado Crítico até o final da partida, o time vai sobreviver a Rodade de Crise!`,
      en: `Congratulations! The team managed to normalize the System to a Healthy State!\nIf the system does not return to the Critical State until the end of the game, the team will survive the Crisis Round!`,
    },
  },
  CRITICAL_TO_WARNING: {
    title: {
      pt: `O sistema em estado de Alerta`,
      en: `System in Warning State`,
    },
    description: {
      pt: `Parabens! O Time conseguil reverter o Estado Crítico para um Estado de Alerta.\nSe o sistema não voltar ao Estado Crítico até o final da partida, o Time vai sobreviver a Rodade de Crise!`,
      en: `Congratulations! The Team managed to revert the Critical State to a Warning State.\nIf the system does not return to the Critical State until the end of the game, the team will survive the Crisis Round!`,
    },
  },
  CRISIS_ROUND_START: {
    title: {
      pt: `Rodada de Crise Iniciada!`,
      en: `Crisis Round Started!`,
    },
    description: {
      pt: ({playerPerCrisisRound, playersCount}) =>
        `A Rodada de Crise foi iniciada!\n O Time ganha ${playerPerCrisisRound * playersCount}, pontos adicionais a serem divididos igualmente entre os seus membros, além dos pontos de Rodada habituais, mas tem até o final dessa rodada para recuperar o sistema, caso contrário, o jogo termina com a derrota do Time!\n\nLembre-se: Componentes de Requisições saturados propagam bugs para seus componentes filhos imediatos!`,
      en: ({playerPerCrisisRound, playersCount}) =>
        `The Crisis Round has started!\n The Team gains ${playerPerCrisisRound * playersCount} additional points to be divided equally among its members, but has until the end of this round to recover the system, otherwise, the game ends with the Team's defeat!\n\nRemember: Saturated Request components propagate bugs to their immediate child components!`,
    },
  },
};
