import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Card, CardContent, TextField, Button, MenuItem, Select, InputLabel, FormControl, Input, TextareaAutosize } from "@mui/material";
import Menu from "../Components/SideBar/SideBar";

const AddProduct = () => {
    const [productDetails, setProductDetails] = useState({ sizes: [], category: [], subCategory: "" });

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("https://localhost:44336/api/product/GetCategory", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setCategories(data.Data);
                } else {
                    console.error("Failed to fetch categories:", response.statusText);
                }
            } catch (error) {
                console.error("Error during GetCategory:", error);
            }
        };

        fetchCategories();
    }, []);

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

    const handleCategoryChange = (event) => {
        setProductDetails({
            ...productDetails,
            category: event.target.value,
            subCategory: "", // Reset subcategory when category is changed
        });
    };

    const handleSubCategoryChange = (event) => {
        setProductDetails({
            ...productDetails,
            subCategory: event.target.value,
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
        console.log(productDetails);
    };

    const selectedCategory = categories.find(
        (category) => category.PkCategoryId === productDetails.category
    );

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
                    <Grid item xs={12} md={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="h4" marginBottom={3} fontWeight="bold">
                                    Add Product
                                </Typography>
                                <form onSubmit={handleSubmit}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={4}>
                                            <TextField
                                                label="Product Name"
                                                fullWidth
                                                required
                                                name="productName"
                                                value={productDetails.productName}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <FormControl fullWidth>
                                                <InputLabel>Product Category</InputLabel>
                                                <Select
                                                    value={productDetails.category}
                                                    onChange={handleCategoryChange}
                                                    name="category"
                                                    label="Categories"
                                                >
                                                    {categories.map((category) => (
                                                        <MenuItem key={category.PkCategoryId} value={category.PkCategoryId}>
                                                            {category.CategoryName}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <FormControl fullWidth>
                                                <InputLabel>Subcategory</InputLabel>
                                                <Select
                                                    value={productDetails.subCategory}
                                                    onChange={handleSubCategoryChange}
                                                    name="subCategory"
                                                    label="Subcategory"
                                                    disabled={!selectedCategory} // Disable subcategory dropdown if no category is selected
                                                >
                                                    {selectedCategory &&
                                                        selectedCategory.SubCategories.map((subCategory) => (
                                                            <MenuItem key={subCategory.PkCategoryId} value={subCategory.PkCategoryId}>
                                                                {subCategory.CategoryName}
                                                            </MenuItem>
                                                        ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <TextField
                                                label="Article Number"
                                                fullWidth
                                                required
                                                name="articleNumber"
                                                value={productDetails.articleNumber}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <TextareaAutosize
                                                minRows={4}
                                                placeholder="Product Detail"
                                                name="productDetail"
                                                value={productDetails.productDetail}
                                                onChange={handleChange}
                                                style={{ width: "98%", padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
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
                                        <Grid item xs={12} md={4}>
                                            <FormControl fullWidth>
                                                <InputLabel>Product Color</InputLabel>
                                                <Select
                                                    multiple
                                                    value={productDetails.sizes}
                                                    onChange={handleSizeChange}
                                                    name="sizes"
                                                    label="Sizes"
                                                >
                                                    {["Brown", "Black", "Mustard", "White", "Blue", "Grey", "Olive", "Camel", "Chico"].map((color) => (
                                                        <MenuItem key={color} value={color}>
                                                            {color}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
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
                                        <Grid item xs={12} md={4}>
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
                                        <Grid item xs={12} md={4}>
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
                                        <Grid item xs={12} md={4}>
                                            <label>Product Image</label>
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
