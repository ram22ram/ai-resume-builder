import React from 'react';
import { Lock } from 'lucide-react';
import { ResumeTemplate } from './templates.config';
import MiniResumePreview from '../components/MiniResumePreview';
import './templates.css';

interface Props {
  template: ResumeTemplate;
  isPremiumUser: boolean;
  onSelect: (template: ResumeTemplate) => void;
  onUpgrade: () => void;
}

const TemplateCard: React.FC<Props> = ({
  template,
  isPremiumUser,
  onSelect,
  onUpgrade,
}) => {
  const locked = template.isPremium && !isPremiumUser;

  return (
    <div className="template-card-container">
      <div className={`template-card-visual ${locked ? 'locked' : ''}`}>
        <div className="a4-aspect-ratio">
           {/* Scale the A4 preview (595px width) to fit container. 
               CSS will handle container width, transform needs to match ratio 
               (e.g. if card is 280px wide, scale is ~0.47)
           */}
           <div className="preview-scaler">
               <MiniResumePreview 
                  layout={template.layout} 
                  templateId={template.id} 
                />
           </div>
        </div>
        
        {/* Badges */}
        <div className="card-badges">
            {template.isPremium ? (
                <span className="badge premium"><Lock size={12} style={{marginRight:4}}/> Premium</span>
            ) : (
                <span className="badge free">Free</span>
            )}
            <span className="badge category">{template.category}</span>
        </div>

        {/* Hover Overlay */}
        <div className="card-overlay">
            {locked ? (
                <div className="lock-content">
                    <Lock size={32} />
                    <p>Upgrade to Unlock</p>
                    <button className="btn-upgrade" onClick={(e) => { e.stopPropagation(); onUpgrade(); }}>
                        Upgrade Pro
                    </button>
                </div>
            ) : (
                <div className="action-buttons">
                    <button className="btn-use" onClick={() => onSelect(template)}>
                        Use Template
                    </button>
                </div>
            )}
        </div>
      </div>

      <div className="template-info">
        <h3>{template.name}</h3>
        <p>{template.description}</p>
      </div>
    </div>
  );
};

export default TemplateCard;
