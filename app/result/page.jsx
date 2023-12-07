import PrintObject from '@/components/PrintObject'
import { stripe } from '@/lib/stripe'

export default async function ResultPage({searchParams}){
  if (!searchParams.session_id)
    throw new Error('Please provide a valid (`cs_test_...`) or `NULL` session_id')

  // if(searchParams.session_id === "NULL")
  //   return (
  //     <div>
  //       Payment was cancelled.
  //     </div>  
  //)
  const checkoutSession=
    await stripe.checkout.sessions.retrieve(searchParams.session_id, {
      expand: ['line_items', 'payment_intent'],
    })


  const paymentIntent = checkoutSession.payment_intent
  console.log("latest paymentIntent charge:", paymentIntent.amount/100);

  return (
    <>
      <h2>Status: {paymentIntent.status}</h2>
      <h3>Checkout Session response:</h3>
      <PrintObject content={checkoutSession} />
    </>
  )
}