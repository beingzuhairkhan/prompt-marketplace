'use client';

import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Button, TextField } from '@mui/material';
import { format } from 'timeago.js';
import { PiDownloadDuotone } from 'react-icons/pi';
import { VscPreview } from 'react-icons/vsc';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { newReview } from '@/actions/reviews/newReview';
import toast from 'react-hot-toast';
import type { User } from '@clerk/nextjs/server';
import Header from '@/components/Layout/Header';

const UserAllOrders = ({ data , user , isSellerExists}: { data: any ; user:User | undefined ;   isSellerExists: boolean | undefined; }) => {
    const [open, setOpen] = useState(false);
    const [promptId, setPromptId] = useState("");
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [isMounted , setIsMounted] = useState(false)
    const handleReviewSubmit = async () => {
        try {
            if(rating === 0 || review === ""){
                toast.error("Please fill all fields")
                return;

            }
            await newReview({
                rating,
                comment: review,
                promptId,
            });
           // console.log("Review submitted:", { rating, review, promptId });
            setOpen(!open); 
            setRating(0);
            setReview("")
            toast.success("Review SUmit successfully")

            
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };

  
    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { field: 'name', headerName: 'Prompt Title', flex: 0.8 },
        { field: 'price', headerName: 'Prompt Price', flex: 0.5 },
        {
            field: 'download',
            headerName: 'Download Source Code',
            flex: 0.7,
            renderCell: (params: any) => {
                const sourceCodeFiles = params.row.download;
                //console.log("sourceCodeFiles" , sourceCodeFiles)
                return (
                    <div className="flex justify-center">
                        {sourceCodeFiles?.map((file: any) => (
                            <a
                                href={file.url}
                                key={file.url}
                                className="text-blue-600 flex items-center"
                                download
                            >
                                <PiDownloadDuotone className="text-xl mr-2" />
                                Download
                            </a>
                        )) || "N/A"}
                    </div>
                );
            },
        },
        { field: 'orderedAt', headerName: 'Ordered At', flex: 0.7 },
        {
            field: 'review',
            headerName: 'Give Review',
            flex: 0.7,
            renderCell: (params: any) => (
                <div className="flex justify-center">
                    <VscPreview
                        className="text-blue-600 text-2xl cursor-pointer"
                        onClick={() => {
                            setOpen(true);
                            setPromptId(params.row.prompt.id);
                        }}
                    />
                </div>
            ),
        },
    ];

    const rows = data?.map((item: any) => ({
        id: item.id,
        name: item.Prompts?.name || 'N/A',
        price: item.Prompts?.price ? `₹${item.Prompts.price}` : 'N/A',
        download: item.Prompts?.promptUrl || [],
        orderedAt: format(item.createdAt),
        prompt: item.Prompts,
    })) || [];

    useEffect(()=>{
    if(!isMounted){
        setIsMounted(true)
    }
    },[isMounted])

    
    if(!isMounted){
        return null ;
    }


    return (
        <>
        <Header activeItem={9} user={user} isSellerExists={isSellerExists}  />
        <Box className="p-6 bg-gray-800 min-h-screen">
            <center>
                <Typography variant="h4" className="text-gray-100 font-bold mb-4">
                    Your Orders
                </Typography>
            </center>
            <Box className="bg-white p-4 rounded-lg shadow">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    autoHeight
                    pageSize={5}
                    rowsPerPageOptions={[5, 10]}
                    disableSelectionOnClick
                />
            </Box>

            {/* Review Form (Instead of Modal) */}
            {open && (
             <Box className="bg-white p-6 mt-6 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 rounded-lg shadow">

                    <Typography variant="h6" className="font-semibold text-black">
                        Submit Review
                    <div className="flex justify-end text-black text-2xl cursor-pointer" onClick={()=> setOpen(!open)} > X </div>
                    </Typography>
                    <div className="flex space-x-2 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                onClick={() => setRating(star)}
                                className="cursor-pointer text-2xl"
                            >
                                {star <= rating ? (
                                    <AiFillStar className="text-yellow-500" />
                                ) : (
                                    <AiOutlineStar className="text-gray-400" />
                                )}
                            </span>
                        ))}
                    </div>
                    <TextField
                        fullWidth
                        label="Write your review"
                        multiline
                        rows={4}
                        variant="outlined"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        className="mb-4"
                    />
                    <div className="flex space-x-4 mt-2">
                        <Button variant="contained" color="primary"
                       disabled={data?.find((i:any)=> i.id === promptId)?.reviews.some((review:any)=>review.userId === user?.id) }
                        onClick={handleReviewSubmit}>
                            Submit
                        </Button>
                       
                    </div>
                </Box>
            )}
        </Box>
        </>
    );
};

export default UserAllOrders;
