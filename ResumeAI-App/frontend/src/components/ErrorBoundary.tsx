// Create: src/components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      return this.props.fallback || (
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px',
          p: 3
        }}>
          <Paper sx={{
            p: 4,
            maxWidth: 500,
            textAlign: 'center',
            bgcolor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: 3
          }}>
            <AlertTriangle size={48} color="#ef4444" style={{ marginBottom: 16 }} />
            <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
              Something went wrong
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8', mb: 3 }}>
              {this.state.error?.message || 'An unexpected error occurred'}
            </Typography>
            <Button
              variant="contained"
              startIcon={<RefreshCw size={16} />}
              onClick={this.handleReset}
              sx={{
                bgcolor: '#3b82f6',
                '&:hover': { bgcolor: '#2563eb' }
              }}
            >
              Try Again
            </Button>
            <Typography variant="caption" sx={{ 
              display: 'block', 
              mt: 2, 
              color: '#64748b',
              cursor: 'pointer'
            }} onClick={() => window.location.reload()}>
              Or reload the page
            </Typography>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;