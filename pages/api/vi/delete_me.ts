import { NextApiRequest, NextApiResponse } from "next";

import auth0 from "../../../utils/auth0";
import fetch from "isomorphic-unfetch";

export default async function shows(req: NextApiRequest, res: NextApiResponse) {
  try {
    const tokenCache = auth0.tokenCache(req, res);
    const { accessToken } = await tokenCache.getAccessToken();

    const endpoint = `http://localhost:5000/api/private/groups`;

    let response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ payload: req.body }),
    });

    const result = await response.json();

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message,
    });
  }
}
