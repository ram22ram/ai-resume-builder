import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Stack,
  Divider,
  Button
} from '@mui/material';
import { useResumeContext } from '../context/ResumeContext';
import { useResumeHandlers } from '../utils/useResumeHandlers';

/**
 * BuilderPanel
 * - Pure editor
 * - No props
 * - ResumeContext + Handlers driven
 */
const BuilderPanel = () => {
  const { resumeData } = useResumeContext();
  const handlers = useResumeHandlers();

  if (!resumeData) return null;

  /** helpers */
  const getSection = (type: string) =>
    resumeData.sections.find(s => s.type === type);

  const personal = getSection('personal')?.content || {};
  const summary = getSection('summary')?.content || '';

  return (
    <Box sx={{ pb: 6 }}>
      {/* ================= PERSONAL INFO ================= */}
      <Typography variant="h6" fontWeight={700} mb={2}>
        Personal Information
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Full Name"
          value={personal.fullName || ''}
          onChange={(e) =>
            handlers.updateSection('personal', {
              ...personal,
              fullName: e.target.value
            })
          }
          fullWidth
        />

        <TextField
          label="Job Title"
          value={personal.jobTitle || ''}
          onChange={(e) =>
            handlers.updateSection('personal', {
              ...personal,
              jobTitle: e.target.value
            })
          }
          fullWidth
        />

        <TextField
          label="Email"
          value={personal.email || ''}
          onChange={(e) =>
            handlers.updateSection('personal', {
              ...personal,
              email: e.target.value
            })
          }
          fullWidth
        />

        <TextField
          label="Phone"
          value={personal.phone || ''}
          onChange={(e) =>
            handlers.updateSection('personal', {
              ...personal,
              phone: e.target.value
            })
          }
          fullWidth
        />

        <TextField
          label="Address"
          value={personal.address || ''}
          onChange={(e) =>
            handlers.updateSection('personal', {
              ...personal,
              address: e.target.value
            })
          }
          fullWidth
        />
      </Stack>

      <Divider sx={{ my: 4 }} />

      {/* ================= SUMMARY ================= */}
      <Typography variant="h6" fontWeight={700} mb={2}>
        Professional Summary
      </Typography>

      <TextField
        multiline
        minRows={4}
        placeholder="Write a short professional summary..."
        value={summary}
        onChange={(e) =>
          handlers.updateSection('summary', e.target.value)
        }
        fullWidth
      />

      <Divider sx={{ my: 4 }} />

      {/* ================= EXPERIENCE ================= */}
      <Typography variant="h6" fontWeight={700} mb={2}>
        Experience
      </Typography>

      {(getSection('experience')?.content || []).map((exp: any) => (
        <Box key={exp.id} mb={3}>
          <Stack spacing={1}>
            <TextField
              label="Position"
              value={exp.position || exp.title || ''}
              onChange={(e) =>
                handlers.updateListItem(
                  'experience',
                  exp.id,
                  'position',
                  e.target.value
                )
              }
              fullWidth
            />

            <TextField
              label="Company"
              value={exp.company || ''}
              onChange={(e) =>
                handlers.updateListItem(
                  'experience',
                  exp.id,
                  'company',
                  e.target.value
                )
              }
              fullWidth
            />

            <TextField
              label="Description"
              multiline
              minRows={3}
              value={exp.description || ''}
              onChange={(e) =>
                handlers.updateListItem(
                  'experience',
                  exp.id,
                  'description',
                  e.target.value
                )
              }
              fullWidth
            />
          </Stack>

          <Divider sx={{ my: 2 }} />
        </Box>
      ))}

      <Button
        variant="outlined"
        onClick={() =>
          handlers.updateSection('experience', [
            ...(getSection('experience')?.content || []),
            {
              id: `exp_${Date.now()}`,
              position: '',
              company: '',
              description: ''
            }
          ])
        }
      >
        + Add Experience
      </Button>

      <Divider sx={{ my: 4 }} />

      {/* ================= SKILLS ================= */}
      <Typography variant="h6" fontWeight={700} mb={2}>
        Skills
      </Typography>

      <TextField
        placeholder="Comma separated skills (React, Node, SQL)"
        value={(getSection('skills')?.content || []).join(', ')}
        onChange={(e) =>
          handlers.updateSection(
            'skills',
            e.target.value
              .split(',')
              .map(s => s.trim())
              .filter(Boolean)
          )
        }
        fullWidth
      />
    </Box>
  );
};

export default BuilderPanel;
