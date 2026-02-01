import { useCallback } from 'react';
import { useResumeContext } from '../context/ResumeContext';

export const useResumeHandlers = () => {
  const { resumeData, setResumeData } = useResumeContext();

  const updateSection = useCallback(
    (type: string, content: any) => {
      setResumeData(prev => ({
        ...prev,
        sections: prev.sections.map(sec =>
          sec.type === type ? { ...sec, content } : sec
        ),
      }));
    },
    [setResumeData]
  );

  const updateListItem = (
    type: string,
    id: string,
    field: string,
    value: any
  ) => {
    setResumeData(prev => ({
      ...prev,
      sections: prev.sections.map(sec => {
        if (sec.type !== type || !Array.isArray(sec.content)) return sec;
        return {
          ...sec,
          content: sec.content.map((item: any) =>
            item.id === id ? { ...item, [field]: value } : item
          ),
        };
      }),
    }));
  };

  return {
    resumeData,
    updateSection,
    updateListItem,
  };
};
