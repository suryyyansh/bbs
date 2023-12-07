import { React } from 'react'
const PaymentList = ({payments}) => {

  
  return (
    <div className="prompt_card">
      <div className="text-center logo_text">PAYMENTS BY USER</div>
      {payments.map(payment => (
        <div
         key={payment.paymentIntent}
         className="userlist flex-col"
         >
      <div>paymentID: {payment.paymentIntent}</div>
      <div>amount: {payment.amount}</div>
      </div>
      ))}
    </div>
  )
}

export default PaymentList