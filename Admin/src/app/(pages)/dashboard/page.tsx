"use client";
import React from "react";
import {
    Box,
    Grid,
    Paper,
    Typography,
    Card,
    CardContent,
    Button,
} from "@mui/material";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

// dữ liệu ảo cho chart
const data = [
    { month: "Jan", sales: 4000 },
    { month: "Feb", sales: 3000 },
    { month: "Mar", sales: 5000 },
    { month: "Apr", sales: 4780 },
    { month: "May", sales: 5890 },
    { month: "Jun", sales: 4390 },
    { month: "Jul", sales: 6490 },
];

const DashboardPage = () => {
    return (
        <Box sx={{ p: 3 }} className="wrapper-dashboard">
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>

            {/* Hàng đầu: các thống kê nhanh */}
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 3 }}>

                    <Card elevation={3}>
                        <CardContent>
                            <Typography variant="h6">Users</Typography>
                            <Typography variant="h4" color="primary">
                                1,245
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>

                    <Card elevation={3}>
                        <CardContent>
                            <Typography variant="h6">Orders</Typography>
                            <Typography variant="h4" color="secondary">
                                320
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>

                    <Card elevation={3}>
                        <CardContent>
                            <Typography variant="h6">Revenue</Typography>
                            <Typography variant="h4" color="success.main">
                                $12,430
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>

                    <Card elevation={3}>
                        <CardContent>
                            <Typography variant="h6">Products</Typography>
                            <Typography variant="h4" color="error">
                                85
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Hàng thứ hai: nội dung chi tiết */}
            <Grid container spacing={3} sx={{ mt: 3 }}>
                <Grid size={{ xs: 12, md: 8 }}>

                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Sales Overview
                        </Typography>
                        <Box sx={{ height: 240 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="sales"
                                        stroke="#1976d2"
                                        strokeWidth={2}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </Box>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Recent Activity
                        </Typography>
                        <Box>
                            <Typography>- User A registered</Typography>
                            <Typography>- Order #1234 placed</Typography>
                            <Typography>- Product X updated</Typography>
                        </Box>
                        <Button variant="contained" sx={{ mt: 2 }}>
                            View All
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default DashboardPage;
