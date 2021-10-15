import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';
import fetcher from 'core/fetcher/fetchServer';
import { ResponseItem, Testimony } from 'types';
import '../../sentry.server.config';

type Data = {};

async function testimonies(req: NextApiRequest, res: NextApiResponse<Data>) {
  const size = req.query.size ?? 4;
  const page = req.query.page ?? 1;

  try {
    const response = await fetcher<ResponseItem<Testimony>>(req, res, {
      method: 'GET',
      url: '/testimony/all',
      params: { page, size },
    });
    res.status(200).json(response);
  } catch (err) {
    throw new Error(JSON.stringify(err));
  }
}

export default withSentry(testimonies);
