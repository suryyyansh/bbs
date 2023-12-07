import User from "@models/user";
import { connectToDB } from "@utils/database";

export async function POST(request){

    const json = await request.json();
    const otp = json.otp;
    var resp;

    console.log("otp: ",otp)

    //generate new ticket (5 digit code)
    await connectToDB();
    //add to db
    var user = await User.findOne({active_otp: otp ? otp : 0})
    const amount = user ? user.amount_committed : 0;
    console.log("amount: ",amount)
    user = await User.findOneAndUpdate({
        active_otp: otp
    },
    {
        active_otp: 0,
        $inc:{
            funds: -1*Number(amount)
        },
        amount_committed: 0
    })

    var statusText = "INVALID";
    if(user && otp != 0){
        statusText = "VALID";
    }
    console.log("status: ", statusText);
    resp = new Response(JSON.stringify({validity: statusText.concat(["\n", "AMOUNT: ", amount])}), {status: 200})
    return resp;
    //on conductor, search for the ticket
    //approve the customer and remove the ticket   
  
}