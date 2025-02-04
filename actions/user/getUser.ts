'use server'

import { User, currentUser } from "@clerk/nextjs/server";
// import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismaDb';

export async function getUser() {
    try {
        const user = await currentUser();

        if (!user) {
            throw new Error("User not found");
        }

        const shop = await prisma.shops.findUnique({
            where: { userId: user.id },
        });

        if (!shop) {
            throw new Error("Shop not found");
        }

        // Serialize the user and shop objects
        return { 
            user: JSON.parse(JSON.stringify(user)), 
            shop 
        };
    } catch (error) {
        console.error("Load user error", error);
        return { error: "Internal server error", details: error };
    }
}
