import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';
import fetcher from 'core/fetcher/fetchServer';
import { ResponseItem, Testimony } from 'types';
import '../../sentry.server.config';

type Data = {}

async function testimonies(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const response = await fetcher<ResponseItem<Testimony>>(
      req,
      res,
      {
        method: 'GET',
        url: '/testimony/all?size=4',
      }
    );
    res.status(200).json(response);
  } catch (err) {
    throw new Error(JSON.stringify(err));
  }
}

export default withSentry(testimonies)
