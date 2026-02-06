import React, { useEffect } from 'react';
import TemplateGallery from '../templates/TemplateGallery';
import Layout from '../components/Layout';
import { Box } from '@mui/material';

const TemplateSelectPage: React.FC = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Layout>
            <Box sx={{ minHeight: '80vh', bgcolor: '#020617', pb: 10 }}>
                <TemplateGallery />
            </Box>
        </Layout>
    );
};

export default TemplateSelectPage;
