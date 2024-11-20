// EmptyState.tsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu"; 

interface EmptyStateProps {
  message: string;
  onAction?: () => void;
  actionLabel?: string;
}

export const EmptyMenuView: React.FC<EmptyStateProps> = ({ message, onAction, actionLabel }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      textAlign="center"
      py={5}
    >
      <RestaurantMenuIcon style={{ fontSize: 100, color: "#e0e0e0", marginBottom: 20 }} />
      <Typography variant="h6" color="textSecondary" gutterBottom>
        {message}
      </Typography>
      {onAction && actionLabel && (
        <Button variant="contained" sx={{bgcolor:'var(--primary-color)', mt:2}} onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </Box>
  );
};

