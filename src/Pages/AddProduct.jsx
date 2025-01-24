import React, { useState } from "react";
import { Box, Grid, Typography, Card, CardContent, TextField, Button, MenuItem, Select, InputLabel, FormControl, Input } from "@mui/material";
import Menu from "../Components/SideBar/SideBar";

const AddProduct = () => {
    const [productDetails, setProductDetails] = useState({
        articleNumber: '',
        sizes: [],
        color: '',
        quantity: '',
        buyingPrice: '',
        sellingPrice: '',
        image: null,
    });

    // Handle form field change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductDetails({
            ...productDetails,
            [name]: value,
        });
    };

    const handleSizeChange = (e) => {
        setProductDetails({
            ...productDetails,
            sizes: e.target.value,
        });
    };

    // Handle file input change
    const handleFileChange = (e) => {
        setProductDetails({
            ...productDetails,
            image: e.target.files[0],
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // You can perform further actions like sending the data to the server here
        console.log(productDetails);
    };

    return (
        <Box display="flex" height="100vh">
            {/* Sidebar Menu */}
            <Box
                sx={{
                    width: 250,
                    backgroundColor: "#f4f4f4",
                    padding: 2,
                    borderRight: "1px solid #ccc",
                }}
            >
                <Typography variant="h6" fontWeight="bold" marginBottom={2}>
                    Menu
                </Typography>
                <Menu />
            </Box>

            {/* Main Content */}
            <Box flex={1} padding={3}>
                <Grid container spacing={3}>
                    {/* Add Product Form */}
                    <Grid item xs={12} md={8}>
                        <Card>
                            <CardContent>
                                <Typography variant="h4" marginBottom={3} fontWeight="bold">
                                    Add Product
                                </Typography>
                                <form onSubmit={handleSubmit}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                label="Article Number"
                                                fullWidth
                                                required
                                                name="articleNumber"
                                                value={productDetails.articleNumber}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <FormControl fullWidth>
                                                <InputLabel>Sizes</InputLabel>
                                                <Select
                                                    multiple
                                                    value={productDetails.sizes}
                                                    onChange={handleSizeChange}
                                                    name="sizes"
                                                    label="Sizes"
                                                >
                                                    {[39, 40, 41, 42, 43, 44, 45].map((size) => (
                                                        <MenuItem key={size} value={size}>
                                                            {size}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                label="Color"
                                                fullWidth
                                                required
                                                name="color"
                                                value={productDetails.color}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                label="Quantity"
                                                type="number"
                                                fullWidth
                                                required
                                                name="quantity"
                                                value={productDetails.quantity}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                label="Buying Price"
                                                type="number"
                                                fullWidth
                                                required
                                                name="buyingPrice"
                                                value={productDetails.buyingPrice}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                label="Selling Price"
                                                type="number"
                                                fullWidth
                                                required
                                                name="sellingPrice"
                                                value={productDetails.sellingPrice}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                fullWidth
                                                name="image"
                                                onChange={handleFileChange}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Box mt={3} textAlign="center">
                                        <Button type="submit" variant="contained" color="primary">
                                            Add Product
                                        </Button>
                                    </Box>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default AddProduct;
