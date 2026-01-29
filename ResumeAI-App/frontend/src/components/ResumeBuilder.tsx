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
        // ✅ AWAIT lagana zaroori hai taaki parsing khatam hone ka wait kare
        const success = await startUploadFlow(file); 
        if (success) {
          setShowModal(false); // Sirf success hone par hi modal band karo
        }
        return;
      }
      
      if (origin === 'linkedin') {
        setModalMode('error');
        return;
      }
      
      if (origin === 'ai') {
        startAI();
        setShowModal(false); // AI mode mein turant band kar sakte hain
      }
    } catch (err) {
      console.error("Selection Error:", err);
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