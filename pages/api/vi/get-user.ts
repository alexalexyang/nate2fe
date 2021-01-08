import { NextApiRequest, NextApiResponse } from "next";

import auth0 from "../../../utils/auth0";
import fetch from "isomorphic-unfetch";

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const tokenCache = auth0.tokenCache(req, res);
    const { accessToken } = await tokenCache.getAccessToken();

    const endpoint = `http://localhost:5000/api/private/vi/get-user`;

    let response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      // method: "GET",
    });

    const result = await response.json();
    console.log("RESULT: ", result);
    // console.log("API: ", result.payload.group);

    res.status(200).json({
      success: true,
      groups: result.payload.groups,
    });
  } catch (error) {
    console.log("ERROR");
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message,
    });
  }
};

export default getUser;
