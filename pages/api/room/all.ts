import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';
import { ResponseItem, Room } from 'types';
import fetcher from 'core/fetcher/fetchServer';
import '../../../sentry.server.config';

type Data = {}

async function findAllRooms(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const house_id = req.query.house_id;
    console.log('mashok ', house_id)
    try {
        const response = await fetcher<ResponseItem<Room>>(req, res, {
          method: 'GET',
          url: `/room/all`,
          params: { house_id },
        });
        res.status(200).json(response);
      } catch (err) {
        throw new Error(JSON.stringify(err));
      }
}

export default withSentry(findAllRooms);
