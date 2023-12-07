import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2022-11-15',
  appInfo: {
    name: 'bus-booking',
    url: 'https://localhost:3000/',
  },
})