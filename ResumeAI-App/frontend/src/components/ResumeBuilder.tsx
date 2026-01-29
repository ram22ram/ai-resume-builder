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

  const handlers = useResumeHandlers({
    previewRef,
    user,
  });

const handleSelect = async (origin: 'upload' | 'linkedin' | 'ai', file?: File) => {
    try {
      if (origin === 'upload' && file) {
        const success = await startUploadFlow(file);
        if (success) setShowModal(false); // ✅ Modal ab band ho jayega
        return;
      }
      if (origin === 'ai') {
        startAI();
        setShowModal(false); // AI mode mein turant band karein
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
        isParsing={isParsing} // Loader isi state se chalta hai
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

      {/* Jab data aa jaye aur parsing ruk jaye tabhi builder dikhao */}
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