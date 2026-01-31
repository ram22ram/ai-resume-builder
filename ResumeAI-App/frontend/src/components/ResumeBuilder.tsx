import { useState, useRef, useEffect } from 'react';
import Layout from './Layout';
import ResumeStartModal from './ResumeStartModal';
import { BuilderLayout } from './BuilderLayout';
import { useResumeIngestionController } from './ResumeIngestionController';
import { useResumeContext } from '../context/ResumeContext';
import { useResumeHandlers } from '../utils/useResumeHandlers';
import { useAuth } from '../context/AuthContext';

const ResumeBuilder = () => {
  const [modalMode, setModalMode] = useState<'select' | 'confirm' | 'error'>('select');
  const [showModal, setShowModal] = useState(true);
  const { resumeData, updateResumeData } = useResumeContext(); // ✅ Context update function yahan hai
  const { user } = useAuth();
  const previewRef = useRef<HTMLDivElement>(null);

  const { startUploadFlow, startAI, isParsing } = useResumeIngestionController();

  // Standard handlers (PDF generation, Step navigation etc.)
  const baseHandlers = useResumeHandlers({
    previewRef,
    user,
  });

  // ✅ PHASE 2: Live Sync Handlers (Overwrite baseHandlers logic for real-time feel)
  const handlers = {
    ...baseHandlers,
    
    // Typing sync logic: GoResume style
    handleUpdateSection: (sectionType: string, newContent: any) => {
      if (!resumeData) return;
      
      const updatedSections = resumeData.sections.map((section) => {
        if (section.type === sectionType) {
          return { ...section, content: newContent };
        }
        return section;
      });

      // Directly update the context so preview reflects changes instantly
      updateResumeData({ ...resumeData, sections: updatedSections });
    },

    // Handles lists like Experience & Education auto-populated by AI
    handleListChange: (sectionType: string, id: string, field: string, value: any) => {
      if (!resumeData) return;
      const section = resumeData.sections.find(s => s.type === sectionType);
      if (!section) return;

      const newContent = section.content.map((item: any) => 
        item.id === id ? { ...item, [field]: value } : item
      );
      
      handlers.handleUpdateSection(sectionType, newContent);
    }
  };

  const handleSelect = async (origin: 'upload' | 'linkedin' | 'ai', file?: File) => {
    try {
      if (origin === 'upload' && file) {
        const success = await startUploadFlow(file);
        if (success) setShowModal(false); 
        return;
      }
      if (origin === 'ai') {
        startAI();
        setShowModal(false); 
      }
    } catch {
      setModalMode('error');
    }
  };

  return (
    <Layout>
      <ResumeStartModal
        open={showModal}
        mode={modalMode}
        isParsing={isParsing}
        onSelect={handleSelect}
        onConfirmOverwrite={() => {
          setModalMode('select');
          setShowModal(false);
        }}
        onCancelOverwrite={() => {
          setModalMode('select');
          setShowModal(false);
        }}
      />

      {/* ✅ Layout renders when data exists and parsing is done */}
      {resumeData && !isParsing && (
        <BuilderLayout
          resumeData={resumeData}
          handlers={handlers as any}
          previewRef={previewRef}
          previewMode="desktop"
          setPreviewMode={() => {}}
          isMobile={false}
          isTablet={false}
          breakpoint="lg"
        />
      )}
    </Layout>
  );
};

export default ResumeBuilder;