'use server'

import { currentUser, type User } from '@clerk/nextjs/server'
import prisma from '../../lib/prismaDb'


export const getShopOrders = async({sellerId} : {sellerId:string})=>{
    try{
        const orders:any = await prisma.orders.findMany({
            where:{
                Prompts:{
                    sellerId
                }
            },
            include:{
                Prompts: true,
            }
        })

        for(const order of orders){
            const userId = order?.userId;
            console.log("IUser" , userId) ;
            if(userId){
                const user = await users.getUser(userId) ;
                order.user = user ;
            }
        }

        //console.log("orders" , orders)

        return orders


    }catch(error){
        console.log("Shop orders error" , error);
    }
}