import { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.json({ message: "Halo dari backend di Vercel dengan Express!" });
}
