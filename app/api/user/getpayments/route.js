import Transaction from "@models/transaction";
import { connectToDB } from "@utils/database";

export async function POST(request){

    const user = await request.json();

    await connectToDB();

    //add to db
    const payments = await Transaction.find({
        user: user.email
    })


    const resp = new Response(JSON.stringify(payments), {status: 200, statusText: "PAYMENTS RETRIEVED"})
    return resp;
    //on conductor, search for the ticket
    //approve the customer and remove the ticket   
  
}