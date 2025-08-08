import { NextRequest, NextResponse } from 'next/server';
import { stripe, PRICING_TIERS } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const { tier, email } = await request.json();
    
    if (!tier || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const pricingTier = PRICING_TIERS[tier as keyof typeof PRICING_TIERS];
    if (!pricingTier) {
      return NextResponse.json({ error: 'Invalid pricing tier' }, { status: 400 });
    }
    
    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: pricingTier.price,
      currency: 'usd',
      metadata: {
        tier,
        duration: pricingTier.duration.toString(),
        email
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });
    
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      amount: pricingTier.price,
      tier: pricingTier.name,
      duration: pricingTier.duration
    });
    
  } catch (error) {
    console.error('Payment intent creation error:', error);
    return NextResponse.json({ error: 'Payment creation failed' }, { status: 500 });
  }
}
