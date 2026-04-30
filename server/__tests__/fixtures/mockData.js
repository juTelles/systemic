// __tests__/fixtures/mockData.js
// Dados mock compartilhados entre testes

export const mockPlayer = {
  id: 'player-1',
  nickname: 'TestPlayer',
  handPoints: 0,
  bankPoints: 0,
  status: 'WAITING',
};

export const mockComponent = {
  id: 'comp-1',
  bugAmount: 0,
  saturationLimit: 5,
  hasTests: false,
  namePT: 'Componente Teste',
};

export const mockStateComponents = {
  nodes: {
    'comp-1': { ...mockComponent, id: 'comp-1', namePT: 'Local' },
    'comp-2': { id: 'comp-2', bugAmount: 1, saturationLimit: 5, hasTests: false, namePT: 'Estrutural' },
  },
  allIds: ['comp-1', 'comp-2'],
};

export const mockGameConfig = {
  maxPlayers: 4,
  minPlayers: 2,
  taskPoints: {
    maxPlayerPoints: 8,
    maxDonationPerPlayer: 2,
    playerPerRound: 3,
  },
};
