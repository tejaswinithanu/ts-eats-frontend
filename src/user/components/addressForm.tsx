import React, { useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Grid,
} from "@mui/material";
import { addAddress, getUserAddress } from "./../../store/userSlice";
import { useDispatch } from "react-redux";

export const AddressForm = () => {
    const [open, setOpen] = useState(false);
    const [formValues, setFormValues] = useState<any>({
        doorNo: '',
        street: '',
        landmark: '',
        town: '',
        district: '',
        state: '',
        pincode: '',
        phone: ''
    });
    const [errors, setErrors] = useState<any>({});
    const dispatch = useDispatch();
    const userId = sessionStorage.getItem('userId');

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        validateField(name, value);
    };

    const handleBlur = (e: any) => {
        const { name, value } = e.target;
        validateField(name, value);
    };

    const validateField = (name: any, value: any) => {
        let error = "";
        switch (name) {
            case "doorNo":
                if (!value) error = "Door No. is required.";
                break;
            case "street":
                if (!value) error = "Street is required.";
                break;
            case "town":
                if (!value) error = "Town is required.";
                break;
            case "district":
                if (!value) error = "District is required.";
                break;
            case "state":
                if (!value) error = "State is required.";
                break;
            case "pincode":
                if (!/^\d{6}$/.test(value)) error = "Pincode must be a 6-digit number.";
                break;
            case "phone":
                if (!/^\d{10}$/.test(value)) error = "Phone number must be a 10-digit number.";
                break;
            default:
                break;
        }
        setErrors({ ...errors, [name]: error });
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setErrors({});
        setOpen(false);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        // Run validation on all fields before submit
        const isValid = Object.keys(formValues).every((key) => {
            validateField(key, formValues[key]);
            return !errors[key];
        });

        if (isValid) {
            const { town, state, pincode, phone, landmark } = formValues;
            await dispatch(addAddress({ userId, village: town, state, pincode, phoneNumber: phone, landmark }));
            dispatch(getUserAddress(userId));
            handleClose();
        }
    };

    return (
        <Box>
            
            <Button variant="contained" sx={{bgcolor:'var(--primary-color)', mb:1, mt:1}} onClick={handleOpen} fullWidth>
                Add Address
            </Button>
            {/* <Button variant="contained" sx={{bgcolor:'var(--primary-color)'}} fullWidth>
                Select Location
            </Button> */}
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Add New Address</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Door No."
                                    name="doorNo"
                                    value={formValues.doorNo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    fullWidth
                                    required
                                    error={!!errors.doorNo}
                                    helperText={errors.doorNo}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Street"
                                    name="street"
                                    value={formValues.street}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    fullWidth
                                    required
                                    error={!!errors.street}
                                    helperText={errors.street}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Landmark (Optional)"
                                    name="landmark"
                                    value={formValues.landmark}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Town"
                                    name="town"
                                    value={formValues.town}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    fullWidth
                                    required
                                    error={!!errors.town}
                                    helperText={errors.town}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="District"
                                    name="district"
                                    value={formValues.district}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    fullWidth
                                    required
                                    error={!!errors.district}
                                    helperText={errors.district}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="State"
                                    name="state"
                                    value={formValues.state}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    fullWidth
                                    required
                                    error={!!errors.state}
                                    helperText={errors.state}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Pincode"
                                    name="pincode"
                                    type="number"
                                    value={formValues.pincode}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    fullWidth
                                    required
                                    error={!!errors.pincode}
                                    helperText={errors.pincode}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Phone Number"
                                    name="phone"
                                    type="tel"
                                    value={formValues.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    fullWidth
                                    required
                                    error={!!errors.phone}
                                    helperText={errors.phone}
                                />
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        Save Address
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
