import { useRef, useState } from 'react';
import Layout from './Layout';
import { BuilderLayout } from './BuilderLayout';
import { useResumeContext } from '../context/ResumeContext';

const ResumeBuilder = () => {
  const { resumeData } = useResumeContext();
  const previewRef = useRef<HTMLDivElement>(null);
  const [previewMode, setPreviewMode] = useState<'mobile' | 'desktop'>('desktop');

  if (!resumeData) {
    return <Layout><div style={{ padding: 40 }}>Start resume first</div></Layout>;
  }

  return (
    <Layout>
      <BuilderLayout
        resumeData={resumeData}
        previewRef={previewRef}
        previewMode={previewMode}
        setPreviewMode={setPreviewMode}
        isMobile={false}
        isTablet={false}
      />
    </Layout>
  );
};

export default ResumeBuilder;
