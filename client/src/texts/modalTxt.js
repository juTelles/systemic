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
      en: 'Game Starting Soon'
    },
    content: {
      pt: 'Preparando ambiente...',
      en: 'Setting up the environment...'
    }
  },
  GAME_WIN: {
    title: {
      pt: 'Parabéns, vocês venceram!',
      en: 'Congratulations, you won!'
    },
    content: {
      pt: 'Vocês conseguiram salvar o sistema e impedir a crise. Ótimo trabalho em equipe!',
      en: 'You managed to save the system and prevent the crisis. Great teamwork!'
    }
  },
  GAME_OVER: {
    title: {
      pt: 'Infelizmente, vocês perderam.',
      en: 'Unfortunately, you lost.'
    },
    content: {
      pt: 'O sistema entrou em colapso e a crise se instaurou. Não desanimem, aprendam com os erros e tentem novamente!',
      en: 'The system collapsed and the crisis unfolded. Don\'t be discouraged, learn from the mistakes and try again!'
    }
  },
}