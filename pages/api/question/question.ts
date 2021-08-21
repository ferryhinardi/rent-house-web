import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';
import { ResponseItem, Question } from 'types';
import fetcher from 'core/fetcher/fetchServer';
import { withCookies } from '../utils';
import '../../../sentry.server.config';

type Data = {}

async function question(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log('query', req.query);
  const response = await fetcher<ResponseItem<Question>>(req, res, {
    method: 'GET',
    url: '/question/all',
    params: {
      section: req.query.section,
    },
  });
  res.status(200).json(response);
}

export default withSentry(withCookies(question));
