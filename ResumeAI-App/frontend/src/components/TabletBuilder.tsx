// Create: src/components/TabletBuilder.tsx
import { useState } from 'react';
import { Box, Drawer, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { Menu as MenuIcon, ChevronLeft } from '@mui/icons-material';
import BuilderPanel from './BuilderPanel';
import PreviewPanel from './PreviewPanel';
import { ResumeData, ResumeHandlers } from '../resume.types';

interface TabletBuilderProps {
  resumeData: ResumeData;
  handlers: ResumeHandlers;
  previewRef: React.RefObject<HTMLDivElement>;
  selectedTemplate?: string;
}

const TabletBuilder = ({
  resumeData,
  handlers,
  previewRef,
  selectedTemplate
}: TabletBuilderProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isPortrait = useMediaQuery('(orientation: portrait)');

  return (
    <Box sx={{ 
      width: '100%', 
      height: 'calc(100vh - 120px)',
      display: 'flex',
      flexDirection: isPortrait ? 'column' : 'row',
    }}>
      {/* Builder Panel Drawer (Left) */}
      <Drawer
        variant={isPortrait ? "temporary" : "permanent"}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 400,
            maxWidth: '90vw',
            bgcolor: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRight: '1px solid rgba(255,255,255,0.1)',
            boxSizing: 'border-box',
          },
        }}
      >
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Drawer Header */}
          <Box sx={{ 
            p: 2, 
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: 'white' }}>
                <ChevronLeft />
              </IconButton>
              <Box sx={{ color: 'white', fontWeight: 600, fontSize: '0.875rem' }}>
                Resume Builder
              </Box>
            </Box>
          </Box>
          
          {/* Builder Panel Content */}
          <Box sx={{ flex: 1, overflow: 'hidden' }}>
            <BuilderPanel
              resumeData={resumeData}
              handlers={handlers}
              variant="tablet"
              onClose={() => setDrawerOpen(false)}
            />
          </Box>
        </Box>
      </Drawer>

      {/* Main Content Area */}
      <Box sx={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        ml: !isPortrait && drawerOpen ? '400px' : 0,
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }}>
        {/* Header Bar for Portrait Mode */}
        {isPortrait && (
          <Box sx={{ 
            p: 2, 
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            bgcolor: 'rgba(15, 23, 42, 0.8)',
          }}>
            <Box sx={{ color: 'white', fontWeight: 600, fontSize: '1rem' }}>
              Resume Preview
            </Box>
            <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: 'white' }}>
              <MenuIcon />
            </IconButton>
          </Box>
        )}

        {/* Preview Panel */}
        <Box sx={{ 
          flex: 1,
          p: isPortrait ? 2 : 3,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <PreviewPanel
            resumeData={resumeData}
            handlers={handlers}
            previewRef={previewRef}
            selectedTemplate={selectedTemplate}
            variant="tablet"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TabletBuilder;