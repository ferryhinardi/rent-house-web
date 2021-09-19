import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';
import fetcher from 'core/fetcher/fetchServer';
import { withCookies } from '../utils';
import '../../../sentry.server.config';
import { User } from 'types';

type Data = {};

async function update(req: NextApiRequest, res: NextApiResponse<Data>) {
  const userID = req.query.id;
  const url = `/user/${userID}/`;
  try {
    const response = await fetcher<User[]>(req, res, {
      method: 'PUT',
      url,
      data: req.body,
      headers: req.headers,
    });
    res.status(200).json(response);
  } catch (err) {
    throw new Error(JSON.stringify(err));
  }
}

export default withSentry(withCookies(update));
