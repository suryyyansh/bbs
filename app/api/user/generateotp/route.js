import User from "@models/user";
import { connectToDB } from "@utils/database";

export async function POST(request){

    const user = await request.json();
    console.log(user);

    //generate new ticket (5 digit code)
    const OTP = Math.floor(Math.random() * 89999) + 10000;

    await connectToDB();

    //add to db
    const tempuser = await User.findOne({email: user.email});
    if(tempuser.allowed_ride == false || Number(user.amount) > Number(tempuser.funds) || user.amount < 0){
        return new Response(JSON.stringify({statusText: "UNAUTHORIZED TO RIDE"}), {status: 200});
    }

    await User.findOneAndUpdate({
        email: user.email
    },
    {
        active_otp: OTP,
        amount_committed: user.amount
    });

    const resp = new Response(JSON.stringify({otp: OTP, statusText: "OTP GENERATED"}), {status: 200})
    return resp;
    //on conductor, search for the ticket
    //approve the customer and remove the ticket   
  
}