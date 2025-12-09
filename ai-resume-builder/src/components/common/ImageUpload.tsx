import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Box, Button, Slider, Typography, Dialog, DialogContent, DialogActions, Avatar } from '@mui/material';
import getCroppedImg from '../../utils/cropImage';
import { Upload, Trash2 } from 'lucide-react';

const ImageUpload = ({ image, onImageSave, onImageRemove }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [tempImage, setTempImage] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setTempImage(reader.result);
        setModalOpen(true);
      });
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const croppedImage = await getCroppedImg(tempImage, croppedAreaPixels);
      onImageSave(croppedImage);
      setModalOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
      <Avatar 
        src={image} 
        sx={{ width: 80, height: 80, border: '2px solid #e2e8f0' }}
      />
      
      <Box>
        <Button
          variant="outlined"
          component="label"
          startIcon={<Upload size={16} />}
          sx={{ mr: 1, textTransform: 'none' }}
        >
          Upload Photo
          <input type="file" hidden accept="image/*" onChange={handleFileChange} />
        </Button>
        
        {image && (
          <Button 
            color="error" 
            onClick={onImageRemove}
            startIcon={<Trash2 size={16} />}
            sx={{ textTransform: 'none' }}
          >
            Remove
          </Button>
        )}
        <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
          Supported: JPG, PNG (Max 5MB)
        </Typography>
      </Box>

      {/* CROP MODAL */}
      <Dialog open={modalOpen} maxWidth="sm" fullWidth>
        <DialogContent sx={{ height: 400, position: 'relative', bgcolor: '#333' }}>
          {tempImage && (
            <Cropper
              image={tempImage}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          )}
        </DialogContent>
        <Box sx={{ px: 3, py: 2 }}>
            <Typography>Zoom</Typography>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              onChange={(e, zoom) => setZoom(zoom)}
            />
        </Box>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save Photo</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ImageUpload;