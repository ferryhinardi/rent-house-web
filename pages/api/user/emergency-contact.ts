import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';
import fetcher from 'core/fetcher/fetchServer';
import { withCookies } from '../utils';
import '../../../sentry.server.config';
import { EmergencyContact } from 'types';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userID = req.query.id;
  try {
    if (req.method === 'POST') {
      const response = await fetcher<EmergencyContact[]>(req, res, {
        method: 'POST',
        url: '/emergency-contact',
        data: req.body,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      res.status(200).json(response);
    } else {
      const response = await fetcher<EmergencyContact[]>(req, res, {
        url: `/emergency-contact/${userID}`,
      });
      res.status(200).json(response);
    }
  } catch (err) {
    throw new Error(JSON.stringify(err));
  }
}

export default withSentry(withCookies(handler));
