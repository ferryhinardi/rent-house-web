import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';
import fetcher from 'core/fetcher/fetchServer';
import { ResponseItem, Explore } from 'types';
import '../../sentry.server.config';

type Data = {};

async function explores(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const response = await fetcher<ResponseItem<Explore>>(req, res, {
      method: 'GET',
      url: '/hause',
    });
    res.status(200).json(response);
  } catch (err) {
    throw new Error(JSON.stringify(err));
  }
}

export default withSentry(explores);
