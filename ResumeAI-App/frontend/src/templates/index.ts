import ClassicTemplate from './layouts/ClassicTemplate';
import MinimalTemplate from './layouts/MinimalTemplate';
import ModernTemplate from './layouts/ModernTemplate';
import CorporateTemplate from './layouts/CorporateTemplate';
import SimpleTemplate from './layouts/SimpleTemplate';

import PremiumElegant from './layouts/PremiumElegant';
import PremiumExecutive from './layouts/PremiumExecutive';
import PremiumTech from './layouts/PremiumTech';

export const TEMPLATE_MAP: Record<
    string,
    {
        label: string;
        premium: boolean;
        component: React.FC<any>;
    }
> = {
    // ✅ FREE (10 total – sample 5)
    classic: {
        label: 'Classic',
        premium: false,
        component: ClassicTemplate,
    },
    minimal: {
        label: 'Minimal',
        premium: false,
        component: MinimalTemplate,
    },
    modern: {
        label: 'Modern',
        premium: false,
        component: ModernTemplate,
    },
    corporate: {
        label: 'Corporate',
        premium: false,
        component: CorporateTemplate,
    },
    simple: {
        label: 'Simple',
        premium: false,
        component: SimpleTemplate,
    },

    // 🔒 PREMIUM (15 total – sample 3)
    premium_elegant: {
        label: 'Elegant Pro',
        premium: true,
        component: PremiumElegant,
    },
    premium_exec: {
        label: 'Executive Pro',
        premium: true,
        component: PremiumExecutive,
    },
    premium_tech: {
        label: 'Tech Pro',
        premium: true,
        component: PremiumTech,
    },
};
