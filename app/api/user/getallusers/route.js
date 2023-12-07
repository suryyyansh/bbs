import { connectToDB } from "@utils/database";
import User from "@models/user"

//for testing

export async function POST(request) {
  const role = await (await request.json()).role;

  await connectToDB();
  const users = await User.find({
  //  role: role
  })
  const filteredusers = users.map(user => ({
    email: user.email,
    role: user.role,
    funds: user.funds,
    allowed_ride: user.allowed_ride
  }))
  return new Response(JSON.stringify(filteredusers));
}