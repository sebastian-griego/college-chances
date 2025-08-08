# Payment Integration Setup

## Stripe Configuration

### 1. Create Stripe Account
- Go to [stripe.com](https://stripe.com) and create an account
- Get your API keys from the Stripe Dashboard

### 2. Environment Variables
Add these to your `.env.local` file:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Existing Configuration
BASETEN_API_KEY=your_baseten_api_key_here
```

### 3. Pricing Tiers
The payment system is configured with these tiers:
- **2 Weeks**: $5
- **1 Month**: $8  
- **3 Months**: $15

### 4. Webhook Setup
1. In Stripe Dashboard, go to Webhooks
2. Add endpoint: `https://your-domain.com/api/webhooks/stripe`
3. Select events: `payment_intent.succeeded`
4. Copy the webhook secret to `STRIPE_WEBHOOK_SECRET`

### 5. Test Mode
- Use test card: `4242 4242 4242 4242`
- Any future date for expiry
- Any 3-digit CVC

## Features Implemented
- ✅ Payment modal with plan selection
- ✅ Stripe Elements integration
- ✅ Payment success/failure handling
- ✅ Webhook processing
- ✅ Email collection for user accounts

## Next Steps
1. Set up Stripe account and get API keys
2. Add environment variables
3. Configure webhooks
4. Test payment flow
5. Implement user account creation after payment
