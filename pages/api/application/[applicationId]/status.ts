import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';
import fetcher from 'core/fetcher/fetchServer';
import { withCookies } from './../../utils';
import '../../../../sentry.server.config';
import { ApplicationData } from 'types';

type Data = {};

async function updateStatus(req: NextApiRequest, res: NextApiResponse<Data>) {
  const url = `/application/${req.query.applicationId}/status`;
  try {
    const response = await fetcher<ApplicationData>(req, res, {
      method: 'PATCH',
      url,
      data: req.body,
    });
    res.status(200).json(response);
  } catch (err) {
    throw new Error(JSON.stringify(err));
  }
}

export default withSentry(withCookies(updateStatus));
