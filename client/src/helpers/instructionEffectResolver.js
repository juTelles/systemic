import { STEP_NAME } from '../../../shared/src/definitions/steps.js';

const SHINE_RULES = [
  {
    when: ({ isReadOnly, decisionUIId, step }) =>
      !isReadOnly &&
      decisionUIId === null &&
      step !== STEP_NAME.AWAIT_CARD_DRAW,
    key: 'cianoShine',
  },
  {
    when: ({ stepInstructionKey }) =>
      stepInstructionKey === 'WARNING_TO_CRITICAL' ||
      stepInstructionKey === 'HEALTHY_TO_CRITICAL',
    key: 'redShine',
  },
  {
    when: ({ stepInstructionKey }) =>
      stepInstructionKey === 'HEALTHY_TO_WARNING' ||
      stepInstructionKey === 'CRITICAL_TO_WARNING',
    key: 'yellowShine',
  },
  {
    when: ({ stepInstructionKey }) =>
      stepInstructionKey === 'WARNING_TO_HEALTHY' ||
      stepInstructionKey === 'CRITICAL_TO_HEALTHY',
    key: 'greenShine',
  },
  {
    when: ({ step }) =>
      step === STEP_NAME.GAME_START ||
      step === STEP_NAME.ROUND_START ||
      step === STEP_NAME.END_ROUND,
    key: 'whiteShine',
  },
  {
    when: () => true,
    key: '',
  },
];

export function resolveInstructionEffect(
  step,
  isReadOnly,
  decisionUIId,
  stepInstructionKey,
) {
  const input = { step, isReadOnly, decisionUIId, stepInstructionKey };
  return SHINE_RULES.find((rule) => rule.when(input)).key;
}
