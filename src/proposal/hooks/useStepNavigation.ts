import { useState, useCallback, useMemo } from 'react';
import { buildSteps } from '../utils/stepConfig';

export function useStepNavigation() {
  const steps = useMemo(() => buildSteps(), []);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;
  const progress = ((currentStepIndex) / (steps.length - 1)) * 100;

  const goToStep = useCallback((index: number) => {
    if (index >= 0 && index < steps.length) {
      setCurrentStepIndex(index);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [steps.length]);

  const goNext = useCallback(() => {
    if (currentStepIndex < steps.length - 1) {
      setCompletedSteps((prev) =>
        prev.includes(currentStepIndex) ? prev : [...prev, currentStepIndex]
      );
      setCurrentStepIndex((i) => i + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStepIndex, steps.length]);

  const goBack = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((i) => i - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStepIndex]);

  const markComplete = useCallback((index: number) => {
    setCompletedSteps((prev) =>
      prev.includes(index) ? prev : [...prev, index]
    );
  }, []);

  return {
    steps,
    currentStep,
    currentStepIndex,
    completedSteps,
    isFirstStep,
    isLastStep,
    progress,
    goToStep,
    goNext,
    goBack,
    markComplete,
  };
}
