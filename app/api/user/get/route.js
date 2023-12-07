import { connectToDB } from "@utils/database";
import User from "@models/user"

export async function getUser({email}) {
  // Connect to the Mongoose database
  await connectToDB();
  // Fetch all users from the database
  const user = await User.findOne({email: email});
  // Close the Mongoose connection
  return {
    props: {
      user: JSON.stringify(user), // Serialize the users object
    },
  };
}

//for testing

export async function POST(request) {
  const user = await getUser(await request.json());
  return new Response(JSON.stringify(user));
}