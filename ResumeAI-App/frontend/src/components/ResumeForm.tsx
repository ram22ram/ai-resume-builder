import { Box, TextField, Typography, Stack } from '@mui/material';
import { useResume } from '../context/ResumeContext';

const ResumeForm = () => {
  const { resume, setResume } = useResume();

  const updatePersonal = (field: string, value: string) => {
    setResume((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  return (
    <Box>
      <Typography variant="h6" mb={2}>
        Resume Details
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Full Name"
          value={resume.personalInfo.fullName}
          onChange={(e) => updatePersonal('fullName', e.target.value)}
        />

        <TextField
          label="Email"
          value={resume.personalInfo.email}
          onChange={(e) => updatePersonal('email', e.target.value)}
        />

        <TextField
          label="Phone"
          value={resume.personalInfo.phone}
          onChange={(e) => updatePersonal('phone', e.target.value)}
        />

        <TextField
          label="Job Title"
          value={resume.personalInfo.jobTitle}
          onChange={(e) => updatePersonal('jobTitle', e.target.value)}
        />

        <TextField
          label="Professional Summary"
          multiline
          rows={4}
          value={resume.summary}
          onChange={(e) =>
            setResume((prev) => ({ ...prev, summary: e.target.value }))
          }
        />

        <TextField
          label="Skills (comma separated)"
          value={resume.skills.join(', ')}
          onChange={(e) =>
            setResume((prev) => ({
              ...prev,
              skills: e.target.value.split(',').map((s) => s.trim()),
            }))
          }
        />
      </Stack>
    </Box>
  );
};

export default ResumeForm;
