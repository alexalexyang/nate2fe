import { NextApiRequest, NextApiResponse } from "next";

import { ManagementClient } from "auth0";
import auth0 from "../../../utils/auth0";
import fetch from "isomorphic-unfetch";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await auth0.getSession(req);
    // const accessToken = data?.accessToken;
    const id = data?.user.sub;

    const permissions = await (
      await fetch(`https://${serverRuntimeConfig.AUTH0_DOMAIN}/oauth/token`, {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: `grant_type=client_credentials&client_id=${serverRuntimeConfig.AUTH0_CLIENT_ID}&client_secret=${serverRuntimeConfig.AUTH0_CLIENT_SECRET}&audience=${serverRuntimeConfig.AUTH0_AUDIENCE}`,
      })
    ).json();

    const management: any = new ManagementClient({
      token: permissions.access_token,
      domain: `${serverRuntimeConfig.AUTH0_DOMAIN}`,
      clientId: `${serverRuntimeConfig.AUTH0_CLIENT_ID}`,
      clientSecret: `${serverRuntimeConfig.AUTH0_CLIENT_SECRET}`,
    });

    // Delete all references to user in MongoDB

    return management.users.delete({ id }, (error: any) => {
      if (error) {
        return res.status(error.status || 500).json({ success: false });
      }

      res.status(200).json({ success: true });
    });
  } catch (error) {
    res.status(error.status || 500).json({ success: false });
  }
};
