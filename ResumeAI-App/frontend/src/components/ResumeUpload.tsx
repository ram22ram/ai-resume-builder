import React, { useState } from 'react';
import { Box, Button, CircularProgress, Typography, Alert } from '@mui/material';
import { UploadFile } from '@mui/icons-material';
import axios from 'axios';
import { useResume } from '../context/ResumeContext';
import { useNavigate } from 'react-router-dom';

const ResumeUpload: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { dispatch } = useResume();
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            setError('Please upload a PDF file.');
            return;
        }

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post(`${API_URL}/resume/parse`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.data.success && res.data.data) {
                const parsed = res.data.data;
                const fullName = parsed.name || parsed.full_name || '';
                const [firstName, ...lastNameParts] = fullName.split(' ');
                const lastName = lastNameParts.join(' ');

                // 1. Update Personal Details
                dispatch({ 
                    type: 'UPDATE_ITEM', 
                    payload: {
                        sectionId: 'personal',
                        itemId: '1',
                        data: {
                            firstName: firstName || '',
                            lastName: lastName || '',
                            email: parsed.email || '',
                            phone: parsed.phone || '',
                            jobTitle: parsed.job_title || parsed.position || '',
                            // city/country if available
                        }
                    }
                });

                // 2. Update Summary
                if (parsed.summary) {
                     dispatch({ 
                        type: 'UPDATE_ITEM', 
                        payload: { 
                            sectionId: 'summary', 
                            itemId: '1',
                            data: { description: parsed.summary } 
                        } 
                    });
                }
                
                // TODO: Handle Experience/Education arrays if AI extracts them in future.
                // Current AI prompt only asks for simple fields.

                navigate('/builder');
            } else {
                setError('Failed to parse resume. Please try again.');
            }
        } catch (err) {
            console.error('Upload Error:', err);
            setError('Server error during upload.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ textAlign: 'center', my: 4 }}>
            <input
                accept="application/pdf"
                style={{ display: 'none' }}
                id="resume-upload-file"
                type="file"
                onChange={handleFileUpload}
                disabled={loading}
            />
            <label htmlFor="resume-upload-file">
                <Button
                    variant="outlined"
                    component="span"
                    startIcon={loading ? <CircularProgress size={20} /> : <UploadFile />}
                    disabled={loading}
                    sx={{ px: 4, py: 1.5, borderRadius: 2, textTransform: 'none', fontSize: '1rem' }}
                >
                    {loading ? 'Analyzing Resume...' : 'Upload Existing Resume'}
                </Button>
            </label>
            {error && <Alert severity="error" sx={{ mt: 2, maxWidth: 400, mx: 'auto' }}>{error}</Alert>}
            <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
                We'll extract your details to speed up creation.
            </Typography>
        </Box>
    );
};

export default ResumeUpload;
