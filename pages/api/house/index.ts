import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';
import fetcher from 'core/fetcher/fetchServer';
import { ResponseItem, House } from 'types';
import '../../../sentry.server.config';

type Data = {};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const size = req.query.size ?? 4;
    const page = req.query.page ?? 1;
    const response = await fetcher<ResponseItem<House>>(req, res, {
      method: 'GET',
      url: '/house/all',
      params: { size, page },
    });
    res.status(200).json(response);
  } catch (err) {
    throw new Error(JSON.stringify(err));
  }
}

export default withSentry(handler);
