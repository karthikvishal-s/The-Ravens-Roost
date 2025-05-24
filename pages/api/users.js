// pages/api/user.js
import { initMongoose } from "@/lib/mongoose";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  await initMongoose();
  const session = await getServerSession(req, res, authOptions);

  if (!session) return res.status(401).json({ error: "Unauthorized" });

  const user = await User.findOne({ email: session.user.email });

  if (req.method === "PUT") {
    const { username } = req.body;
    if (!username) return res.status(400).json({ error: "Username is required" });

    user.username = username;
    await user.save();
    return res.status(200).json({ message: "Username updated" });
  }

  if (req.method === "GET") {
    return res.status(200).json({ username: user.username });
  }

  res.status(405).json({ error: "Method not allowed" });
}
