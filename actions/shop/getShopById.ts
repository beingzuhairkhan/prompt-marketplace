'use server'

import { User, currentUser } from "@clerk/nextjs/server";
// import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismaDb';

export async function getShopById({shopId} :{shopId:string}){
    try{

        const shop = await prisma.shops.findUnique({
            where:{
                userId:shopId,
            }
        })
        // console.log("Shop" , shop)
        // return {
        //     shop:JSON.parse(JSON.stringify(shop))
        // }


        return shop
    }catch(error){
        console.log(error)
    }
}