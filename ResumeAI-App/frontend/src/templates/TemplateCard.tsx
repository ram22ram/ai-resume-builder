import React from 'react';
import { Lock } from 'lucide-react';
import { ResumeTemplate } from './templates.config';
import './templates.css';

interface Props {
  template: ResumeTemplate;
  isLoggedIn: boolean;
  isPremiumUser: boolean;
  onSelect: (template: ResumeTemplate) => void;
  onUpgrade: () => void;
}

const TemplateCard: React.FC<Props> = ({
  template,
  isLoggedIn,
  isPremiumUser,
  onSelect,
  onUpgrade,
}) => {
  const locked = template.isPremium && !isPremiumUser;

  const handleClick = () => {
    if (locked) {
      onUpgrade();
    } else {
      onSelect(template);
    }
  };

  return (
    <div className={`template-card ${locked ? 'locked' : ''}`} onClick={handleClick}>
      <div className="preview">
        <img src={template.previewImage} alt={template.name} />
        {template.isPremium && (
          <span className="badge premium">Premium</span>
        )}
        {locked && (
          <div className="lock-overlay">
            <Lock size={28} />
            <p>Upgrade to unlock</p>
          </div>
        )}
      </div>

      <div className="info">
        <h3>{template.name}</h3>
        <p>{template.description}</p>

        <div className="meta">
          <span>{template.category.toUpperCase()}</span>
          <span>{template.layout}</span>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
