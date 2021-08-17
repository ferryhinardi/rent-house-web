import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';
import fetcher from 'core/fetcher/fetchServer';
import { ResponseItem, Perk } from 'types';
import '../../sentry.server.config';

type Data = {}

async function perks(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const response = await fetcher<ResponseItem<Perk>>(
      req,
      res,
      {
        method: 'GET',
        url: '/perks/all',
      }
    );
    res.status(200).json(response);
  } catch (err) {
    throw new Error(JSON.stringify(err));
  }
}

export default withSentry(perks)
