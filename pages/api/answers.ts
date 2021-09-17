import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';
import fetcher from 'core/fetcher/fetchServer';
import { withCookies } from './utils';
import '../../sentry.server.config';
import { UserAnswers } from 'types';

type Data = {}

async function answers(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const url = `/answers`;
  try {
    const response = await fetcher<UserAnswers[]>(
      req,
      res,
      {
        method: 'POST',
        url,
        data: req.body,
      }
    );
    res.status(200).json(response);
  } catch (err) {
    throw new Error(JSON.stringify(err));
  }
}

export default withSentry(withCookies(answers))
