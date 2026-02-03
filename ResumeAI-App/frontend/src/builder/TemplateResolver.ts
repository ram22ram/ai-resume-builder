import ModernTemplate from '../templates/layouts/ModernTemplate';
import ClassicTemplate from '../templates/layouts/ClassicTemplate';
import MinimalTemplate from '../templates/layouts/MinimalTemplate';

export const getTemplateComponent = (id: string) => {
    switch (id) {
        case 'classic':
            return ClassicTemplate;
        case 'minimal':
            return MinimalTemplate;
        case 'modern':
        default:
            return ModernTemplate;
    }
};
