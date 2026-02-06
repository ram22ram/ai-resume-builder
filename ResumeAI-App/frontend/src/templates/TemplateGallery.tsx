import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ALL_TEMPLATES, TemplateCategory, ResumeTemplate } from './templates.config';
import TemplateCard from './TemplateCard';
import { useAuth } from '../context/AuthContext';
import './templates.css';



const TemplateGallery: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // 🔐 TEMP: premium flag (later backend se ayega)
  const isPremiumUser = false;

  const [activeCategory, setActiveCategory] = useState<'all' | TemplateCategory>('all');

  const filteredTemplates = useMemo(() => {
    if (activeCategory === 'all') return ALL_TEMPLATES;
    return ALL_TEMPLATES.filter(t => t.category === activeCategory);
  }, [activeCategory]);

  const handleSelectTemplate = (template: ResumeTemplate) => {
    navigate(`/builder?template=${template.id}`);
  };

  const handleUpgrade = () => {
    if (!isAuthenticated) {
      navigate('/'); // ya login modal
    } else {
      alert('Upgrade modal / payment flow next step 🚀');
    }
  };

  return (
    <div className="template-gallery">
      <header>
        <h1>Choose Your Resume Template</h1>
        <p>10 Free • 15 Premium • A4 • ATS-Optimized</p>
      </header>

      {/* FILTER BAR */}
      {/* FILTER BAR - Professional Tabs */}
      <div className="filters-container">
        <div className="filters">
            {[
                { id: 'all', label: 'All Templates' },
                { id: 'fresher', label: 'Students / Freshers' },
                { id: 'tech', label: 'Tech / Developers' },
                { id: 'professional', label: 'Non-Tech / MBA' },
                { id: 'creative', label: 'Creative' },
            ].map(tab => (
            <button
                key={tab.id}
                className={tab.id === activeCategory ? 'active' : ''}
                onClick={() => setActiveCategory(tab.id as any)}
            >
                {tab.label}
            </button>
            ))}
        </div>
      </div>

      {/* GRID */}
      <div className="grid">
        {filteredTemplates.map(template => (
          <TemplateCard
            key={template.id}
            template={template}
            isPremiumUser={isPremiumUser}
            onSelect={handleSelectTemplate}
            onUpgrade={handleUpgrade}
          />
        ))}
      </div>
    </div>
  );
};

export default TemplateGallery;
