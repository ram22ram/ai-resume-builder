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

const TemplateRenderer = ({ template, data }: any) => {
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

    case 'general_modern':
      return <ModernTemplate data={data} />;

    case 'basic_sidebar':
      return <CorporateTemplate data={data} />;

    case 'finance_simple':
      return <ClassicTemplate data={data} />;

    case 'hr_profile':
      return <ModernTemplate data={data} />;

    case 'teacher_basic':
      return <SimpleTemplate data={data} />;

    case 'operations_basic':
      return <CorporateTemplate data={data} />;

    // ===== PREMIUM =====
    case 'tech_pro':
      return <PremiumTech data={data} />;

    case 'faang_ready':
    case 'exec_elite':
    case 'product_manager':
    case 'finance_exec':
    case 'consultant_pro':
    case 'hr_leader':
    case 'international_cv':
      return <PremiumExecutive data={data} />;

    case 'data_scientist':
    case 'ai_ml_engineer':
      return <PremiumTech data={data} />;

    case 'uiux_designer':
    case 'marketing_growth':
    case 'startup_founder':
    case 'sales_closer':
      return <PremiumElegant data={data} />;

    case 'legal_professional':
      return <ClassicTemplate data={data} />;

    default:
      return <SimpleTemplate data={data} />;
  }
};

export default TemplateRenderer;
