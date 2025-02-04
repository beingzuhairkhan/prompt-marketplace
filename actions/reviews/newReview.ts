'use server'

import { currentUser, type User } from '@clerk/nextjs/server';
import prisma from '../../lib/prismaDb'

interface Props {
    rating: number;
    comment: string;
    promptId: string;
    userId?: string ;
}

export const newReview = async ({ rating, comment, promptId, userId }: Props) => {
    try {

        const user:User | null = await currentUser()

        const review = await prisma.reviews.create({
            data: {
                rating,
                comment,
                promptId,
                userId: user?.id || ''

            }
        })
        const prompt = await prisma.prompts.findUnique({
            where:{
                id:promptId
            },
            include:{
                reviews:true
            }
        })
        if(prompt){
            const review:any = prompt.reviews;
            review.push({rating})
            let avg = 0 ;
            review && review.forEach((rev:any)=>{
                avg += rev.rating
            })
            await prisma.prompts.update({
                where:{
                    id:promptId
                },
                data:{
                    rating:avg / review.length
                }
            })
        }

        const shop = await prisma.shops.findUnique({
            where:{
                userId:prompt?.sellerId
            }
        })
        if(shop){
            const shopRating = shop.rating + rating ;
            await prisma.shops.update({
                where:{
                    userId:prompt?.sellerId
                },
                data:{
                    rating : shop.rating === 0 ? shopRating : shopRating / 2 
                }
            })
        }

        // console.log("review", review)
        return review

    } catch (error) {
        console.error("Failed to create review", error)

    }
}