import { NextApiRequest, NextApiResponse } from 'next';

import { ManagementClient } from 'auth0'
import auth0 from '../../../utils/auth0';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const data = await auth0.getSession(req);
        const accessToken = data?.user.accessToken
        const id = data?.user.sub

        const management: any = new ManagementClient({
          token: accessToken,
          domain: `${process.env.AUTH0_DOMAIN}`,
          clientId: `${process.env.AUTH0_MANAGEMENT_API_TEST_CLIENT_ID}`,
          clientSecret: `${process.env.AUTH0_MANAGEMENT_API_TEST_SECRET}`,
        });

        return management.users.delete({ id }, (error: any) => {
          if (error) {
            res.status(error.status || 500).json({ success: false })
          }
          res.status(200).json({ success: true })
        });
      } catch (error) {
        res.status(error.status || 500).json({ success: false })
      }
      
  }
  