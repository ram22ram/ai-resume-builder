// MobileBuilder.tsx - UPDATE FOR BETTER MOBILE EXPERIENCE
import { useState } from 'react';
import { Box, Tabs, Tab, IconButton, Drawer, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Menu as MenuIcon, Visibility as PreviewIcon, Edit as EditIcon, X } from '@mui/icons-material';
import BuilderPanel from './BuilderPanel';
import PreviewPanel from './PreviewPanel';
import { ResumeData, ResumeHandlers } from '../resume.types';

interface MobileBuilderProps {
  resumeData: ResumeData;
  handlers: ResumeHandlers;
  previewRef: React.RefObject<HTMLDivElement>;
  selectedTemplate?: string;
}

const MobileBuilder = ({
  resumeData,
  handlers,
  previewRef,
  selectedTemplate
}: MobileBuilderProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Mobile Header with Tabs */}
      <Box sx={{ 
        borderBottom: 1, 
        borderColor: 'divider',
        bgcolor: 'background.paper',
        zIndex: 1100,
        flexShrink: 0
      }}>
        <Tabs 
          value={activeTab} 
          onChange={(_, newValue) => setActiveTab(newValue)}
          variant="fullWidth"
          sx={{ 
            minHeight: 48,
            '& .MuiTab-root': { 
              minHeight: 48,
              fontSize: isSmallMobile ? '0.75rem' : '0.875rem',
              py: 0.5
            }
          }}
        >
          <Tab 
            icon={<EditIcon fontSize="small" />} 
            label="Edit" 
            iconPosition="start"
            sx={{ minWidth: 0 }}
          />
          <Tab 
            icon={<PreviewIcon fontSize="small" />} 
            label="Preview" 
            iconPosition="start"
            sx={{ minWidth: 0 }}
          />
          <Tab 
            icon={<MenuIcon fontSize="small" />} 
            label="Menu" 
            iconPosition="start"
            onClick={() => setDrawerOpen(true)}
            sx={{ minWidth: 0 }}
          />
        </Tabs>
      </Box>

      {/* Tab Content Area */}
      <Box sx={{ 
        flex: 1,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {activeTab === 0 ? (
          // Edit Mode
          <Box sx={{ 
            flex: 1,
            overflow: 'hidden',
            display: 'flex'
          }}>
            <BuilderPanel
              resumeData={resumeData}
              handlers={handlers}
              variant="mobile"
              onClose={() => setActiveTab(1)}
            />
          </Box>
        ) : (
          // Preview Mode
          <Box sx={{ 
            flex: 1,
            overflow: 'hidden',
            display: 'flex',
            p: isSmallMobile ? 1 : 2
          }}>
            <PreviewPanel
              resumeData={resumeData}
              handlers={handlers}
              previewRef={previewRef}
              selectedTemplate={selectedTemplate}
              variant="mobile"
            />
          </Box>
        )}
      </Box>

      {/* Navigation Drawer */}
      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            height: '50vh',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            bgcolor: '#0f172a'
          }
        }}
      >
        <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>Quick Actions</Typography>
            <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: 'white' }}>
              <X />
            </IconButton>
          </Box>
          
          <Box sx={{ flex: 1, overflowY: 'auto', color: 'white' }}>
            <Typography variant="body2" sx={{ color: '#94a3b8', mb: 2 }}>
              Swipe between Edit and Preview tabs to build your resume
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2">
                • Use <strong>Edit</strong> tab to add content
              </Typography>
              <Typography variant="body2">
                • Use <strong>Preview</strong> tab to see results
              </Typography>
              <Typography variant="body2">
                • Save regularly with the save icon
              </Typography>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default MobileBuilder;