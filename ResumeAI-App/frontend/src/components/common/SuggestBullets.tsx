import { useState } from 'react';
import { 
  // FIX 1: 'Box' ko yahaan import list mein add kiya gaya hai
  Box, Button, Menu, MenuItem, CircularProgress, 
  ListItemIcon, ListItemText, Alert 
} from '@mui/material';
import { Sparkles, Brain } from 'lucide-react';

interface SuggestBulletsProps {
  title?: string;
  contextData: unknown;
  onSelectBullet: (bullet: string) => void;
}

const SuggestBullets = ({
  title,
  contextData,
  onSelectBullet,
}: SuggestBulletsProps) => {

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const open = Boolean(anchorEl);

    const handleClick = async (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
    setAnchorEl(event.currentTarget);
    if (suggestions.length > 0) return; // Don't re-fetch

    setLoading(true);
    setError(null);
    
    try {
      // FIX 2: API path ko Netlify functions ke relative path se badal diya gaya hai
      // Purana: '/api/generate-bullets'
      const response = await fetch('/.netlify/functions/generate-bullets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title || 'generic role', // Use title or a fallback
          context: contextData,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to fetch suggestions');
      }

      const data: { bullets?: string[] } = await response.json();
      setSuggestions(data.bullets ?? []);

    } catch (err) {
  if (err instanceof Error) {
    setError(err.message);
  } else {
    setError('Something went wrong');
  }
}finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (bullet: string) => {
    onSelectBullet(bullet);
    handleClose();
  };

  return (
    // Yeh <Box> component ab defined hai
    <Box sx={{ mt: 1 }}>
      <Button
        id="suggest-bullets-button"
        aria-controls={open ? 'suggest-bullets-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        size="small"
        variant="text"
        startIcon={loading ? <CircularProgress size={16} /> : <Sparkles size={16} />}
        disabled={loading}
      >
        Suggest bullet points
      </Button>
      <Menu
        id="suggest-bullets-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'suggest-bullets-button' }}
        PaperProps={{ style: { maxHeight: 300, width: '40ch' } }}
      >
        {loading && <MenuItem disabled><CircularProgress size={20} sx={{ mr: 1 }} />Loading...</MenuItem>}
        {error && <Alert severity="error" sx={{ m: 1 }}>{error}</Alert>}
        
        {!loading && !error && suggestions.length === 0 && (
          <MenuItem disabled>No suggestions found. Try adding a job title.</MenuItem>
        )}

        {suggestions.map((bullet, index) => (
          <MenuItem key={index} onClick={() => handleSelect(bullet)}>
            <ListItemIcon>
              <Brain size={16} />
            </ListItemIcon>
            <ListItemText sx={{ whiteSpace: 'normal' }}>{bullet}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default SuggestBullets;