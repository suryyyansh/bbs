import User from "@models/user";
import { connectToDB } from "@utils/database";

export async function POST(request){

    const user = await request.json();
    console.log(user.amount);

    //generate new ticket (5 digit code)
    const OTP = Math.floor(Math.random() * 89999) + 10000;

    await connectToDB();

    //add to db
    await User.findOneAndUpdate({
        email: user.email
    },
    {
        active_otp: OTP,
        amount_committed: user.amount
    });

    const resp = new Response(JSON.stringify({otp: OTP}), {status: 200, statusText: "OTP GENERATED"})
    return resp;
    //on conductor, search for the ticket
    //approve the customer and remove the ticket   
  
}