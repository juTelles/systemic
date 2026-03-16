export const cards = {
  EVENT: [{
    id: 'event_hacker_attack',
    titlePT: 'Ataque Hacker',
    descriptionPT: 'O sistema foi atacado por hackers! Todos os componentes do sistema foram afetados por 1 bug cada.',
    effect: 'BUG_COMPONENTS',
    componentsAffected: ['all']
  }, {
    id: 'event_vulnerable_library',
    titlePT: 'Biblioteca Vulnerável',
    effect: 'BUG_COMPONENTS',
    descriptionPT: 'Uma biblioteca que você utiliza foi descoberta como vulnerável! Todos os componentes do Backend foram afetados por 1 bug cada.',
    componentsAffected: ['backend']
  }, {
    id: 'event_remove_test',
    effect: 'REMOVE_TEST_COMPONENTS',
    titlePT: 'Refatoração Necessária',
    descriptionPT: 'O PM mandou refatorar todo o backend, testes no backend precisaram ser refeitos.',
    componentsAffected: ['backend']
}]
};