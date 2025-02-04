import prisma from '@/lib/prismaDb';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { userId, name, description, shopProductType, avatar } = data;

    // Log received data
    console.log("Received Data:", data);

    // Check if userId exists in the Shops table
    const existingShop = await prisma.shops.findUnique({ where: { userId } });
    console.log("Existing Shop:", existingShop);

    if (existingShop) {
      console.log("Shop already exists for user:", userId);
      return new NextResponse(
        "You already have one shop with this account",
        { status: 409 } // 409 Conflict
      );
    }

    // Create a new shop
    const shop = await prisma.shops.create({
      data: {
        userId,
        name,
        description,
        shopProductType,
        avatar,
      },
    });

    console.log("Created Shop:", shop);

    return NextResponse.json(shop, { status: 201 }); // 201 Created
  } catch (error: any) {
    console.error('Error creating shop:', error);

    // Log detailed error object

    return new NextResponse(
      error.message || "Internal Server Error",
      { status: 500 }
    );
  }
}
