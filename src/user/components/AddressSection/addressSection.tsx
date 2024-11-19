import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAddress } from "../../../store/userSlice";
import { Box, Card, CardContent, Typography, Radio, RadioGroup, FormControlLabel, Button } from "@mui/material";
import { AddressForm } from "../AddressForm/addressForm";

export const AddressSection = () => {
    const { userAddresses } = useSelector((state: any) => state.userSlice);
    const userId = sessionStorage.getItem("userId");
    const dispatch = useDispatch();

    const [selectedAddressId, setSelectedAddressId] = useState<any>(null);
    const [confirmedAddress, setConfirmedAddress] = useState<any>(null);

    useEffect(() => {    
        dispatch(getUserAddress(userId));
    }, [dispatch, userId]);

    const handleSelectAddress = (addressId: any) => {
        setSelectedAddressId(addressId);
    };

    const handleConfirmAddress = () => {
        const address = userAddresses.find((addr: any) => addr.id === selectedAddressId);
        setConfirmedAddress(address);
    };

    return (
        <Box sx={{ padding: 3, maxWidth: '100%', margin: "0 auto" }}>
            {userAddresses.length === 0 ? (
                <AddressForm />
            ) : (
                <Box>
                    <Typography variant="h6" gutterBottom>
                        Select Your Address
                    </Typography>
                    <Box
                        sx={{
                            maxHeight: 300,
                            overflowY: "auto",
                            border: "1px solid #ddd",
                            borderRadius: 2,
                            padding: 2,
                            marginBottom: 2,
                        }}
                    >
                        <RadioGroup
                            value={selectedAddressId}
                            onChange={(e) => handleSelectAddress(e.target.value)}
                        >
                            {userAddresses.map((address: any) => (
                                <Card key={address.id} sx={{ marginBottom: 1 }}>
                                    <CardContent>
                                        <FormControlLabel
                                            value={address.id}
                                            control={<Radio />}
                                            label={
                                                <Box>
                                                    <Typography variant="body1" fontWeight="bold">
                                                        {address.landmark}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {address.village}, {address.state}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {address.pincode}
                                                    </Typography>
                                                </Box>
                                            }
                                        />
                                    </CardContent>
                                </Card>
                            ))}
                        </RadioGroup>
                    </Box>

                    <Box mt={2}>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleConfirmAddress}
                            disabled={!selectedAddressId}
                            sx={{backgroundColor:'var(--primary-color)'}}
                        >
                            Confirm Selected Address
                        </Button>
                    </Box>

                    <Box>
                        <AddressForm />
                    </Box>

                    {confirmedAddress && (
                        <Box mt={2} p={2} border="1px solid #ddd" borderRadius={2}>
                            <Typography variant="h6" gutterBottom>
                                Deliver to:
                            </Typography>
                            <Typography variant="body1" fontWeight="bold">
                                {confirmedAddress.landmark}
                            </Typography>
                            <Typography variant="body2">
                                {confirmedAddress.village}, {confirmedAddress.state}
                            </Typography>
                            <Typography variant="body2">
                                {confirmedAddress.pincode}
                            </Typography>
                        </Box>
                    )}

                </Box>
            )}
        </Box>
    );
};
