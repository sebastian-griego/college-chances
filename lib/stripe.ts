import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export const PRICING_TIERS = {
  '2-weeks': {
    name: '2 Weeks',
    price: 500, // $5.00 in cents
    duration: 14,
    priceId: process.env.STRIPE_2WEEKS_PRICE_ID
  },
  '1-month': {
    name: '1 Month',
    price: 800, // $8.00 in cents
    duration: 30,
    priceId: process.env.STRIPE_1MONTH_PRICE_ID
  },
  '3-months': {
    name: '3 Months',
    price: 1500, // $15.00 in cents
    duration: 90,
    priceId: process.env.STRIPE_3MONTHS_PRICE_ID
  }
};
