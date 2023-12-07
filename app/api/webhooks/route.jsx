import { NextResponse } from 'next/server'

import { stripe } from '@/lib/stripe'
import { connectToDB } from '@utils/database'
import Transaction from '@models/transaction'
import { Int32 } from 'mongodb'
import User from '@models/user'

export async function POST(req) {
  let event

  try {
    event = stripe.webhooks.constructEvent(
      await (await req.blob()).text(),
      req.headers.get('stripe-signature'),
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    const errorMessage = err.message
    // On error, log and return the error message.
    console.log(err)
    console.log(`❌ Error message: ${errorMessage}`)
    return NextResponse.json(
      { message: `Webhook Error: ${errorMessage}` },
      { status: 400 }
    )
  }

  // Successfully constructed event.
  console.log('✅ Success:', event.id)

  const permittedEvents = [
    'checkout.session.completed',
    'payment_intent.succeeded',
    'payment_intent.payment_failed',
  ]

  if (permittedEvents.includes(event.type)) {
    let data

    try {
      switch (event.type) {
        case 'checkout.session.completed':
          const checkoutSession = event.data.object;
          console.log(`💰 CheckoutSession status: ${checkoutSession.payment_status}`)

          const paymentIntent = await stripe.paymentIntents.retrieve(checkoutSession.payment_intent);

          
          await connectToDB();
          const intent = await Transaction.findOne({
            paymentIntent: paymentIntent.id,
          })
          if(intent)
            throw new Error('Duplicate paymentIntent receieved: ', paymentIntent.id);
          const paymentIntentId = paymentIntent.id;
          const email = checkoutSession.customer_email;
          const amount = Number(paymentIntent.amount)/100
          console.log("paymentAmount: ", Number(amount));
          console.log("paymentIntent: ", paymentIntent.id);
          console.log("paymentUser: ", checkoutSession.customer_email);
          await Transaction.create({
            paymentIntent: paymentIntent.id,
            user: checkoutSession.customer_email,
            amount: amount,
          })
          
          await User.findOneAndUpdate({email: email}, {$inc: {funds: amount}});

          break
        case 'payment_intent.payment_failed':
          data = event.data.object
          console.log(`❌ Payment failed: ${data.last_payment_error?.message}`)
          break
        case 'payment_intent.succeeded':
          data = event.data.object
          console.log(`💰 PaymentIntent status: ${data.status}`)
          

         

          break
        default:
          throw new Error(`Unhandled event: ${event.type}`)
      }
    } catch (error) {
      console.log(error)
      return NextResponse.json(
        { message: 'Webhook handler failed' },
        { status: 500 }
      )
    }
  }
  // Return a response to acknowledge receipt of the event.
  return NextResponse.json({ message: 'Received' }, { status: 200 })
}