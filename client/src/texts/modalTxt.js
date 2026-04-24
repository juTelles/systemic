export function getModalTxt(key, txtType, lang = 'pt') {
  const txt = modalTxt[key];
  if (!txt) return '';

  const title = txt.title[lang] || txt.title.pt;
  const content = txt.content[lang] || txt.content.pt;

  return txtType === 'title' ? title : content;
}

export const modalTxt = {
  GAME_START: {
    title: {
      pt: 'Iniciando partida',
      en: 'Game Starting Soon',
    },
    content: {
      pt: 'Preparando ambiente...',
      en: 'Setting up the environment...',
    },
  },
  GAME_WIN: {
    title: {
      pt: 'Parabéns, vocês venceram!',
      en: 'Congratulations, you won!',
    },
    content: {
      pt: 'Vocês conseguiram salvar o Sistema e evitar a crise. Excelente trabalho em equipe!',
      en: 'You managed to save the System and prevent the crisis. Excellent teamwork!',
    },
  },
  GAME_OVER: {
    title: {
      pt: 'O Sistema entrou em Paralisação!',
      en: 'The System entered Paralysis!',
    },
    content: {
      pt: 'Infelizmente, o Time não conseguiu recuperar o Sistema a tempo. Reorganizem a estratégia e tentem novamente!',
      en: 'Unfortunately, the Team could not recover the System in time. Regroup your strategy and try again!',
    },
  },
};
