import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = headers().get('stripe-signature')!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    const { tier, duration, email } = paymentIntent.metadata;
    
    // Here you would typically:
    // 1. Create or update user account
    // 2. Set subscription expiration date
    // 3. Send confirmation email
    // 4. Store payment info in database
    
    console.log('Payment succeeded:', {
      email,
      tier,
      duration,
      amount: paymentIntent.amount
    });
  }

  return NextResponse.json({ received: true });
}
