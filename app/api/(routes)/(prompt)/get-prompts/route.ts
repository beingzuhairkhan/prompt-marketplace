import prisma from '@/lib/prismaDb';
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const sellerId = user.id;
    const prompts = await prisma.prompts.findMany({
      where: { sellerId },
      include: { orders: true },
    });

    return NextResponse.json(prompts);
  } catch (error) {
    console.error('Prompts error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
