import User from "@models/user";
import { connectToDB } from "@utils/database";

export async function POST(request){

    const json = await request.json();
    const otp = json.otp;
    var resp;

    const isInDesiredForm = (str) => {
        var n = Math.floor(Number(str));
        return n !== Infinity && String(n) === str && n >= 0;
    }

    if(!isInDesiredForm(json.otp))
    return new Response(null, {status: 200, statusText: "INVALID"})

    console.log("otp: ",otp)

    //generate new ticket (5 digit code)
    await connectToDB();
    //add to db
    const amount = await (await User.findOne({active_otp: otp})).amount_committed
    console.log("amount: ",amount)
    const user = await User.findOneAndUpdate({
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
    if(user){
        statusText = "VALID";
    }
    asd
    console.log("status: ", statusText);
    resp = new Response(null, {status: 200, statusText: statusText})
    return resp;
    //on conductor, search for the ticket
    //approve the customer and remove the ticket   
  
}