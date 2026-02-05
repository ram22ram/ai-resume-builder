import { Box, TextField, Typography, Stack } from '@mui/material';
import { useResume } from '../context/ResumeContext';

const ResumeForm = () => {
  const { resume, setResume } = useResume();

  const getSection = (type: string) =>
    resume.sections.find((s) => s.type === type);

  const updateSection = (type: string, content: any) => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.type === type ? { ...s, content } : s
      ),
    }));
  };

  const personal = getSection('personal')?.content || {};
  const summary = getSection('summary')?.content || '';
  const skills = getSection('skills')?.content || [];

  return (
    <Box>
      <Typography variant="h6" mb={2}>
        Resume Details
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Full Name"
          value={personal.fullName || ''}
          onChange={(e) =>
            updateSection('personal', {
              ...personal,
              fullName: e.target.value,
            })
          }
        />

        <TextField
          label="Email"
          value={personal.email || ''}
          onChange={(e) =>
            updateSection('personal', {
              ...personal,
              email: e.target.value,
            })
          }
        />

        <TextField
          label="Phone"
          value={personal.phone || ''}
          onChange={(e) =>
            updateSection('personal', {
              ...personal,
              phone: e.target.value,
            })
          }
        />

        <TextField
          label="Job Title"
          value={personal.jobTitle || ''}
          onChange={(e) =>
            updateSection('personal', {
              ...personal,
              jobTitle: e.target.value,
            })
          }
        />

        <TextField
          label="Professional Summary"
          multiline
          rows={4}
          value={summary}
          onChange={(e) => updateSection('summary', e.target.value)}
        />

        <TextField
          label="Skills (comma separated)"
          value={skills.join(', ')}
          onChange={(e) =>
            updateSection(
              'skills',
              e.target.value.split(',').map((s: string) => s.trim())
            )
          }
        />
      </Stack>
    </Box>
  );
};

export default ResumeForm;
