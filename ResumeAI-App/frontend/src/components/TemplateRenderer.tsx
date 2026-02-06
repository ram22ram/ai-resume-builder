import React from 'react';

// FREE BASE TEMPLATES
import ClassicTemplate from '../templates/layouts/ClassicTemplate';
import CorporateTemplate from '../templates/layouts/CorporateTemplate';
import MinimalTemplate from '../templates/layouts/MinimalTemplate';
import ModernTemplate from '../templates/layouts/ModernTemplate';
import SimpleTemplate from '../templates/layouts/SimpleTemplate';

// PREMIUM BASE TEMPLATES
import PremiumElegant from '../templates/layouts/PremiumElegant';
import PremiumExecutive from '../templates/layouts/PremiumExecutive';
import PremiumTech from '../templates/layouts/PremiumTech';

interface Props {
  template: string;
  data: any;
}

const TemplateRenderer: React.FC<Props> = ({ template, data }) => {
  switch (template) {
    // ===== FREE =====
    case 'simple_clean':
      return <SimpleTemplate data={data} />;

    case 'student_basic':
      return <MinimalTemplate data={data} />;

    case 'tech_starter':
      return <ModernTemplate data={data} />;

    case 'nontech_classic':
      return <ClassicTemplate data={data} />;

    case 'basic_sidebar':
      return <CorporateTemplate data={data} />;

    // ===== PREMIUM =====
    case 'tech_pro':
      return <PremiumTech data={data} />;

    case 'exec_elite':
      return <PremiumExecutive data={data} />;

    case 'uiux_designer':
      return <PremiumElegant data={data} />;

    default:
      return <SimpleTemplate data={data} />;
  }
};

export default TemplateRenderer;
