import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';
import { ResponseItem, Question } from 'types';
import fetcher from 'core/fetcher/fetchServer';
import '../../sentry.server.config';

type Data = {};

async function question(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const response = await fetcher<ResponseItem<Question>>(req, res, {
      method: 'GET',
      url: `/question/all?section=${req.query.section}`,
    });
    res.status(200).json(response);
  } catch (err) {
    throw new Error(JSON.stringify(err));
  }
}

export default withSentry(question);