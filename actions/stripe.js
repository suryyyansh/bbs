'use server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

import { formatAmountForStripe } from '@/utils/stripe-helpers'
import { stripe } from '@/lib/stripe'

const CURRENCY = "inr";
export async function createCheckoutSession(data, email){
  //implement check for valid amount
  const checkoutSession =
    await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email,
      submit_type: 'pay',
      line_items: [
        {
          quantity: 1,
          price_data: {
            product: 'prod_P5ufa22L79A1p7',
            currency: CURRENCY,
            unit_amount: formatAmountForStripe(
              Number(data.get('paymentAmount')),
              CURRENCY
            ),
          },
        },
      ],
      success_url: `${headers().get('origin')}/user`,
      cancel_url: `${headers().get('origin')}/cancelled`,
    })

  redirect(checkoutSession.url)
}

export async function createPaymentIntent(data) {
  const paymentIntent =
    await stripe.paymentIntents.create({
      amount: formatAmountForStripe(
        Number(data.get('paymentAmount')),
        CURRENCY
      ),
      automatic_payment_methods: { enabled: true },
      currency: CURRENCY,
    })

  return { client_secret: paymentIntent.client_secret}
}