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
    // =================================================================
    // 1. SIMPLE / BASIC (Layout: SimpleTemplate)
    // =================================================================
    case 'fresher_basic':
    case 'fresher_clean':
    case 'fresher_minimal':
    case 'pro_simple':
    case 'free_4':
    case 'simple_clean': // Legacy fallback
      return <SimpleTemplate data={data} />;

    // =================================================================
    // 2. CLASSIC (Layout: ClassicTemplate)
    // =================================================================
    case 'pro_classic_1':
    case 'nontech_classic':
    case 'free_1':
    case 'free_2':
    case 'free_5':
    case 'prem_misc_2':
    case 'prem_misc_3':
    case 'prem_misc_4':
    case 'prem_misc_6':
    case 'prem_misc_8':
      return <ClassicTemplate data={data} />;

    // =================================================================
    // 3. MINIMAL (Layout: MinimalTemplate)
    // =================================================================
    case 'fresher_compact':
    case 'pro_gray':
    case 'prem_mod_1':
    case 'student_basic': // Legacy fallback
      return <MinimalTemplate data={data} />;

    // =================================================================
    // 4. MODERN (Layout: ModernTemplate)
    // =================================================================
    case 'fresher_tech':
    case 'modern_1': // Legacy fallback for existing users
    case 'pro_modern_1':
    case 'modern_teal':
    case 'modern_ruby':
    case 'modern_dark':
    case 'creative_violet':
    case 'prem_mod_3':
    case 'prem_mod_5':
    case 'free_3':
    case 'prem_misc_1':
    case 'prem_misc_7':
    case 'tech_starter': // Legacy fallback
      return <ModernTemplate data={data} />;

    // =================================================================
    // 5. CORPORATE / SIDEBAR (Layout: CorporateTemplate)
    // =================================================================
    case 'basic_sidebar':
    case 'prem_corp_1':
    case 'prem_corp_5':
    case 'prem_misc_10':
    case 'prem_misc_5':
      return <CorporateTemplate data={data} />;

    // =================================================================
    // 6. PREMIUM TECH (Layout: PremiumTech)
    // =================================================================
    case 'fresher_bold':
    case 'prem_mod_2':
    case 'tech_pro': // Legacy fallback
      return <PremiumTech data={data} />;

    // =================================================================
    // 7. EXECUTIVE (Layout: PremiumExecutive)
    // =================================================================
    case 'pro_executive':
    case 'prem_corp_2':
    case 'prem_corp_3':
    case 'prem_corp_4':
    case 'exec_elite': // Legacy fallback
      return <PremiumExecutive data={data} />;

    // =================================================================
    // 8. ELEGANT / CREATIVE (Layout: PremiumElegant)
    // =================================================================
    case 'fresher_academic':
    case 'fresher_creative':
    case 'fresher_soft':
    case 'fresher_elegant':
    case 'creative_orange':
    case 'prem_creat_1':
    case 'prem_creat_2':
    case 'prem_creat_3':
    case 'prem_creat_4':
    case 'prem_creat_5':
    case 'prem_misc_9':
    case 'uiux_designer': // Legacy fallback
      return <PremiumElegant data={data} />;

    default:
      console.warn(`Template ID "${template}" not found in renderer. Falling back to SimpleTemplate.`);
      return <SimpleTemplate data={data} />;
  }
};

export default TemplateRenderer;
