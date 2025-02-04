'use client';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Loaders from '@/utils/Loaders';

type PromptDataTypes = {
    id: string;
    name: string;
    price: string;
    rating: number;
    purchased?: number;
    orders?: any[];
    status: string;
};

const AllPrompts = () => {
    const [promptsData, setPromptsData] = useState<PromptDataTypes[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios
            .get('/api/get-prompts')
            .then((res) => {
                setPromptsData(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError('Failed to fetch prompts data.');
                setLoading(false);
            });
    }, []);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { field: 'name', headerName: 'Prompt Title', flex: 0.8 },
        { field: 'price', headerName: 'Prompt Price', flex: 0.5 },
        { field: 'rating', headerName: 'Ratings', flex: 0.5 },
        { field: 'purchased', headerName: 'Purchased', flex: 0.5 },
        { field: 'status', headerName: 'Status', flex: 0.5 },
    ];

    const rows = promptsData.map((item) => ({
        id: item.id,
        name: item.name || 'N/A',
        price: item.price ? `₹${item.price}` : 'N/A',
        rating: item.rating || 0,
        purchased: item.purchased || 0,
        status: item.status || 'N/A',
    }));

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                All Prompts
            </Typography>
            {error ? (
                <Typography color="error">{error}</Typography>
            ) : loading ? (
                <Loaders />
            ) : (
                <Box
                    sx={{
                        height: 500,
                        width: '100%',
                        border: '2px solid black', // Add white border
                        borderRadius: '8px', // Optional: Rounded corners
                        overflow: 'hidden', // Ensures DataGrid stays inside the box
                    }}
                >
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[5, 10, 20]}
                        disableSelectionOnClick
                        sx={{
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: 'black', // Black header background
                                color: 'black', // White text for headers
                                fontSize: '16px', // Optional: Header font size
                            },
                            '& .MuiDataGrid-cell': {
                                color: 'white', // Black text in cells
                                fontSize: '14px', // Cell font size
                            },
                            '& .MuiDataGrid-footerContainer': {
                                backgroundColor: '#f5f5f5', // Optional: Footer styling
                            },
                        }}
                    />
                </Box>
            )}
        </Box>
    );
};

export default AllPrompts;
