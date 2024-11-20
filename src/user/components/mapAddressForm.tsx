import React, { useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

// Fix default marker icon issue in Leaflet with Webpack
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIconRetina from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIconRetina,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

export const MapAddressForm = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        setDialogOpen(true); // Open the dialog when a location is clicked
      },
    });

    return null; // No Marker, as we're showing data in the Dialog
  };

  const fetchAddress = async (lat: any, lng: any) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await response.json();
    console.log(data.display_name); // Full address
    return data.display_name
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Select Address
      </Typography>
      <MapContainer
        center={[20.5937, 78.9629]} // Default center (India)
        zoom={5}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker />
      </MapContainer>

      {/* Dialog for displaying the location */}
      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogTitle>Selected Location</DialogTitle>
        <DialogContent>
          {position ? (
            <>
                <Typography>
                    {/* {fetchAddress(position[0],position[1])} */}
                </Typography>
              {/* <Typography>Latitude: {position[0]}</Typography> */}
              {/* <Typography>Longitude: {position[1]}</Typography> */}
            </>
          ) : (
            <Typography>No location selected.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
