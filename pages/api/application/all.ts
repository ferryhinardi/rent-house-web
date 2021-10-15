import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';
import fetcher from 'core/fetcher/fetchServer';
import { ResponseItem,  ApplicationData } from 'types';
import '../../../sentry.server.config';
import { withCookies } from '../utils';

type Data = {};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const size = req.query.size ?? 10;
    const page = req.query.page ?? 1;
    const user_id = req.query.user_id;
    const response = await fetcher<ResponseItem<ApplicationData>>(req, res, {
      method: 'GET',
      url: '/application/all',
      params: { size, page , user_id},
    });
    res.status(200).json(response);
  } catch (err) {
    throw new Error(JSON.stringify(err));
  }
}

export default withSentry(withCookies(handler));
