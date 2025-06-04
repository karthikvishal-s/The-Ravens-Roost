import { initMongoose } from "@/lib/mongoose";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";



export default async function handle(req, res) {
  await initMongoose();
  const session = await getServerSession(req, res, authOptions);


  if (!session || !session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Get user from DB if ID is missing
  let user = await User.findOne({ email: session.user.email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (req.method === "PUT") {
    const { username,sigil,name2 } = req.body;
    user.username =username; // Use name if provided, otherwise use username
    user.sigil = sigil || "Baratheon"; // Default sigil if not provided
    user.name2 = name2

    await user.save();
    return res.status(200).json({ message: "Username updated" });
  }

  if (req.method === "GET") {
    const { id, username } = req.query;
  
    let user;
    if (id) {
      user = await User.findById(id);
    } else if (username) {
      user = await User.findOne({ username });
    } else {
      return res.status(400).json({ message: "Missing ID or username" });
    }
  
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  
    return res.status(200).json({ user });
  }
  

  return res.status(405).json({ message: "Method not allowed" });

  
}
