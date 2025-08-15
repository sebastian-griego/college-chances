import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// This is required for dynamic API routes
export const dynamic = 'force-dynamic';

export async function PATCH(request: NextRequest) {
  try {
    const { id, read } = await request.json();
    
    const updatedMessage = await prisma.contactMessage.update({
      where: {
        id: id
      },
      data: {
        read
      }
    });

    return NextResponse.json(updatedMessage);
  } catch (error) {
    console.error('Error updating message:', error);
    return NextResponse.json(
      { error: 'Failed to update message' },
      { status: 500 }
    );
  }
}