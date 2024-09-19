// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from "next";
//
// type Data = {
//   name: string;
// };
//
// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>,
// ) {
//   res.status(200).json({ name: "John Doe" });
// }

import { ObjectId } from "mongodb";
import clientPromise from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  const { email, currency, budgetSchedule, budgetAmount } = req.body;

  if (!email || !currency || !budgetSchedule || !budgetAmount) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    const client = await clientPromise;
    const db = client.db("User");
    const collection = db.collection("users");

    const result = await collection.updateOne(
      {
        email: email,
      },
      { $set: { settings: { currency, budgetSchedule, budgetAmount } } },
      { upsert: true }
    );

    if (result.matchedCount === 0 && result.upsertedCount === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.status(200).json({ message: "Settings added successfully." });
  } catch (error) {
    return res.status(500).json({ error: "Unable to post settings." });
  }
}
