import { useState, useRef } from 'react';
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

  const { resumeData } = useResumeContext();
  const { user } = useAuth();
  const previewRef = useRef<HTMLDivElement>(null);

  const { startUploadFlow, startAI, isParsing } = useResumeIngestionController();

  // ✅ ALWAYS MOUNTED — NEVER CONDITIONAL
  const handlers = useResumeHandlers({
    previewRef,
    user,
  });

  const handleSelect = async (origin: 'upload' | 'linkedin' | 'ai', file?: File) => {
    try {
      if (origin === 'upload' && file) {
        await startUploadFlow(file);
      }
      if (origin === 'linkedin') {
        // LinkedIn import isn't provided by the ingestion controller; show an error to the user.
        setModalMode('error');
        return;
      }
      if (origin === 'ai') {
        startAI();
      }
      // setShowModal(false);
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

      {resumeData && !isParsing && (
        <BuilderLayout
          resumeData={resumeData}
          handlers={handlers}
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
