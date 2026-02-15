// Create: src/components/LoadingSkeleton.tsx
import { Box, Skeleton, Stack, Paper } from '@mui/material';

export const LoadingSkeleton = () => {
  return (
    <Box sx={{ p: 3 }}>
      {/* Header Skeleton */}
      <Stack spacing={2} sx={{ mb: 4 }}>
        <Skeleton variant="rectangular" width={200} height={40} sx={{ borderRadius: 2 }} />
        <Skeleton variant="text" width={300} height={24} />
      </Stack>

      {/* Form Skeleton */}
      <Paper sx={{ p: 3, bgcolor: 'rgba(30, 41, 59, 0.4)', borderRadius: 3 }}>
        <Stack spacing={3}>
          {/* Row 1 */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 2 }} />
            <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 2 }} />
          </Box>
          
          {/* Row 2 */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 2 }} />
            <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 2 }} />
          </Box>
          
          {/* Text Area */}
          <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 2 }} />
          
          {/* Buttons */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: 2 }} />
            <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: 2 }} />
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export const SectionLoadingSkeleton = ({ count = 1 }: { count?: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Paper key={index} sx={{ p: 3, mb: 3, bgcolor: 'rgba(30, 41, 59, 0.4)', borderRadius: 3 }}>
          <Stack spacing={2}>
            {/* Section Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Skeleton variant="text" width={120} height={32} />
              <Skeleton variant="circular" width={32} height={32} />
            </Box>
            
            {/* Content */}
            <Skeleton variant="rectangular" height={100} sx={{ borderRadius: 2 }} />
            
            {/* AI Button */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Skeleton variant="rectangular" width={120} height={32} sx={{ borderRadius: 2 }} />
            </Box>
          </Stack>
        </Paper>
      ))}
    </>
  );
};

export const PreviewLoadingSkeleton = () => {
  return (
    <Paper sx={{ 
      p: 4, 
      bgcolor: 'white',
      borderRadius: '12px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 3
    }}>
      {/* Header */}
      <Stack spacing={1}>
        <Skeleton variant="text" width="60%" height={40} />
        <Skeleton variant="text" width="40%" height={24} />
      </Stack>
      
      {/* Contact Info */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Skeleton variant="rectangular" width={150} height={20} />
        <Skeleton variant="rectangular" width={120} height={20} />
        <Skeleton variant="rectangular" width={180} height={20} />
      </Box>
      
      {/* Sections */}
      <Stack spacing={3}>
        {[1, 2, 3].map((i) => (
          <Box key={i}>
            <Skeleton variant="text" width="30%" height={28} sx={{ mb: 1 }} />
            <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 1 }} />
          </Box>
        ))}
      </Stack>
    </Paper>
  );
};