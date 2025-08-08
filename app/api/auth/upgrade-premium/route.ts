import { NextRequest, NextResponse } from 'next/server';
import { updateUserPremium } from '@/lib/users';

export async function POST(request: NextRequest) {
  try {
    const { email, paymentIntent } = await request.json();

    if (!email || !paymentIntent) {
      return NextResponse.json(
        { error: 'Email and payment intent are required' },
        { status: 400 }
      );
    }

    // Upgrade user to premium
    const updatedUser = updateUserPremium(email, true);
    
    if (!updatedUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Return updated user data (without password)
    const { password: _, ...userWithoutPassword } = updatedUser;
    
    return NextResponse.json({
      success: true,
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Premium upgrade error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


