import { NextApiRequest, NextApiResponse } from "next";

import auth0 from "../../utils/auth0";
import fetch from "isomorphic-unfetch";

export default async function shows(req: NextApiRequest, res: NextApiResponse) {
  try {
    const tokenCache = auth0.tokenCache(req, res);
    const { accessToken } = await tokenCache.getAccessToken();

    const url = `http://localhost:5000/private/shows`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const shows = await response.json();
    res.status(200).json(shows);
  } catch (error) {
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message,
    });
  }
}
