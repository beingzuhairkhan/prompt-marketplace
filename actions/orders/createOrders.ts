'use server'

import prisma from '../../lib/prismaDb'



export const newOrders = async({promptsId , payment_method , payment_id , userId}:{promptsId : string ,payment_method:string , payment_id:string , userId:string})=>{
    try{

        const newOrderData = {
            userId,
            promptsId,
            payment_method:"visa",
            payment_id
        }
       const newOrder = await prisma.orders.create({
        data:newOrderData 
       })

    //    console.log("newOrder" , newOrder)
       await prisma.shops.update({
        where:{
            userId
        },
        data:{
            totalSales : {increment:1}
        }
       })
       return newOrder


    }catch(error){
      console.log("error in create Order" , error)
    }
}