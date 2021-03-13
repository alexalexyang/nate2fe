import { NextApiRequest, NextApiResponse } from "next";

import auth0 from "../../../utils/auth0";
import fetch from "isomorphic-unfetch";

const startGroup = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const tokenCache = auth0.tokenCache(req, res);
    const { accessToken } = await tokenCache.getAccessToken();
    const endpoint = `http://localhost:5000/api/private/vi/start-group`;

    let response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ payload: JSON.parse(req.body) }),
    });

    const result = await response.json();

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message,
    });
  }
};

export default startGroup;
