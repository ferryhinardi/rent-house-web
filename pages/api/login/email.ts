import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';
import { Login, ErrorHandling } from 'types';
import fetcher, { instance } from 'core/fetcher/fetchServer';
import { withCookies } from '../utils';
import type { NextResponse } from '../utils';
import '../../../sentry.server.config';

type Data = {};

instance.interceptors.response.use(
  (response) => response,
  (err) => {
    const error = err.response;

    // if error is 401
    if (error.status === 401 && error.config) {
      return { data: error.data };
    }
  }
);

async function login(req: NextApiRequest, res: NextApiResponse<Data>) {
  const url = `/user/login`;
  try {
    const response = await fetcher<Login | ErrorHandling>(req, res, {
      method: 'POST',
      url,
      data: req.body,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if ('message' in response) {
      res.status(500).json({ message: response.message });
    }

    if ('token' in response) {
      (res as NextResponse).cookie('token', response.token, {
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
      res.status(200).json(response);
    }
  } catch (err) {
    throw new Error((err as Error).message);
  }
}

export default withSentry(withCookies(login));
