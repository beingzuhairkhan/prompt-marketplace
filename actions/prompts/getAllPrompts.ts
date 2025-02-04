'use server'

import { User, currentUser } from "@clerk/nextjs/server";
// import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismaDb';


export async function getAllPrompts(pageNumber = 1 , pageSize = 8){
    try{



    const prompts:any = await prisma.prompts.findMany({
        include:{
            orders:true,
            images:true,
            reviews:true,
            promptUrl:true
        },
        where:{
            status:"Live"
        },
        take:pageSize,
        skip:(pageNumber - 1) * pageSize,
        orderBy:{
            createdAt:"desc"
        }
    })

    const totalPrompts = await prisma.prompts.findMany({
        where:{
            status:"Live"
        }
    })
    if(prompts){
        for(const prompt of prompts){
           const shop =  await prisma.shops.findUnique({
                where:{
                    userId:prompt.sellerId
                }
            })
            prompt.shop = shop
        }
    }
 
    // return {
    //     prompts:JSON.parse(JSON.stringify(prompts)),
    // }
    //console.log("prompts" , prompts)
    return {prompts , totalPrompts}

    }catch(error){
        console.log("getAllPrompts internal error" , error)
    }
}