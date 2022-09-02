// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { singleUserQuery, userCreatedPostsQuery } from "../../../utils/queries";
import { client } from "../../../utils/client";
import { userLikedPostsQuery } from "./../../../utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;

    const query = singleUserQuery(id);

    const user = await client.fetch(query);
    const userPostsQuery = userCreatedPostsQuery(id);

    const userPosts = await client.fetch(userPostsQuery);

    res.status(200).json({
      user: user[0],
      userPosts,
    });
  }
}
