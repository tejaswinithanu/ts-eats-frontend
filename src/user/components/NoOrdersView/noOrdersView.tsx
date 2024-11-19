import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const NoOrdersView = () => {
    const navigate = useNavigate();

    const handleGoToMenu = () => {
        navigate("/menu");
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "60vh",
                textAlign: "center",
                padding: "20px",
                color: "black",
            }}
        >
            <Typography variant="h5" sx={{ color: "#ff357a", fontWeight: "bold", mb: 2 }}>
                No Orders Yet
            </Typography>
            <Typography variant="body1" sx={{ color: "#777", mb: 4 }}>
                You haven’t placed any orders yet. Explore our menu to order delicious food!
            </Typography>
            <Button
                variant="contained"
                onClick={handleGoToMenu}
                sx={{
                    background: "linear-gradient(45deg, #ff357a, #f2a445)",
                    color: "white",
                    padding: "10px 20px",
                    fontSize: "1rem",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
                    "&:hover": {
                        background: "linear-gradient(45deg, #ff357a, #ffb84d)"
                    },
                }}
            >
                Go to Menu
            </Button>
        </Box>
    );
};

