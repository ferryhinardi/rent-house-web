import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from 'types';
import fetcher from 'core/fetcher/fetchServer';
import { withCookies } from '../utils';
import '../../../sentry.server.config';

type Data = {};

async function user(req: NextApiRequest, res: NextApiResponse<Data>) {
  const response = await fetcher<User>(req, res, {
    url: '/current-user/',
  });
  res.status(200).json(response);
}

export default withCookies(user);
