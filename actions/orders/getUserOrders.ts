'use server'

import { currentUser, type User } from '@clerk/nextjs/server'
import prisma from '../../lib/prismaDb'


export const getUserOrders = async()=>{
    try{
        const user:User | null = await currentUser()
        const orders = await prisma.orders.findMany({
            where:{
                userId:user?.id
            },
            include:{
                Prompts:{
                    include:{
                        promptUrl:true,
                        reviews:true
                    }
                }
            }

        })

        // console.log("User orders" , orders);
        return orders
        

    }catch(error){
        console.log("User orders error" , error);
    }
}


