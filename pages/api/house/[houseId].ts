import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';
import { House } from 'types';
import fetcher from 'core/fetcher/fetchServer';
import '../../../sentry.server.config';

type Data = {}

async function findHouseByID(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    try {
        const response = await fetcher<House>(req, res, {
          method: 'GET',
          url: `/house/${req.query.houseId}`,
        });
        res.status(200).json(response);
      } catch (err) {
        throw new Error(JSON.stringify(err));
      }
}

export default withSentry(findHouseByID);
