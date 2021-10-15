import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';
import { ApplicationData } from 'types';
import fetcher from 'core/fetcher/fetchServer';
import '../../../../sentry.server.config';
import { withCookies } from '../../utils';

type Data = {}

async function findApplicationByID(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    try {
        const response = await fetcher<ApplicationData>(req, res, {
          method: 'GET',
          url: `/application/${req.query.applicationId}`,
        });

        res.status(200).json(response);
      } catch (err) {
        throw new Error(JSON.stringify(err));
      }
}

export default withSentry(withCookies(findApplicationByID));
