import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';
import fetcher from 'core/fetcher/fetchServer';
import { ResponseItem, House } from 'types';
import '../../sentry.server.config';

type Data = {};

async function houseMatching(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const userId = 11
    const response = await fetcher<ResponseItem<House>>(req, res, {
      method: 'GET',
      url: `/match-property/preferences/${userId}`,
    });
    res.status(200).json(response);
  } catch (err) {
    throw new Error(JSON.stringify(err));
  }
}

export default withSentry(houseMatching);
