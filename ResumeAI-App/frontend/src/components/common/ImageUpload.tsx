import React, { useState, useCallback } from 'react';
import { Box, Button, Slider, Typography, Dialog, DialogContent, DialogActions, Avatar } from '@mui/material';
import getCroppedImg from '../../utils/cropImage';
import { Upload, Trash2 } from 'lucide-react';
import Cropper, { Area } from 'react-easy-crop';

interface ImageUploadProps {
  image: string | null;
  onImageSave: (image: string) => void;
  onImageRemove: () => void;
}

const ImageUpload = ({ 
  image, 
  onImageSave, 
  onImageRemove 
}: ImageUploadProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area,) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        if (typeof reader.result === 'string') {
  setTempImage(reader.result);
}
        setModalOpen(true);
      });
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      if (!tempImage || !croppedAreaPixels) {
        // no image or crop area to process
        return;
      }
      const result = await getCroppedImg(tempImage, croppedAreaPixels);
      const croppedImage = result as unknown as string;
      if (croppedImage) {
        onImageSave(croppedImage);
      }
      setModalOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
      <Avatar 
        src={image || undefined} 
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
              onChange={(_, zoom) => setZoom(zoom as number)}
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