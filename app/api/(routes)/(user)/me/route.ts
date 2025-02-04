// import { User, currentUser } from "@clerk/nextjs/server";
// import { NextRequest, NextResponse } from 'next/server';
// import prisma from '@/lib/prismaDb';

// export async function GET(req: NextRequest) {
//     try {
//         const user: User | null = await currentUser();

//         if (!user) {
//             return new NextResponse("Unauthorized user", { status: 401 });
//         }

//         const shop = await prisma.shops.findUnique({
//             where: { userId: user.id },
//         });

//         if (!shop) {
//             return new NextResponse("Shop not found for the user", { status: 404 });
//         }

//         return NextResponse.json({ user, shop });

//     } catch (error) {
//         console.error("Load user error", error);
//         return new NextResponse("Internal error", { status: 500 });
//     }
// }
