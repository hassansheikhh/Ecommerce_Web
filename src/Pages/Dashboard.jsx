import React from "react";
import { Box, Grid, Typography, Card, CardContent, List, ListItem, ListItemText, TableRow, TableCell, TableHead, Table, TableBody, Button } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Link } from 'react-router-dom';

import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
} from "chart.js";
import Menu from "../Components/SideBar/SideBar";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const Dashboard = () => {
    const chartData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Sales",
                data: [50, 70, 80, 90, 60, 100],
                borderColor: "#03C9D7",
                backgroundColor: "rgba(3, 201, 215, 0.2)",
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const orderData = [
        { orderNumber: 'ORD123', orderBy: 'Jaree Imam', orderDate: '2025-01-21', orderStatus: 'Shipped' },
        { orderNumber: 'ORD124', orderBy: 'Wahaj Imam', orderDate: '2025-01-22', orderStatus: 'Pending' },
        { orderNumber: 'ORD124', orderBy: 'Hassan Sheikh', orderDate: '2025-01-22', orderStatus: 'Pending' },
        { orderNumber: 'ORD124', orderBy: 'Tajwer Basit', orderDate: '2025-01-22', orderStatus: 'Delivered' },
        { orderNumber: 'ORD124', orderBy: 'Tajwer Zeeshan', orderDate: '2025-01-22', orderStatus: 'Pending' },
    ];

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
        },
        scales: {
            x: { grid: { display: false } },
            y: { grid: { drawBorder: false } },
        },
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
                <Typography variant="h4" marginBottom={3} fontWeight="bold">
                    Dashboard
                </Typography>
                <Grid container spacing={3}>
                    {/* Sales Summary */}
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" marginBottom={2} fontWeight="bold">
                                    Sales Summary
                                </Typography>
                                <Typography variant="h4">$12,345</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Total sales this month
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Order Summary */}
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" marginBottom={2} fontWeight="bold">
                                    Order Summary
                                </Typography>
                                <Typography variant="h4">567 Orders</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Total orders this month
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" marginBottom={2} fontWeight="bold">
                                    Order Details
                                </Typography>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><strong>Order Number</strong></TableCell>
                                            <TableCell><strong>Order By</strong></TableCell>
                                            <TableCell><strong>Order Date</strong></TableCell>
                                            <TableCell><strong>Order Status</strong></TableCell>
                                            <TableCell><strong>Action</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {orderData.map((order, index) => (
                                            <TableRow key={index} hover>
                                                <TableCell>{order.orderNumber}</TableCell>
                                                <TableCell>{order.orderBy}</TableCell>
                                                <TableCell>{order.orderDate}</TableCell>
                                                <TableCell style={{
                                                    color:
                                                        order.orderStatus === "Shipped"
                                                            ? "orangered"
                                                            : order.orderStatus === "Delivered"
                                                                ? "green"
                                                                : "blue",

                                                    fontWeight: 'bold'
                                                }}>{order.orderStatus}</TableCell>
                                                <TableCell><Button>Edit</Button></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Dashboard;
