'use server'

import prisma from '../../lib/prismaDb'
import { createClerkClient } from '@clerk/backend';

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

export const getShopOrders = async ({ sellerId }: { sellerId: string }) => {
    try {
        const orders: any = await prisma.orders.findMany({
            where: {
                Prompts: {
                    sellerId
                }
            },
            include: {
                Prompts: true,
            }
        });

        for (const order of orders) {
            const userId = order?.userId;
           // console.log("IUser", userId);
            
            if (userId) {
                const user = await clerkClient.users.getUser(userId);
             //console.log("email data" ,user.emailAddresses?.[0]?.emailAddress )
                // Convert Clerk user object to plain JSON
                order.user = {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.emailAddresses?.[0]?.emailAddress || null,
                    imageUrl: user.imageUrl
                };
            }
        }

        return orders;

    } catch (error) {
        console.log("Shop orders error", error);
        return [];
    }
};
