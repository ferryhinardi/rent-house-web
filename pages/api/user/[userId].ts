import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';
import { User } from 'types';
import fetcher from 'core/fetcher/fetchServer';
import '../../../sentry.server.config';

type Data = {};

async function findUserById(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const response = await fetcher<User>(req, res, {
      method: 'GET',
      url: `/user/${req.query.userId}`,
    });
    res.status(200).json(response);
  } catch (err) {
    throw new Error(JSON.stringify(err));
  }
}

export default withSentry(findUserById);
