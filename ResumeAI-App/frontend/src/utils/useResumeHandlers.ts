import { useMemo, useCallback, useState } from 'react';
import html2pdf from 'html2pdf.js';
import { useResumeContext } from '../context/ResumeContext';
import { useStepNavigation } from './useStepNavigation';
import { useAI } from './useAI';
import { useAutoSave } from './useAutoSave';
import { convertToLegacyFormat } from './resume.helpers';
import {
  ResumeData,
  ResumeHandlers,
  ResumeSection,
} from '../resume.types';

interface Props {
  previewRef: React.RefObject<HTMLDivElement>;
  user: any;
}

export const useResumeHandlers = ({
  previewRef,
  user,
}: Props): ResumeHandlers => {
  const { resumeData, ingestResumeData } = useResumeContext();
  const [loadingAi, setLoadingAi] = useState(false);

  const sectionsCount = resumeData?.sections?.length ?? 0;

  const {
    activeStep,
    setActiveStep,
    handleBack,
    handleNext,
  } = useStepNavigation(sectionsCount);

  const { handleAiAction: aiAction } = useAI();

  // ✅ Proper autosave hook
  useAutoSave(resumeData, user);

  /* ------------------ helpers ------------------ */

  const updateResume = useCallback(
    (updater: (prev: ResumeData) => ResumeData) => {
      if (!resumeData) return;
      ingestResumeData(updater(resumeData), 'ai');
    },
    [resumeData, ingestResumeData]
  );

  const getSection = useCallback(
    (type: string): ResumeSection | null => {
      return resumeData?.sections?.find(s => s.type === type) ?? null;
    },
    [resumeData]
  );

const noopVoid = () => {};
const noopString = (): string | null => null;
const noopAsync = async (): Promise<string> => '';

  /* ------------------ HANDLERS ------------------ */

  const handlers: ResumeHandlers = useMemo(
    () => ({
      /* ===== NAVIGATION ===== */
      activeStep,
      setActiveStep,
      handleBack,
      handleNext,

      /* ===== CORE ===== */
      updateSectionContent: (id, content) => {
        if (!resumeData) return;
        updateResume(prev => ({
          ...prev,
          sections: prev.sections.map(s =>
            s.id === id ? { ...s, content } : s
          ),
        }));
      },

      addCustomSection: () => {
        if (!resumeData) return;
        updateResume(prev => ({
          ...prev,
          sections: [
            ...prev.sections,
            {
              id: `custom_${Date.now()}`,
              type: 'custom',
              title: 'New Section',
              content: '',
              isVisible: true,
            },
          ],
        }));
      },

      deleteSection: (id) => {
        if (!resumeData) return;
        updateResume(prev => ({
          ...prev,
          sections: prev.sections.filter(s => s.id !== id),
        }));
      },

     /* ===== PERSONAL ===== */
      handlePersonalInfoChange: noopVoid,
      handleImageUpload: noopVoid,
      handleSummaryChange: noopVoid,

      /* ===== LIST ===== */
      handleListChange: noopVoid,
      addListItem: noopVoid,
      deleteListItem: noopVoid,
      handleDateChange: noopVoid,
      handleExperienceCheckboxChange: noopVoid,
      handleListReorder: noopVoid,

      /* ===== SKILLS ===== */
      handleAddSkill: noopVoid,
      handleDeleteSkill: noopVoid,

      /* ===== THEME ===== */
      handleColorChange: noopVoid,
      handleFontChange: noopVoid,
      handleDensityChange: noopVoid,
      handlePhotoModeChange: noopVoid,
      handleTemplateChange: noopVoid,

      /* ===== VISIBILITY ===== */
      handleSectionToggle: noopVoid,
      updateCustomSectionTitle: noopVoid,

      /* ===== SAVE ===== */
      handleSave: noopVoid,

      /* ===== SHARE (⚠️ ONLY THESE RETURN STRING) ===== */
      generateMagicLink: noopString,
      generateShareLink: noopString,


      /* ===== AI ===== */
      loadingAi,
      handleAiAction: async (actionType, sectionType) => {
        if (!resumeData || !sectionType) return '';
        setLoadingAi(true);
        try {
          const res = await aiAction(actionType, sectionType, resumeData);
          setLoadingAi(false);
          return res;
        } catch {
          setLoadingAi(false);
          return 'AI failed';
        }
      },

      /* ===== EXPORT ===== */
      generatePDF: () => {
        if (!previewRef.current) return;
        html2pdf().from(previewRef.current).save();
      },

      /* ===== LEGACY ===== */
      legacyData: resumeData ? convertToLegacyFormat(resumeData) : null,
    }),
    [
      resumeData,
      activeStep,
      loadingAi,
      updateResume,
      aiAction,
      previewRef,
    ]
  );

  return handlers;
};
