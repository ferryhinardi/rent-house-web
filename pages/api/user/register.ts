import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';
import { Login } from 'types';
import fetcher from 'core/fetcher/fetchServer';
import { withCookies } from '../utils';
import type { NextResponse } from '../utils';
import '../../../sentry.server.config';

type Data = {};

async function register(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const response = await fetcher<Login>(req, res, {
      method: 'POST',
      url: '/user/registration',
      data: req.body,
    });

    if (response.token) {
      (res as NextResponse).cookie('token', response.token, {
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
    }
    res.status(200).json(response);
  } catch (err) {
    throw new Error(JSON.stringify(err));
  }
}

export default withSentry(withCookies(register));
