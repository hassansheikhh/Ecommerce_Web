import React, { useState } from "react";
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Input,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material"; import Menu from "../Components/SideBar/SideBar";

const Products = () => {




    const dummyProducts = [
        {
            articleNumber: "A001",
            sizes: [39, 40, 41],
            color: "Black",
            quantity: 10,
            buyingPrice: 500,
            sellingPrice: 700,
            image: "https://via.placeholder.com/50",
        },
        {
            articleNumber: "A002",
            sizes: [42, 43, 44],
            color: "White",
            quantity: 15,
            buyingPrice: 600,
            sellingPrice: 850,
            image: "https://via.placeholder.com/50",
        },
        {
            articleNumber: "A003",
            sizes: [40, 41, 42],
            color: "Blue",
            quantity: 20,
            buyingPrice: 550,
            sellingPrice: 750,
            image: "https://via.placeholder.com/50",
        },
    ];




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
                <Grid item xs={12}>
                    <Typography variant="h4" marginBottom={3} fontWeight="bold">
                        Product List
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow >
                                    <TableCell style={{fontWeight:'bold'}}>Article Number</TableCell>
                                    <TableCell style={{fontWeight:'bold'}}>Sizes</TableCell>
                                    <TableCell style={{fontWeight:'bold'}}>Color</TableCell>
                                    <TableCell style={{fontWeight:'bold'}}>Quantity</TableCell>
                                    <TableCell style={{fontWeight:'bold'}}>Buying Price</TableCell>
                                    <TableCell style={{fontWeight:'bold'}}>Selling Price</TableCell>
                                    <TableCell style={{fontWeight:'bold'}}>Image</TableCell>
                                </TableRow>
                            </TableHead>
                            {/* <TableBody>
                                {products.map((product, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{product.articleNumber}</TableCell>
                                        <TableCell>{product.sizes.join(", ")}</TableCell>
                                        <TableCell>{product.color}</TableCell>
                                        <TableCell>{product.quantity}</TableCell>
                                        <TableCell>{product.buyingPrice}</TableCell>
                                        <TableCell>{product.sellingPrice}</TableCell>
                                        <TableCell>
                                            <img
                                                src={product.imagePreview}
                                                alt="Product"
                                                style={{ width: "50px", height: "50px" }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))} 
                            </TableBody>*/}
                            <TableBody>
                                {dummyProducts.map((product, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{product.articleNumber}</TableCell>
                                        <TableCell>{product.sizes.join(", ")}</TableCell>
                                        <TableCell>{product.color}</TableCell>
                                        <TableCell>{product.quantity}</TableCell>
                                        <TableCell style={{color:'red'}}>{product.buyingPrice}</TableCell>
                                        <TableCell style={{color:'green'}}>{product.sellingPrice}</TableCell>
                                        <TableCell>
                                            <img
                                                src={product.image}
                                                alt="Product"
                                                style={{ width: "50px", height: "50px" }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Box>
        </Box>
    );
};

export default Products;
