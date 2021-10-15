import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';
import fetcher from 'core/fetcher/fetchServer';
import { withCookies } from '../utils';
import '../../../sentry.server.config';
import { UserDocument } from 'types';

type Data = {};

async function userDocument(req: NextApiRequest, res: NextApiResponse<Data>) {
  const url = `/user-document/`;
  try {
    const response = await fetcher<UserDocument>(req, res, {
      method: 'POST',
      url,
      data: req.body,
      headers: req.headers,
    });
    res.status(200).json(response);
  } catch (err) {
    throw new Error(JSON.stringify(err));
  }
}

export default withSentry(withCookies(userDocument));
