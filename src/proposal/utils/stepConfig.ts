import type { Step } from '../types/proposal.types';

export function buildSteps(): Step[] {
  return [
    { id: 'review', label: 'Review' },
    { id: 'package', label: 'Choose Package' },
    { id: 'configure', label: 'Configure' },
    { id: 'payment', label: 'Payment' },
    { id: 'sign', label: 'Sign' },
  ];
}

export function getStepIndex(steps: Step[], stepId: string): number {
  return steps.findIndex((s) => s.id === stepId);
}
