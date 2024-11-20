import React from 'react';
import { Typography, Paper, Icon, Modal, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface ErrorViewProps {
    errorMessage: string;
    open: boolean;
    onClose: () => void;
}

export const ErrorView: React.FC<ErrorViewProps> = ({ errorMessage, open, onClose }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="error-view-title"
            aria-describedby="error-view-description"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: 400,
                    backgroundColor: '#fdecea',
                    borderRadius: 2,
                    position: 'relative'
                }}
            >
                <Icon color="error" sx={{ fontSize: 48, mb: 2 }}>
                    <ErrorOutlineIcon />
                </Icon>
                <Typography id="error-view-title" variant="h6" color="error" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Oops!
                </Typography>
                <Typography id="error-view-description" variant="body1" color="text.secondary">
                    {errorMessage}
                </Typography>
                <Button
                    variant="contained"
                    color="error"
                    onClick={onClose}
                    sx={{ mt: 3 }}
                >
                    Close
                </Button>
            </Paper>
        </Modal>
    );
};

