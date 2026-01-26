import { useState, useCallback } from 'react';

export const useStepNavigation = (totalSections: number) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleBack = useCallback(() => {
    setActiveStep((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setActiveStep((prev) => Math.min(totalSections, prev + 1));
  }, [totalSections]);

  const handleStepClick = useCallback((index: number) => {
    setActiveStep(Math.min(index, totalSections));
  }, [totalSections]);

  return {
    activeStep,
    setActiveStep,
    handleBack,
    handleNext,
    handleStepClick,
  };
};