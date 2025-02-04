'use server'

// import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismaDb';


export async function getPromptByCategory(promptCategories : string){
    try{
    const prompts = await prisma.prompts.findMany({
        include:{
            orders:true,
            images:true,
            reviews:true,
            promptUrl:true
        },
        where:{
            category: promptCategories,
        },
    })
 
    // return {
    //     prompts:JSON.parse(JSON.stringify(prompts)),
    // }
   // console.log("prompts" , prompts)
    return prompts

    }catch(error){
        console.log("getAllPrompts internal error" , error)
    }
}